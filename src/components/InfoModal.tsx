// Data
import noUnicodePrimitves from "../assets/noUnicodePrimitives";
// Components
import ClipboardButton from "./ClipboardButton";
import { Modal, Loader, useMantineColorScheme } from "@mantine/core";
// Utilities
import reactStringReplace from "react-string-replace";
import { useMemo } from "react";

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
  const { colorScheme } = useMantineColorScheme();
  const dark = useMemo(() => colorScheme === "dark", [colorScheme]);

  return (
    <Modal
      size="lg"
      classNames={{
        title: "grow",
        modal: `${
          dark ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"
        }`,
        overlay: `${dark === false && "bg-gray-700"}`,
        body: "pb-4",
        close: "hover:bg-transparent active:bg-transparent",
      }}
      overflow="inside"
      opened={opened}
      onClose={handleCloseModal}
      title={
        !isFetching &&
        content && (
          <span className="text-xs font-semibold flex justify-center items-center text-white bg-blue-600 w-fit px-3 py-1 rounded-xl uppercase">
            {content.heisig_number || "Primitive"}
          </span>
        )
      }
      exitTransitionDuration={200}
      centered
    >
      {isFetching ? (
        <div className="flex flex-col grow justify-center items-center py-12">
          <Loader size="lg" />
        </div>
      ) : (
        <ModalContent content={content} />
      )}
    </Modal>
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
  return (
    <div className="flex items-center justify-center pb-4 pt-2">
      {kanji ? (
        <h2 className="text-5xl font-semibold py-5">{kanji}</h2>
      ) : (
        <div className="py-3">
          <img
            className="h-24"
            src={
              new URL(
                `/src/assets/images/primitives/${noUnicodePrimitves[primaryKeyword]}`,
                import.meta.url
              ).href
            }
            alt={primaryKeyword}
          />
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
              <img
                alt={match}
                key={i}
                src={
                  new URL(
                    `/src/assets/images/description_images/${match}`,
                    import.meta.url
                  ).href
                }
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
