import { z } from "zod";

const mediaIdSchema = z.string().regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/);
const imageExtensions = /\.(?:png|jpe?g|webp|avif|gif|svg)$/i;

function isLocalImagePath(src: string): boolean {
  if (!src.startsWith("/media/") || !imageExtensions.test(src)) return false;

  return src
    .slice("/media/".length)
    .split("/")
    .every(
      (segment) =>
        segment !== "." &&
        segment !== ".." &&
        /^[a-z0-9._-]+$/i.test(segment),
    );
}

function isDescriptiveText(text: string): boolean {
  const genericLabel =
    /^(?:(?:a|an|the|game|official)\s+)?(?:image|photo|picture|screenshot|thumbnail|hero|banner|media|graphic|video|trailer|asset)(?:[\s_-]*\d+)?[.!]?$/i;
  const filename =
    /^[^\s]+\.(?:png|jpe?g|webp|avif|gif|svg|mp4|webm|mov)$/i;
  const filenameStem = /^[a-z0-9]+(?:[-_][a-z0-9]+)+$/;
  const path = /^[^\s]*[\\/][^\s]*$/;
  const placeholder = /^(?:todo|tbd|placeholder)$/i;

  return (
    /[\p{L}\p{N}]/u.test(text) &&
    !genericLabel.test(text) &&
    !filename.test(text) &&
    !filenameStem.test(text) &&
    !path.test(text) &&
    !placeholder.test(text)
  );
}

const descriptiveTextSchema = z
  .string()
  .trim()
  .min(1)
  .refine(
    isDescriptiveText,
    "Use descriptive alt text, not a generic label or filename.",
  );

const commonAssetShape = {
  id: mediaIdSchema,
  caption: z.string().trim().min(1).optional(),
  sourceUrl: z.url().refine(
    (value) => /^https:\/\//i.test(value) && URL.canParse(value) && new URL(value).protocol === "https:",
    { message: "Media sourceUrl must use HTTPS." },
  ),
};

export const imageAssetSchema = z
  .object({
    ...commonAssetShape,
    type: z.literal("image"),
    src: z.string().refine(
      isLocalImagePath,
      "Image src must be a safe local image path under /media/.",
    ),
    alt: z.union([z.literal(""), descriptiveTextSchema]),
  })
  .strict();

export const videoAssetSchema = z
  .object({
    ...commonAssetShape,
    type: z.literal("video"),
    src: z.string().regex(
      /^[A-Za-z0-9_-]{11}$/,
      "Video src must be a canonical 11-character YouTube ID.",
    ),
    alt: descriptiveTextSchema,
  })
  .strict();

export const mediaAssetSchema = z.discriminatedUnion("type", [
  imageAssetSchema,
  videoAssetSchema,
]);

const pageMediaSchema = z
  .object({
    pageId: mediaIdSchema,
    hero: mediaIdSchema.optional(),
    gallery: z.array(mediaIdSchema).optional(),
    trailer: mediaIdSchema.optional(),
  })
  .strict();

export const mediaManifestSchema = z
  .object({
    assets: z.array(mediaAssetSchema),
    pages: z.array(pageMediaSchema),
  })
  .strict()
  .superRefine((manifest, context) => {
    const assets = new Map<string, MediaAsset>();
    const pageIds = new Set<string>();

    manifest.assets.forEach((asset, index) => {
      if (assets.has(asset.id)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate media asset ID: ${asset.id}`,
          path: ["assets", index, "id"],
        });
      }
      assets.set(asset.id, asset);
    });

    manifest.pages.forEach((page, index) => {
      if (pageIds.has(page.pageId)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate media page mapping: ${page.pageId}`,
          path: ["pages", index, "pageId"],
        });
      }
      pageIds.add(page.pageId);

      function checkReference(
        id: string,
        type: MediaAsset["type"],
        path: (string | number)[],
      ) {
        const asset = assets.get(id);
        if (!asset) {
          context.addIssue({
            code: "custom",
            message: `Unknown media asset ID: ${id}`,
            path: ["pages", index, ...path],
          });
        } else if (asset.type !== type) {
          context.addIssue({
            code: "custom",
            message: `Media slot requires ${type} media: ${id}`,
            path: ["pages", index, ...path],
          });
        }
      }

      if (page.hero) checkReference(page.hero, "image", ["hero"]);
      page.gallery?.forEach((id, galleryIndex) =>
        checkReference(id, "image", ["gallery", galleryIndex]),
      );
      if (page.trailer) checkReference(page.trailer, "video", ["trailer"]);
    });
  });

export type ImageAsset = z.output<typeof imageAssetSchema>;
export type VideoAsset = z.output<typeof videoAssetSchema>;
export type MediaAsset = z.output<typeof mediaAssetSchema>;
export type PageMedia = z.output<typeof pageMediaSchema>;
export type MediaManifest = z.output<typeof mediaManifestSchema>;

export function parseMediaManifest(input: unknown): MediaManifest {
  return mediaManifestSchema.parse(input);
}
