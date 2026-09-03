import { existsSync, readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const headerUrl = new URL("../src/components/Header.astro", import.meta.url);
const desktopUrl = new URL(
  "../src/components/navigation/DesktopNav.astro",
  import.meta.url,
);
const mobileUrl = new URL(
  "../src/components/navigation/MobileNav.astro",
  import.meta.url,
);
const globalStylesUrl = new URL(
  "../src/styles/global.css",
  import.meta.url,
);

function source(url: URL) {
  return existsSync(url) ? readFileSync(url, "utf8") : "";
}

describe("navigation presentation boundary", () => {
  it("passes resolved groups from Header to both navigation renderers", () => {
    const header = source(headerUrl);

    expect(header).toContain("resolvedNavigationGroups");
    expect(header).toMatch(/<DesktopNav[\s\S]*groups=\{resolvedNavigationGroups\}/);
    expect(header).toMatch(/<MobileNav[\s\S]*groups=\{resolvedNavigationGroups\}/);
    expect(header).not.toMatch(/primaryNavigationPages|primaryPageIds/);
  });

  it("keeps desktop navigation presentation-only and links parent Hubs", () => {
    const desktop = source(desktopUrl);

    expect(desktop).toContain('interface Props');
    expect(desktop).toContain('groups: ResolvedNavigationGroup[]');
    expect(desktop).toContain('href={group.page.route}');
    expect(desktop).toContain('group.children.map');
    expect(desktop).not.toMatch(
      /enabledPageCatalog|getPageByRoute|resolveNavigationGroups|primaryPageIds|new Map|\.filter\(/,
    );
  });

  it("uses native expandable mobile groups with a direct parent link", () => {
    const mobile = source(mobileUrl);

    expect(mobile).toMatch(/<details class="mobile-nav"/);
    expect(mobile).toMatch(/<summary[^>]*>Menu/);
    expect(mobile).toContain('href={group.page.route}');
    expect(mobile).toContain('Overview');
    expect(mobile).toContain('group.children.map');
    expect(mobile).not.toMatch(
      /enabledPageCatalog|getPageByRoute|resolveNavigationGroups|primaryPageIds|new Map|\.filter\(/,
    );
  });

  it("keeps long mobile navigation inside the viewport", () => {
    const styles = source(globalStylesUrl);
    const panelRule = styles.match(/\.mobile-nav__panel\s*\{([^}]*)\}/)?.[1];

    expect(panelRule).toMatch(/max-height:\s*calc\(100(?:dvh|vh)\s*-\s*\d+px\)/);
    expect(panelRule).toMatch(/overflow-y:\s*auto/);
  });
});
