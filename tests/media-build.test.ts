import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { enabledPageCatalog, resolvedNavigationGroups } from "../src/core/site-data";
import { collectOutputReconciliationErrors, routeToOutputFile } from "../src/core/output-reconciliation";
import mediaFixture from "./fixtures/media/media-rich.json";

let fixtureRoot: string;
let buildLog = "";
const projectRoot = process.cwd();

beforeAll(() => {
  fixtureRoot = mkdtempSync(join(tmpdir(), "starter-media-build-"));
  for (const file of ["src", "public", "scripts", "game.config.ts", "astro.config.ts", "tsconfig.json", "package.json", "package-lock.json"]) {
    cpSync(resolve(projectRoot, file), join(fixtureRoot, file), { recursive: true });
  }
  symlinkSync(resolve(projectRoot, "node_modules"), join(fixtureRoot, "node_modules"), "dir");
  writeFileSync(join(fixtureRoot, "src/data/media/media.json"), JSON.stringify(mediaFixture));
  for (const file of ["qa-overview.svg", "qa-detail.svg"]) {
    cpSync(resolve(projectRoot, "tests/fixtures/media", file), join(fixtureRoot, "public/media", file));
  }
  buildLog = execFileSync("npm", ["run", "build"], {
    cwd: fixtureRoot,
    encoding: "utf8",
    timeout: 60_000,
    // Vitest's NODE_ENV=test must not select development React for the production build.
    env: { ...process.env, NODE_ENV: "production" },
  });
}, 60_000);

afterAll(() => {
  if (!fixtureRoot) return;
  if (process.env.STARTER_MEDIA_QA_KEEP === "1") {
    console.log(`Media QA fixture retained at: ${fixtureRoot}`);
  } else {
    rmSync(fixtureRoot, { recursive: true, force: true });
  }
});

describe("media-rich static build", () => {
  it("preserves exact inventory routes and Pagefind inclusion", () => {
    expect(collectOutputReconciliationErrors(enabledPageCatalog, join(fixtureRoot, "dist"))).toEqual([]);
    expect(buildLog).toContain("Static output reconciliation passed: 8 inventory routes matched.");
    expect(buildLog).toMatch(/Indexed 4 pages/);
    expect(buildLog).toContain("Generated build audit passed for 8 pages.");
    expect(existsSync(join(fixtureRoot, "dist/heroes/demo-sentinel/index.html"))).toBe(false);
  });

  it("renders all fixed guide placements and retains no-media pages", () => {
    const rich = readFileSync(join(fixtureRoot, "dist/guides/getting-started/index.html"), "utf8");
    expect(rich.match(/<img\b/g)).toHaveLength(3);
    expect(rich.match(/<iframe\b/g)).toHaveLength(1);
    for (const placement of ["hero", "gallery", "trailer"]) expect(rich).toContain(`data-media-placement="${placement}"`);
    expect(rich).toContain('loading="eager"');
    expect(rich).toContain("youtube-nocookie.com/embed/aqz-KE-bpKQ");
    const plain = readFileSync(join(fixtureRoot, "dist/about/index.html"), "utf8");
    expect(plain).not.toMatch(/<img\b|<iframe\b|data-media-placement/);
  });

  it("preserves every resolved desktop/mobile navigation link", () => {
    const expected = resolvedNavigationGroups.flatMap((group) => [group.page, ...group.children]);
    for (const page of enabledPageCatalog) {
      const html = readFileSync(join(fixtureRoot, "dist", routeToOutputFile(page.route)), "utf8");
      for (const className of ["desktop-nav", "mobile-nav__panel"]) {
        const nav = html.match(new RegExp(`<nav class="${className}"[^>]*>([\\s\\S]*?)</nav>`))?.[1] ?? "";
        expect([...nav.matchAll(/data-nav-page-id="([^"]+)"/g)].map((match) => match[1])).toEqual(expected.map((item) => item.pageId));
        expect([...nav.matchAll(/href="([^"]+)"/g)].map((match) => match[1])).toEqual(expected.map((item) => item.route));
      }
    }
  });

  it("fails CLI validation for a missing referenced file without network probes", () => {
    const path = join(fixtureRoot, "public/media/qa-detail.svg");
    rmSync(path);
    try {
      expect(() => execFileSync("npm", ["run", "validate"], { cwd: fixtureRoot, encoding: "utf8", stdio: "pipe" })).toThrow();
    } finally {
      cpSync(resolve(projectRoot, "tests/fixtures/media/qa-detail.svg"), path);
    }
  });
});
