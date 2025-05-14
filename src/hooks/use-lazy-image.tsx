import {
  type ImageFolder,
  type ImageLoadStatus,
  imageMaps,
} from "@/lib/imageMaps";
import { useState, useEffect } from "react";

// ../assets/images/primitives/paste-5264aa28813e181adbf09b872066e507b2609478.jpg

export function useLazyImage(
  folder: ImageFolder,
  fileName: string | undefined
): ImageLoadStatus {
  const [state, setState] = useState<ImageLoadStatus>({
    status: "pending",
    src: undefined,
  });

  useEffect(() => {
    if (!fileName) {
      setState({ status: "pending", src: undefined });
      return;
    }

    const folderPath =
      folder === "primitives" ? "primitives" : "description_images";
    const fullPath = `../assets/images/${folderPath}/${fileName}`;
    const importFn =
      imageMaps[folder][fullPath as keyof (typeof imageMaps)[typeof folder]];

    if (importFn) {
      setState({ status: "pending", src: undefined });

      importFn()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((mod: any) => {
          setState({ status: "success", src: mod.default });
        })
        .catch((e) => {
          console.error(`Error loading image: ${fullPath}`, e);
          setState({ status: "error", src: undefined });
        });
    } else {
      console.warn(`Image not found: ${fullPath}`);
      setState({ status: "error", src: undefined });
    }
  }, [folder, fileName]);

  return state;
}
