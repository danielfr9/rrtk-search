export const imageMaps = {
  primitives: import.meta.glob("../assets/images/primitives/*"),
  description: import.meta.glob("../assets/images/description_images/*"),
} as const;

export type ImageFolder = keyof typeof imageMaps;

export type ImageLoadStatus =
  | { status: "pending"; src: undefined }
  | { status: "success"; src: string }
  | { status: "error"; src: undefined };
