import { realpathSync, statSync } from "node:fs";
import { join, resolve, sep } from "node:path";

import type { ResolvedPageMedia } from "../src/data/media/catalog";
import type { MediaAsset } from "../src/data/schemas/media";

export function isLocalImageFile(src: string, publicDirectory: string): boolean {
  if (!src.startsWith("/media/")) return false;
  try {
    const root = join(realpathSync(publicDirectory), "media");
    const file = resolve(root, src.slice("/media/".length));
    return file.startsWith(root + sep) &&
      realpathSync(file).startsWith(root + sep) && statSync(file).isFile();
  } catch {
    return false;
  }
}

function attributes(tag: string): Map<string, string> {
  const entities: Record<string, string> = { amp: "&", quot: '"', "#39": "'", "#x27": "'", lt: "<", gt: ">" };
  return new Map([...tag.matchAll(/([\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?/g)].map((match) => [
    match[1].toLowerCase(),
    (match[2] ?? match[3] ?? "").replace(/&(amp|quot|#39|#x27|lt|gt);/g, (_, entity: string) => entities[entity]),
  ]));
}

function openingTags(html: string, name: "img" | "iframe" | "a"): string[] {
  // Astro preserves > inside quoted attributes; it is not a tag boundary there.
  return html.match(new RegExp(`<${name}\\b(?:[^"'<>]|"[^"]*"|'[^']*')*>`, "g")) ?? [];
}

export function collectMediaHtmlErrors(
  html: string,
  assets: MediaAsset[],
  localFileExists: (src: string) => boolean,
  expected?: ResolvedPageMedia,
): string[] {
  const errors: string[] = [];
  const byId = new Map(assets.map((asset) => [asset.id, asset]));
  const videoSources = new Set(assets.filter((asset) => asset.type === "video").map((asset) => `https://www.youtube-nocookie.com/embed/${asset.src}`));

  for (const tag of openingTags(html, "img")) {
    const src = attributes(tag).get("src") ?? "";
    if (!src.startsWith("/media/") || !localFileExists(src)) errors.push(`Image src is not an existing local media file: ${src}`);
  }
  for (const tag of openingTags(html, "iframe")) {
    const attrs = attributes(tag);
    if (!videoSources.has(attrs.get("src") ?? "")) errors.push("Iframe src is not a registered YouTube-nocookie embed.");
    if (!attrs.get("title")?.trim()) errors.push("Iframe requires an accessible title.");
    if (attrs.get("loading") !== "lazy") errors.push("Iframe must load lazily.");
    if (attrs.get("allow") !== "encrypted-media; picture-in-picture; fullscreen" || !attrs.has("allowfullscreen")) errors.push("Iframe permissions/fullscreen contract is invalid.");
    if (attrs.get("referrerpolicy") !== "strict-origin-when-cross-origin" || attrs.has("srcdoc")) errors.push("Iframe privacy contract is invalid.");
  }

  for (const match of html.matchAll(/<figure\b([^>]*)>([\s\S]*?)<\/figure>/g)) {
    const frame = attributes(match[1]);
    const id = frame.get("data-media-id");
    if (!id) continue;
    const asset = byId.get(id);
    if (!asset) {
      errors.push(`Unknown rendered media asset: ${id}`);
      continue;
    }
    const body = match[2];
    if (!frame.get("class")?.split(/\s+/).includes("game-media")) errors.push(`Media ${id} lacks its responsive figure class.`);
    const sourceLinks = openingTags(body, "a").map((link) => attributes(link).get("href"));
    if (!sourceLinks.includes(asset.sourceUrl)) errors.push(`Media ${id} is missing its provenance link.`);
    if (asset.type === "image") {
      const images = openingTags(body, "img");
      const attrs = attributes(images[0] ?? "");
      if (images.length !== 1 || attrs.get("src") !== asset.src) errors.push(`Media ${id} image src does not match its asset.`);
      if (!attrs.has("alt") || attrs.get("alt") !== asset.alt) errors.push(`Media ${id} alt does not match its asset.`);
      if (!["eager", "lazy"].includes(attrs.get("loading") ?? "") || attrs.get("decoding") !== "async") errors.push(`Media ${id} image loading contract is invalid.`);
    } else {
      const iframes = openingTags(body, "iframe");
      const attrs = attributes(iframes[0] ?? "");
      if (iframes.length !== 1 || attrs.get("src") !== `https://www.youtube-nocookie.com/embed/${asset.src}` || attrs.get("title") !== asset.alt) errors.push(`Media ${id} video src/title does not match its asset.`);
      if (!/<div\b[^>]*class="video-embed"/.test(body)) errors.push(`Media ${id} lacks its responsive video wrapper.`);
    }
  }

  if (expected) {
    const placements = {
      hero: expected.heroMedia ? [expected.heroMedia] : [],
      gallery: expected.galleryMedia,
      trailer: expected.trailerMedia ? [expected.trailerMedia] : [],
    };
    for (const [placement, expectedAssets] of Object.entries(placements)) {
      const sections = [...html.matchAll(new RegExp(`<div\\b[^>]*data-media-placement="${placement}"[^>]*>([\\s\\S]*?)</div>`, "g"))];
      const ids = [...(sections[0]?.[1] ?? "").matchAll(/data-media-id="([^"]+)"/g)].map((match) => match[1]);
      const expectedCount = expectedAssets.length > 0 ? 1 : 0;
      if (sections.length !== expectedCount || JSON.stringify(ids) !== JSON.stringify(expectedAssets.map((asset) => asset.id))) errors.push(`Media ${placement} output does not match the page mapping.`);
    }
  }
  return errors;
}
