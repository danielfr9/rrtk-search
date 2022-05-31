// Data
import noKanji from "../assets/noKanji";
// Components
import { Modal, Badge, Tooltip, ActionIcon, Loader } from "@mantine/core";
// Hooks
import { useClipboard } from "@mantine/hooks";
// Icons
import { BiCopy } from "react-icons/bi";
// Utilities
import reactStringReplace from "react-string-replace";

const InfoModal = ({ content, isFetching, opened, handleCloseModal }) => {
  const clipboard = useClipboard({ timeout: 1500 });
  return (
    <Modal
      size="lg"
      classNames={{ title: "grow" }}
      overflow="inside"
      opened={opened}
      onClose={() => handleCloseModal()}
      title={
        !isFetching && (
          <div className="flex items-center justify-between">
            <Badge className="my-1" color="indigo" size="lg" variant="filled">
              {content.heisig_number || "Primitive"}
            </Badge>
          </div>
        )
      }
    >
      {isFetching ? (
        <div className="flex flex-col grow justify-center items-center py-12">
          <Loader size="lg" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center pb-4 pt-2">
            {content.kanji ? (
              <h2 className="text-5xl font-semibold py-5">{content.kanji}</h2>
            ) : (
              content.keywords.primary && (
                <div className="py-5">
                  <img
                    className="h-12"
                    src={`${process.env.PUBLIC_URL}/primitives/${
                      noKanji[content.keywords.primary]
                    }`}
                    alt={content.keywords.primary}
                  />
                </div>
              )
            )}
          </div>
          <div className="flex items-center justify-end">
            {content.kanji && (
              <Tooltip
                gutter={10}
                label={clipboard.copied ? "Copied" : "Copy Kanji"}
                color={clipboard.copied ? "indigo" : "cyan"}
                position="left"
                withArrow
              >
                <ActionIcon
                  onClick={() => clipboard.copy(content.kanji)}
                  radius="sm"
                  variant="hover"
                  color="cyan"
                  size="lg"
                >
                  <BiCopy size="1.5rem" />
                </ActionIcon>
              </Tooltip>
            )}
          </div>
          <div className="flex pb-2">
            <Badge
              className="mb-2 mr-2"
              color="indigo"
              size="md"
              variant="filled"
            >
              JLPT: {content.jlpt || "N/A"}
            </Badge>
            <Badge
              className="mb-2 mr-2"
              color="teal"
              size="md"
              variant="filled"
            >
              Grade: {content.grade || "N/A"}
            </Badge>
          </div>
          {content.kanji && (
            <>
              <div className="flex py-2">
                <div style={{ width: 81 }} className="mr-2">
                  <Badge color="cyan" size="md" variant="filled">
                    Kunyomi:
                  </Badge>
                </div>
                <div>
                  {content.kunyomi && <span>{content.kunyomi.join(", ")}</span>}
                </div>
              </div>
              <div className="flex pb-4">
                <div style={{ width: 81 }} className="mr-2">
                  <Badge fullWidth color="red" size="md" variant="filled">
                    Onyomi:
                  </Badge>
                </div>
                <div>
                  {content.onyomi && <span>{content.onyomi.join(", ")}</span>}
                </div>
              </div>
            </>
          )}

          <div className="pb-8">
            <div className="pb-2">
              <Badge color="violet" variant="filled">
                Keywords
              </Badge>
              <p className="pt-2 px-2">
                <span className="font-bold">{content.keywords.primary}</span>
                {content.keywords.secondary.length > 0 && (
                  <span>{`; ${content.keywords.secondary.join(", ")}`}</span>
                )}
              </p>
            </div>
            {content.description &&
              (content.description.has_image ? (
                <div>
                  <Badge color="grape" variant="filled">
                    Description
                  </Badge>
                  <p className="text-md pt-2 px-2">
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
                </div>
              ) : (
                <div>
                  <Badge color="grape" variant="filled">
                    Description
                  </Badge>
                  <p className="text-md pt-2 px-2">
                    {content.description.info}
                  </p>
                </div>
              ))}
          </div>
        </>
      )}
    </Modal>
  );
};

export default InfoModal;
