import { useState } from "react";

// const defaultState: Kanji = {
//   heisig_number: null,
//   kanji: null,
//   keywords: {
//     primary: "",
//     secondary: [],
//   },
//   description: null,
//   onyomi: [],
//   kunyomi: [],
//   stroke_count: null,
//   jlpt: null,
//   grade: null,
// };

const KANJI_API_URL = "https://kanjiapi.dev/v1/kanji/";

const useModal = (initialState?: Kanji) => {
  const [content, setContent] = useState(initialState || null);
  const [isOpened, setOpened] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const open = async (data: Kanji) => {
    if (!data.kanji) {
      // The element doesn't have a Unicode value
      // Set the default data for this element
      setContent(data);
      // Open the modal for the element
      setOpened(true);
    } else {
      // Attempt to fetch the information for the kanji
      setIsFetching(true);
      // Open the modal while the data is fetching
      setOpened(true);

      // TODO: Cache fetches
      try {
        const response = await fetch(`${KANJI_API_URL}${data.kanji}`);
        const result: Kanjiapi_Kanji = await response.json();

        setContent({
          ...data,
          onyomi: result.on_readings,
          kunyomi: result.kun_readings,
          stroke_count: result.stroke_count,
          jlpt: result.jlpt,
          grade: result.grade,
        });
        setIsFetching(false);
      } catch {
        console.log("Error fetching data");

        // Set content with default data
        setContent(data);
        setIsFetching(false);
      }
    }
  };

  const close = () => setOpened(false);

  return { content, isOpened, isFetching, close, open };
};

export default useModal;
