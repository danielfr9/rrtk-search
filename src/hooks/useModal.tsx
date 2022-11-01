import { useState } from "react";

const initialState: Kanji = {
  heisig_number: null,
  kanji: null,
  keywords: {
    primary: "",
    secondary: [],
  },
  description: null,
  onyomi: [],
  kunyomi: [],
  stroke_count: null,
  jlpt: null,
  grade: null,
};

const kanjiApi = "https://kanjiapi.dev/v1/kanji/";

const useModal = (initValue: Kanji = initialState) => {
  const [content, setContent] = useState(initValue);
  const [opened, setOpened] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleOpenModal = async (data: Kanji) => {
    if (!data.kanji) {
      await setContent(data);
      await setOpened(true);
    } else {
      await setIsFetching(true);
      await setOpened(true);

      try {
        const result = await fetch(`${kanjiApi}${data.kanji}`).then((res) =>
          res.json()
        );

        await setContent({
          ...data,
          onyomi: result.on_readings,
          kunyomi: result.kun_readings,
          stroke_count: result.stroke_count,
          jlpt: result.jlpt,
          grade: result.grade,
        });
        await setIsFetching(false);
      } catch {
        console.log("Error Fetching Data");
        await setContent(data);
        await setIsFetching(false);
      }
    }
  };

  const handleCloseModal = () => {
    setOpened(false);
  };

  return { content, opened, isFetching, handleCloseModal, handleOpenModal };
};

export default useModal;
