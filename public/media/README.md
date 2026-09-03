# Local media — Starter 2.0 V1

The Starter deliberately ships with an empty `src/data/media/media.json`.
No media is valid: pages keep their normal text/fact layout without placeholders.
A broken reference is invalid and fails validation, including references on unpublished pages.

## Add an asset

1. Obtain human approval for the asset's accuracy, suitability, and usage rights.
2. Store the reviewed image below `public/media/` and use `/media/...` as its `src`.
3. Add it once to the manifest's `assets`, then reference its ID from `pages`.
4. Run `npm run validate`, `npm run check`, and `npm run build`.

The only placements are `hero` (image ID), `gallery` (image IDs), and `trailer`
(video ID). WikiArticle and EntityDetail consume these mappings by their existing
Inventory `pageId`. A mapping cannot create or publish a route, enable a feature,
or change visibility/indexability. Other page layouts do not automatically gain media.

```json
{
  "assets": [
    {
      "id": "overview",
      "type": "image",
      "src": "/media/overview.webp",
      "alt": "Describe what this image helps the player understand",
      "caption": "Optional visible context",
      "sourceUrl": "https://example.com/replace-with-original-source"
    }
  ],
  "pages": [{ "pageId": "guide.getting-started", "hero": "overview" }]
}
```

This is a syntax example, not a supplied asset or approved source. Replace the
file, description, and source URL with reviewed project material.

## Image contract

- Images must be local files under `public/media/`; remote image URLs, traversal,
  encoded paths, query strings, fragments, and missing files are rejected.
- Use a supported image extension: `.png`, `.jpg`, `.jpeg`, `.webp`, `.avif`, `.gif`, `.svg`.
- `alt` is required. Informative images need descriptive text, not a filename or
  a generic label such as "image" or "screenshot". Precisely `alt: ""` marks a
  deliberately decorative image; human review must justify that choice.
- `sourceUrl` is required HTTPS provenance: the original source of the local file.
  A valid URL is **not proof of legal usage rights**. Rights records/approval remain
  in project SOP/research artifacts and human review.
- Hero images load eagerly; gallery/inline images load lazily. Images scale in
  their natural aspect ratio without crop variants or manifest dimensions.
- Optimize file size manually before adoption. V1 does not process or upload images.

## YouTube contract

Video `src` is an 11-character YouTube ID, not a URL. `alt` supplies the non-empty
iframe title; `caption` is optional and `sourceUrl` records the source/watch URL.
The component uses only `https://www.youtube-nocookie.com/embed/<id>`, lazy loading,
a 16:9 responsive frame, limited permissions and fullscreen support. A visible
source link remains available when the player is blocked or unavailable.

There is no autoplay, SDK, upload support, arbitrary iframe URL, or build-time
network/availability probe. YouTube remains a runtime third-party dependency;
project owners must review privacy, consent, rights, and availability requirements.

## Inline content and QA

MDX may import `GameMedia` and pass `mediaCatalog.getAsset("overview")` for inline
media. Keep page-level placement in the manifest, not Page Inventory/frontmatter.
Captions render as text, never injected HTML. No media title is added to the
WikiArticle TOC; the TOC still consumes only the body renderer's H2/H3 headings.

`tests/fixtures/media/` contains clearly synthetic QA illustrations and a test
manifest. These are not default game content and must not be shipped as game
screenshots. The generic production manifest remains empty after QA.

Automated checks verify deterministic structure, references and accessible
markup. They do not judge visual quality, factual appropriateness or copyright.
