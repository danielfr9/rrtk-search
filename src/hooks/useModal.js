import { useState } from "react";

const useModal = () => {
  const [content, setContent] = useState({
    heisig_number: null,
    kanji: null,
    keywords: {
      primary: null,
      secondary: [],
    },
    description: null,
    onyomi: [],
    kunyomi: [],
    stroke_count: null,
    jlpt: null,
    grade: null,
  });
  const [opened, setOpened] = useState(false);

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

  return { content, opened, handleCloseModal, handleOpenModal };
};

export default useModal;
