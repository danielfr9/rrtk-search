// Components
// import ClipboardButton from "./ClipboardButton";
// Hooks
// import { useMemo } from "react";
// Icons
// Assets
import noUnicodePrimitves from "../assets/noUnicodePrimitives";
import { ImageIcon, InfoIcon, LoaderIcon } from "lucide-react";
// import { useTheme } from "./theme-provider";
import { useLazyImage } from "@/hooks/use-lazy-image";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import ClipboardButton from "./ClipboardButton";

type IProps = {
  data: Kanji;
  handleOpenModal: (data: Kanji) => Promise<void>;
};

export const KanjiCard = ({ data, handleOpenModal }: IProps) => {
  // const { theme } = useTheme();
  // const dark = useMemo(() => theme === "dark", [theme]);

  const image = useLazyImage(
    "primitives",
    noUnicodePrimitves[data.keywords.primary]
  );

  return (
    <>
      <Card className="group overflow-hidden transition-all duration-300 hover:border-sky-500 border-slate-800 bg-slate-900 py-0">
        <div className="p-4 flex flex-col items-center text-center">
          <div className=" relative bg-slate-800 rounded-lg w-full aspect-square flex items-center justify-center mb-3 group-hover:bg-slate-800/80">
            {/* Image or Kanji Text */}
            {data.kanji ? (
              <span className="text-4xl font-normal text-white">
                {data.kanji}
              </span>
            ) : image.status === "success" ? (
              <img
                className="w-16 h-16 self-center rounded-xl"
                src={image.src}
                alt={data.keywords.primary}
              />
            ) : image.status === "error" ? (
              <ImageIcon className="w-20 h-20 self-center" />
            ) : (
              <LoaderIcon className="w-20 h-20 self-center animate-spin" />
            )}
            {data.heisig_number && (
              <div className="absolute top-2 right-2">
                <ClipboardButton text={data.heisig_number} label="Copy" />
              </div>
            )}
          </div>
          <Badge
            variant="secondary"
            className="mb-1 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 border-0"
          >
            {data.heisig_number || "Primitive"}
          </Badge>
          <p className="text-white font-medium">{data.keywords.primary}</p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => handleOpenModal(data)}
          >
            <InfoIcon className="h-4 w-4 mr-1" /> Details
          </Button>
        </div>
      </Card>
    </>
  );
};

export const KanjiCardRow = ({ data, handleOpenModal }: IProps) => {
  const image = useLazyImage(
    "primitives",
    noUnicodePrimitves[data.keywords.primary]
  );

  return (
    <Card className="group flex flex-row items-center gap-4 px-4 py-2 transition-all duration-300 hover:border-sky-500 border-slate-800 bg-slate-900">
      {/* Image or Kanji */}
      <div className="relative flex-shrink-0 bg-slate-800 rounded-lg w-16 h-16 flex items-center justify-center group-hover:bg-slate-800/80">
        {data.kanji ? (
          <span className="text-3xl font-normal text-white">{data.kanji}</span>
        ) : image.status === "success" ? (
          <img
            className="w-10 h-10 self-center rounded-xl"
            src={image.src}
            alt={data.keywords.primary}
          />
        ) : image.status === "error" ? (
          <ImageIcon className="w-10 h-10 self-center" />
        ) : (
          <LoaderIcon className="w-10 h-10 self-center animate-spin" />
        )}
      </div>
      {/* Info */}
      <div className="flex flex-col flex-1 min-w-0">
        <Badge
          variant="secondary"
          className="mb-1 w-fit bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 border-0"
        >
          {data.heisig_number || "Primitive"}
        </Badge>
        <p className="text-white font-medium truncate">
          {data.keywords.primary}
        </p>
      </div>
      {/* Actions */}
      <Button
        variant="ghost"
        size="sm"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => handleOpenModal(data)}
      >
        <InfoIcon className="h-4 w-4 mr-1" /> Details
      </Button>
      {data.heisig_number && (
        <ClipboardButton text={data.heisig_number} label="Copy" />
      )}
    </Card>
  );
};
