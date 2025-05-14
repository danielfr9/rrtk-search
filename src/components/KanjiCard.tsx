// Components
import ClipboardButton from "./ClipboardButton";
// Hooks
import { useMemo } from "react";
// Icons
// Assets
import noUnicodePrimitves from "../assets/noUnicodePrimitives";
import { BookOpenTextIcon, ImageIcon, LoaderIcon } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useLazyImage } from "@/hooks/use-lazy-image";

type IProps = {
  data: Kanji;
  handleOpenModal: (data: Kanji) => Promise<void>;
};

const KanjiCard = ({ data, handleOpenModal }: IProps) => {
  const { theme } = useTheme();
  const dark = useMemo(() => theme === "dark", [theme]);

  const image = useLazyImage(
    "primitives",
    noUnicodePrimitves[data.keywords.primary]
  );

  return (
    <div
      className={`flex flex-col h-64 px-6 py-2 justify-between space-y-1 hover:ring-2 ${
        dark
          ? "bg-gray-900 hover:ring-blue-900 text-gray-300"
          : "bg-gray-100/70 text-gray-600 hover:ring-blue-500"
      } rounded-lg`}
    >
      {/* Header */}
      <div className="my-2 flex justify-between">
        <span className="text-xs font-semibold flex items-center text-white bg-blue-600 w-fit px-3 py-1 rounded-xl uppercase">
          {data.heisig_number || "Primitive"}
        </span>
        {data.kanji && <ClipboardButton label="Copy Kanji" text={data.kanji} />}
      </div>

      {/* Image or Kanji Text */}
      {data.kanji ? (
        <span className={`text-5xl text-center ${!dark && "text-black"}`}>
          {data.kanji}
        </span>
      ) : image.status === "success" ? (
        <img
          className="w-20 h-20 self-center"
          src={image.src}
          alt={data.keywords.primary}
        />
      ) : image.status === "error" ? (
        <ImageIcon className="w-20 h-20 self-center" />
      ) : (
        <LoaderIcon className="w-20 h-20 self-center animate-spin" />
      )}

      {/* Footer */}
      <div className="flex-shrink-0">
        <span className="font-semibold">{data.keywords.primary}</span>
        <div className="flex justify-end pb-4">
          <BookOpenTextIcon
            onClick={() => handleOpenModal(data)}
            className="w-7 h-7 cursor-pointer text-sky-500"
          />
        </div>
      </div>
    </div>
  );
};

export default KanjiCard;
