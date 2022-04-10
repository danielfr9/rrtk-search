import { useState } from "react";

// TODO: API Fetch

const useModal = () => {
  const [opened, setOpened] = useState(false);
  const [content, setContent] = useState(null);

  const handleOpenModal = async (data) => {
    await setContent(data);
    await setOpened(true);
  };

  const handleCloseModal = () => {
    setOpened(false);
  };

  return { opened, handleCloseModal, content, handleOpenModal };
};

export default useModal;
