import { Modal, Badge } from "@mantine/core";

const InfoModal = ({ content, opened, handleCloseModal }) => {
  return (
    <Modal
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
      <div className="flex items-center justify-center py-4">
        <h2 className="text-5xl font-semibold py-5">{content.kanji}</h2>
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
      <p className="text-md py-2">{content.description}</p>
    </Modal>
  );
};

export default InfoModal;
