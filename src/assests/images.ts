/**
 * Centralized image configuration.
 *
 * Image metadata is seeded as a flat array and mapped into typed image objects,
 * so paths and alt text are derived from one contract instead of repeated by
 * hand. Components should import this config rather than hard-code `src`
 * strings, dimensions or alt text.
 */

/** Public folder that holds every gallery image. */
const IMAGE_DIRECTORY = "/images";

/** Shared filename suffix, e.g. `7_obscured_identity.webp`. */
const IMAGE_SLUG = "obscured_identity";

/** Prefix used to generate accessible alt text. */
const ALT_PREFIX = "Obscured identity portrait";

export type ImageAsset = {
  /** Stable numeric id, matching the filename prefix. */
  id: number;
  /** Public path served by Next.js. */
  src: string;
  /** Accessible description for `next/image`'s `alt`. */
  alt: string;
  width: number;
  height: number;
};

/** Raw seed data: one entry per file in `public/images`. */
type ImageSeed = Pick<ImageAsset, "id" | "width" | "height">;

export const imageSeeds = [
  { id: 1, width: 748, height: 1024 },
  { id: 2, width: 821, height: 1024 },
  { id: 3, width: 960, height: 1200 },
  { id: 4, width: 960, height: 1118 },
  { id: 5, width: 960, height: 1118 },
  { id: 6, width: 960, height: 1232 },
  { id: 7, width: 929, height: 1280 },
  { id: 8, width: 930, height: 1280 },
  { id: 9, width: 930, height: 1280 },
  { id: 10, width: 930, height: 1280 },
  { id: 11, width: 819, height: 1024 },
  { id: 12, width: 927, height: 1166 },
  { id: 13, width: 927, height: 1280 },
  { id: 14, width: 900, height: 1131 },
  { id: 15, width: 900, height: 1154 },
  { id: 16, width: 900, height: 1158 },
  { id: 17, width: 900, height: 1241 },
  { id: 18, width: 900, height: 1515 },
  { id: 19, width: 924, height: 1280 },
  { id: 20, width: 924, height: 1280 },
  { id: 21, width: 994, height: 1280 },
  { id: 22, width: 1017, height: 1280 },
] as const satisfies readonly ImageSeed[];

/** Build a full image object from a seed entry. */
function mapSeed(seed: ImageSeed): ImageAsset {
  return {
    id: seed.id,
    src: `${IMAGE_DIRECTORY}/${seed.id}_${IMAGE_SLUG}.webp`,
    alt: `${ALT_PREFIX} ${seed.id}`,
    width: seed.width,
    height: seed.height,
  };
}

/** Derived gallery, in display order. */
export const galleryImages: readonly ImageAsset[] = imageSeeds.map(mapSeed);

/** Union of the configured image shapes. */
export type GalleryImage = ImageAsset;

/** First image, handy as a hero or open-graph fallback. */
export const heroImage: GalleryImage = galleryImages[0];

/** Number of images available in the gallery. */
export const galleryCount = galleryImages.length;

const imagesById = new Map<number, GalleryImage>(
  galleryImages.map((image) => [image.id, image]),
);

const imagesBySrc = new Map<string, GalleryImage>(
  galleryImages.map((image) => [image.src, image]),
);

/** Look up an image by its numeric id (`1`..`22`). */
export function getImageById(id: number): GalleryImage | undefined {
  return imagesById.get(id);
}

/** Look up an image by its public `src` path. */
export function getImageBySrc(src: string): GalleryImage | undefined {
  return imagesBySrc.get(src);
}

/** All images as a plain array, in display order. */
export function getAllImages(): readonly GalleryImage[] {
  return galleryImages;
}
