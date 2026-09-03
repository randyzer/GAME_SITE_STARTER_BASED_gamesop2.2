import { existsSync, readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { selectWikiArticleHeadings } from "../src/components/wiki/wiki-article";

const wikiArticleUrl = new URL(
  "../src/components/wiki/WikiArticle.astro",
  import.meta.url,
);
const quickFactsUrl = new URL(
  "../src/components/wiki/QuickFacts.astro",
  import.meta.url,
);
const sourcesUrl = new URL(
  "../src/components/wiki/Sources.astro",
  import.meta.url,
);
const relatedPagesUrl = new URL(
  "../src/components/wiki/RelatedPages.astro",
  import.meta.url,
);
const guideRouteUrl = new URL(
  "../src/pages/guides/[...slug].astro",
  import.meta.url,
);

function source(url: URL) {
  return existsSync(url) ? readFileSync(url, "utf8") : "";
}

describe("WikiArticle", () => {
  it("uses only H2 and H3 body headings returned by the content renderer", () => {
    const headings = [
      { depth: 1, slug: "page-title", text: "Page title" },
      { depth: 2, slug: "start", text: "Start here" },
      { depth: 3, slug: "details", text: "Useful details" },
      { depth: 4, slug: "aside", text: "Deep aside" },
    ];

    expect(selectWikiArticleHeadings(headings)).toEqual([
      { depth: 2, slug: "start", text: "Start here" },
      { depth: 3, slug: "details", text: "Useful details" },
    ]);
  });

  it("does not use a title blacklist when selecting body headings", () => {
    const headings = [
      { depth: 2, slug: "sources-in-body", text: "Sources" },
      { depth: 3, slug: "related-in-body", text: "Related Pages" },
    ];

    expect(selectWikiArticleHeadings(headings)).toEqual(headings);
  });

  it("keeps component-owned headings outside the renderer heading input", () => {
    const wikiArticle = source(wikiArticleUrl);

    expect(wikiArticle).toContain("selectWikiArticleHeadings(headings)");
    expect(wikiArticle).toContain("<QuickFacts");
    expect(wikiArticle).toContain("<RelatedPages");
    expect(wikiArticle).toContain("<Sources");
    expect(wikiArticle).not.toMatch(
      /querySelector|querySelectorAll|DOMParser|parseHTML|rehype|titleBlacklist/,
    );
  });

  it("hides optional primitives when their input is empty", () => {
    expect(source(quickFactsUrl)).toContain("items.length > 0 &&");
    expect(source(relatedPagesUrl)).toContain("pages.length > 0 &&");
    expect(source(sourcesUrl)).toContain("Sources & verification");
  });

  it("routes guide articles through WikiArticle with renderer headings", () => {
    const guideRoute = source(guideRouteUrl);

    expect(guideRoute).toMatch(
      /import WikiArticle from ["']\.\.\/\.\.\/components\/wiki\/WikiArticle\.astro["']/,
    );
    expect(guideRoute).toMatch(
      /<WikiArticle\s+page=\{page\}\s+headings=\{rendered\?\.headings\}>/,
    );
    expect(guideRoute).toContain("{Content && <Content />}");
  });
});
