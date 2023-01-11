// Components
import ClipboardButton from "./ClipboardButton";
// Hooks
import { useMantineColorScheme } from "@mantine/core";
import { useMemo } from "react";
// Icons
import { VscPreview } from "react-icons/vsc";
// Assets
import noUnicodePrimitves from "../assets/noUnicodePrimitives";

type IProps = {
  data: Kanji;
  handleOpenModal: (data: Kanji) => Promise<void>;
};

const KanjiCard = ({ data, handleOpenModal }: IProps) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = useMemo(() => colorScheme === "dark", [colorScheme]);

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
      ) : (
        <img
          className="w-20 h-20 self-center"
          src={
            new URL(
              `/src/assets/images/primitives/${
                noUnicodePrimitves[data.keywords.primary]
              }`,
              import.meta.url
            ).href
          }
          loading="lazy"
          alt={data.keywords.primary}
        />
      )}

      {/* Footer */}
      <div className="flex-shrink-0">
        <span className="font-semibold">{data.keywords.primary}</span>
        <div className="flex justify-end pb-4">
          <VscPreview
            onClick={() => handleOpenModal(data)}
            className="w-7 h-7 cursor-pointer text-sky-500"
          />
        </div>
      </div>
    </div>
  );
};

export default KanjiCard;
