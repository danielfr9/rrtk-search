// Data
import noKanji from "../assets/noKanji";
// Components
import { Modal, Badge, Tooltip, ActionIcon } from "@mantine/core";
// Hooks
import { useClipboard } from "@mantine/hooks";
// Icons
import { BiCopy } from "react-icons/bi";

const InfoModal = ({ content, opened, handleCloseModal }) => {
  const clipboard = useClipboard({ timeout: 1500 });

  return (
    <Modal
      classNames={{ title: "grow" }}
      overflow="inside"
      opened={opened}
      onClose={() => handleCloseModal()}
      title={
        <div className="flex items-center justify-between">
          <Badge className="my-1" color="indigo" size="lg" variant="filled">
            {content.heisig_number || "Primitive"}
          </Badge>
        </div>
      }
    >
      <div className="flex items-center justify-center pb-4">
        {content.kanji ? (
          <h2 className="text-5xl font-semibold py-5">{content.kanji}</h2>
        ) : (
          <div className="py-5">
            <img
              className="h-12"
              src={`/primitives/${noKanji[content.keywords.primary]}`}
              alt={content.keywords.primary}
            />
          </div>
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
        <Badge className="mb-2 mr-2" color="indigo" size="md" variant="filled">
          JLPT: {content.jlpt || "N/A"}
        </Badge>
        <Badge className="mb-2 mr-2" color="teal" size="md" variant="filled">
          Grade: {content.grade || "N/A"}
        </Badge>
      </div>
      <div>
        <span className="text-lg font-semibold">
          {content.keywords.primary}
        </span>
        {content.keywords.secondary.length > 0 && (
          <span className="text-lg">{`; ${content.keywords.secondary.join(
            ", "
          )}`}</span>
        )}
      </div>
      <p className="text-md pt-2 pb-4">{content.description}</p>
      {content.kanji && (
        <>
          <div className="flex pb-4">
            <div style={{ width: 81 }} className="mr-2">
              <Badge color="cyan" size="md" variant="filled">
                Kunyomi:
              </Badge>
            </div>
            <div>
              <span>{content.kunyomi.join(", ")}</span>
            </div>
          </div>
          <div className="flex pb-4">
            <div style={{ width: 81 }} className="mr-2">
              <Badge fullWidth color="red" size="md" variant="filled">
                Onyomi:
              </Badge>
            </div>
            <div>
              <span>{content.onyomi.join(", ")}</span>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default InfoModal;
