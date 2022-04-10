import { useState } from "react";

const useModal = () => {
  const [opened, setOpened] = useState(false);
  const [content, setContent] = useState(null);

  const handleOpenModal = async (data) => {
    if (!data.kanji) {
      await setContent(data);
    } else {
      try {
        const result = await fetch(
          `https://kanjiapi.dev/v1/kanji/${data.kanji}`
        ).then((res) => res.json());

        await setContent({
          ...data,
          onyomi: result.on_readings,
          kunyomi: result.kun_readings,
          stroke_count: result.stroke_count,
          jlpt: result.jlpt,
          grade: result.grade,
        });
      } catch {
        console.log("Error Fetching Data");
        await setContent(data);
      }
    }
    await setOpened(true);
  };

  const handleCloseModal = () => {
    setOpened(false);
  };

  return { opened, handleCloseModal, content, handleOpenModal };
};

export default useModal;
