import { describe, expect, it } from "vitest";

import { defineGameConfig } from "../src/config/schema";
import {
  enabledPageCatalog,
  featuredHomepagePages,
  getPageByRoute,
  getRelatedPages,
  homepageBrowsePages,
  resolveNavigationGroups,
  resolvedNavigationGroups,
  siteConfig,
} from "../src/core/site-data";

describe("site data", () => {
  it("exposes only routes allowed by config and inventory", () => {
    expect(enabledPageCatalog.map((page) => page.route)).toEqual([
      "/",
      "/guides/",
      "/guides/getting-started/",
      "/search/",
      "/about/",
      "/privacy/",
      "/terms/",
      "/404.html",
    ]);
  });

  it("finds a routable page by its canonical route", () => {
    expect(getPageByRoute("/").pageId).toBe("home");
    expect(() => getPageByRoute("/heroes/demo-sentinel/")).toThrow(
      /enabled page/i,
    );
  });

  it("resolves related pages without leaking disabled modules", () => {
    const home = getPageByRoute("/");

    expect(getRelatedPages(home).map((page) => page.pageId)).toEqual([
      "guide.getting-started",
    ]);
  });

  it("resolves configured navigation groups and homepage references in order", () => {
    expect(
      resolvedNavigationGroups.map(({ label, page, children }) => ({
        label,
        pageId: page.pageId,
        childPageIds: children.map((child) => child.pageId),
      })),
    ).toEqual([
      { label: "Home", pageId: "home", childPageIds: [] },
      {
        label: "Guides",
        pageId: "hub.guides",
        childPageIds: ["guide.getting-started"],
      },
      { label: "Search", pageId: "search", childPageIds: [] },
    ]);
    expect(featuredHomepagePages.map((page) => page.pageId)).toEqual([
      "guide.getting-started",
    ]);
  });

  it("fails navigation resolution instead of filtering a disabled page", () => {
    const config = defineGameConfig({
      ...siteConfig,
      navigation: { groups: [{ pageId: "hero.demo-sentinel" }] },
    });

    expect(() =>
      resolveNavigationGroups(
        config.navigation.groups,
        enabledPageCatalog,
      ),
    ).toThrow(/hero\.demo-sentinel.*enabled catalog/i);
  });

  it("keeps legal and error routes out of the homepage content directory", () => {
    expect(homepageBrowsePages.map((page) => page.pageId)).toEqual([
      "hub.guides",
      "guide.getting-started",
      "search",
      "about",
    ]);
  });
});
