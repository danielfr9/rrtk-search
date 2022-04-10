import { useState, useEffect } from "react";

const useSearch = (data, virtuoso) => {
  const [kanjiList, setKanjiList] = useState(data);
  const [searchResult, setSearchResult] = useState(data);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let ignore = false;

    const handleSearch = (value) => {
      let searchQuery = value.toLowerCase().trim();

      if (searchQuery === "") return kanjiList;

      const searchList = kanjiList.filter((kanji) => {
        if (kanji.heisig_number) {
          if (kanji.heisig_number.includes(searchQuery)) return true;
        }
        if (kanji.kanji) {
          if (kanji.kanji.includes(searchQuery)) return true;
        }

        if (kanji.keywords.primary.includes(searchQuery)) return true;
        // if (kanji.keywords.secondary.includes(searchQuery)) return true;

        return false;
      });

      return searchList;
    };

    const result = handleSearch(query);
    if (!ignore) {
      setSearchResult(result);
      virtuoso.current.scrollToIndex({
        index: 0,
      });
    }

    return () => (ignore = true);
  }, [query, kanjiList, virtuoso]);

  return { query, setQuery, searchResult, setKanjiList };
};

export default useSearch;
