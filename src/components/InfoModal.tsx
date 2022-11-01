// Data
import noKanji from "../assets/noKanji";
// Components
import { Modal, Tooltip, Loader, useMantineColorScheme } from "@mantine/core";
// Hooks
import { useClipboard } from "@mantine/hooks";
// Icons
import { BiCopy } from "react-icons/bi";
// Utilities
import reactStringReplace from "react-string-replace";
import { useMemo } from "react";

type IProps = {
  content: Kanji;
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
  const clipboard = useClipboard({ timeout: 1500 });

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
      onClose={() => handleCloseModal()}
      title={
        !isFetching && (
          <span className="text-xs font-semibold flex justify-center items-center text-white bg-blue-600 w-fit px-3 py-1 rounded-xl uppercase">
            {content.heisig_number || "Primitive"}
          </span>
        )
      }
    >
      {isFetching ? (
        <div className="flex flex-col grow justify-center items-center py-12">
          <Loader size="lg" />
        </div>
      ) : (
        <>
          <div className="space-y-4 pb-4">
            {/* Number/Primitive and Kanji/Image */}
            <div className="flex items-center justify-center pb-4 pt-2">
              {content.kanji ? (
                <h2 className="text-5xl font-semibold py-5">{content.kanji}</h2>
              ) : (
                <div className="py-3">
                  <img
                    className="h-24"
                    src={`${process.env.PUBLIC_URL}/primitives/${
                      noKanji[content.keywords.primary]
                    }`}
                    alt={content.keywords.primary}
                  />
                </div>
              )}
            </div>
            {/* Clipboard */}
            <div className="flex items-center justify-end pr-6">
              {content.kanji && (
                <Tooltip
                  offset={10}
                  label={clipboard.copied ? "Copied" : "Copy Kanji"}
                  color={clipboard.copied ? "indigo" : "cyan"}
                  position="left"
                  withArrow
                >
                  <button>
                    <BiCopy
                      onClick={() => clipboard.copy(content.kanji)}
                      className="w-6 h-6 text-gray-400 cursor-pointer"
                    />
                  </button>
                </Tooltip>
              )}
            </div>
            {/* JLPT & Grade */}
            <div className="flex space-x-2">
              <span className="text-xs font-semibold flex justify-center items-center text-white bg-indigo-600 w-fit px-3 py-1 rounded-xl uppercase">
                JLPT: {content.jlpt || "N/A"}
              </span>
              <span className="text-xs font-semibold flex justify-center items-center text-white bg-teal-600 w-fit px-3 py-1 rounded-xl uppercase">
                Grade: {content.grade || "N/A"}
              </span>
            </div>

            {/* Kunyomi & Onyomi */}
            {content.kanji && (
              <>
                <div className="flex space-x-2">
                  <div>
                    <span className="text-xs font-semibold flex justify-center items-center text-white bg-cyan-600 w-fit px-3 py-1 rounded-xl uppercase">
                      Kunyomi
                    </span>
                  </div>
                  <div>
                    {content.kunyomi && (
                      <span>{content.kunyomi.join(", ")}</span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div>
                    <span className="text-xs font-semibold flex justify-center items-center text-white bg-red-600 w-fit px-3 py-1 rounded-xl uppercase">
                      Onyomi
                    </span>
                  </div>
                  <div>
                    {content.onyomi && <span>{content.onyomi.join(", ")}</span>}
                  </div>
                </div>
              </>
            )}

            {/* Keywords */}
            <div>
              <span className="text-xs mb-1 font-semibold flex justify-center items-center text-white bg-violet-600 w-fit px-3 py-1 rounded-xl uppercase">
                Keywords
              </span>
              <p className="px-2">
                <span className="font-bold">{content.keywords.primary}</span>
                {content.keywords.secondary.length > 0 && (
                  <span>{`; ${content.keywords.secondary.join(", ")}`}</span>
                )}
              </p>
            </div>

            {/* Description */}
            {!!content.description && (
              <div>
                <span className="text-xs mb-1 font-semibold flex justify-center items-center text-white bg-fuchsia-600 w-fit px-3 py-1 rounded-xl uppercase">
                  Description
                </span>
                {content.description.has_image ? (
                  <p className="text-md px-2">
                    {reactStringReplace(
                      content.description.info,
                      /(paste-\S+?(?:jpe?g|png|gif))/g,
                      (match, i) => (
                        <img
                          alt={match}
                          key={i}
                          src={`${process.env.PUBLIC_URL}/description_images/${match}`}
                          className="inline-block h-5"
                        />
                      )
                    )}
                  </p>
                ) : (
                  <p className="text-md px-2">{content.description.info}</p>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </Modal>
  );
};

export default InfoModal;
