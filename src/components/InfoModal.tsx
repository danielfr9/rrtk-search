import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageIcon, LoaderIcon } from "lucide-react";
import { useMemo } from "react";
import { useTheme } from "./theme-provider";
import noUnicodePrimitves from "../assets/noUnicodePrimitives";
import ClipboardButton from "./ClipboardButton";
import reactStringReplace from "react-string-replace";
import { useLazyImage } from "@/hooks/use-lazy-image";
import type { ImageFolder } from "@/lib/imageMaps";
import { cn } from "@/lib/utils";

type IProps = {
  content: Kanji | null;
  isFetching: boolean;
  opened: boolean;
  handleCloseModal: () => void;
};

const InfoModal = ({
  content,
  isFetching,
  opened,
  handleCloseModal,
}: IProps) => {
  const { theme } = useTheme();
  const dark = useMemo(() => theme === "dark", [theme]);

  return (
    <Dialog open={opened} onOpenChange={handleCloseModal}>
      <DialogContent
        className={cn(
          `${dark ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"}`,
          "flex max-h-[min(640px,80vh)] max-w-[95vw] flex-col gap-0 rounded-lg p-0 sm:max-w-2xl [&>button:last-child]:top-3.5"
        )}
      >
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            {!isFetching && content && (
              <span className="text-xs font-semibold flex justify-center items-center text-white bg-blue-600 w-fit px-3 py-1 rounded-xl uppercase">
                {content.heisig_number || "Primitive"}
              </span>
            )}
          </DialogTitle>
          <div className="overflow-y-auto p-4">
            {isFetching ? (
              <div className="flex flex-col grow justify-center items-center py-12">
                <LoaderIcon className="h-24" />
              </div>
            ) : (
              <ModalContent content={content} />
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;

const ModalContent = ({ content }: { content: Kanji | null }) => {
  // If for some reason the modal is opened without content
  if (content === null)
    return (
      <div className="flex flex-col grow justify-center items-center py-12">
        <span>Sorry, something went wrong...</span>
      </div>
    );

  return (
    <div className="space-y-4 pb-4">
      {/* Kanji/Image */}
      <KanjiScript
        kanji={content.kanji}
        primaryKeyword={content.keywords.primary}
      />

      {/* Clipboard */}
      {content.kanji && (
        <div className="flex items-center justify-end pr-6">
          <ClipboardButton label="Copy Kanji" text={content.kanji} />
        </div>
      )}

      {/* JLPT & Grade */}
      <div className="flex space-x-2">
        <TitlePill
          title={`JLPT: ${content.jlpt || "N/A"}`}
          classNames="text-white bg-indigo-600"
        />
        <TitlePill
          title={`Grade: ${content.grade || "N/A"}`}
          classNames="text-white bg-teal-600"
        />
      </div>

      {/* Kunyomi & Onyomi */}
      {content.kanji && (
        <>
          <Readings
            reading={content?.kunyomi}
            classNames="text-white bg-cyan-600"
            title="kunyomi"
          />
          <Readings
            reading={content.onyomi}
            classNames="text-white bg-red-600"
            title="onyomi"
          />
        </>
      )}

      {/* Keywords */}
      <Keywords keywords={content.keywords} />

      {/* Description */}
      {!!content.description && (
        <Description description={content.description} />
      )}
    </div>
  );
};

const TitlePill = ({
  title,
  classNames,
}: {
  title: string;
  classNames?: string;
}) => {
  return (
    <span
      className={`text-xs font-semibold flex justify-center items-center ${
        classNames || "text-black bg-white"
      } w-fit px-3 py-1 rounded-xl uppercase`}
    >
      {title}
    </span>
  );
};

const KanjiScript = ({
  kanji,
  primaryKeyword,
}: {
  kanji: string | null;
  primaryKeyword: string;
}) => {
  const image = useLazyImage("primitives", noUnicodePrimitves[primaryKeyword]);

  return (
    <div className="flex items-center justify-center pb-4 pt-2">
      {kanji ? (
        <h2 className="text-5xl font-semibold py-5">{kanji}</h2>
      ) : (
        <div className="py-3">
          {image.status === "success" ? (
            <img className="h-24" src={image.src} alt={primaryKeyword} />
          ) : image.status === "error" ? (
            <ImageIcon className="h-24" />
          ) : (
            <LoaderIcon className="h-24 animate-spin" />
          )}
        </div>
      )}
    </div>
  );
};

const Readings = ({
  reading,
  classNames = "",
  title,
}: {
  reading?: string[];
  classNames?: string;
  title: string;
}) => {
  return (
    <div className="flex space-x-2">
      <div>
        <TitlePill classNames={classNames} title={title} />
      </div>
      <div>{reading && <span>{reading.join(", ")}</span>}</div>
    </div>
  );
};

const Keywords = ({
  keywords,
}: {
  keywords: {
    primary: string;
    secondary: string[];
  };
}) => {
  return (
    <div className="space-y-2">
      <TitlePill title="keywords" classNames="text-white bg-violet-600" />
      <p className="px-2">
        <span className="font-bold">{keywords.primary}</span>
        {keywords.secondary.length > 0 && (
          <span>{`; ${keywords.secondary.join(", ")}`}</span>
        )}
      </p>
    </div>
  );
};

const Description = ({
  description,
}: {
  description: {
    has_image: boolean;
    info: string;
  };
}) => {
  return (
    <div className="space-y-2">
      <TitlePill title="Description" classNames="text-white bg-fuchsia-600" />

      {description.has_image ? (
        <p className="text-md px-2">
          {reactStringReplace(
            description.info,
            /(paste-\S+?(?:jpe?g|png|gif))/g,
            (match, i) => (
              <EmbeddedImage
                key={i}
                folder="description"
                fileName={match}
                alt={match}
                className="inline-block h-5"
              />
            )
          )}
        </p>
      ) : (
        <p className="text-md px-2">{description.info}</p>
      )}
    </div>
  );
};

const EmbeddedImage = ({
  fileName,
  folder,
  alt,
  className,
}: {
  folder: ImageFolder;
  fileName: string;
  alt: string;
  className?: string;
}) => {
  const image = useLazyImage(folder, fileName);

  return (
    <img
      className={`inline-block h-5 ${className}`}
      src={image.status === "success" ? image.src : ""}
      alt={alt}
    />
  );
};
