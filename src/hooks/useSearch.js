import { useState, useEffect } from "react";
import { useDebouncedValue } from "@mantine/hooks";

const useSearch = (data, virtuoso) => {
  // List used to search for elements (changes based on the filter)
  const [kanjiList, setKanjiList] = useState(data);
  // Result based on the query
  const [searchResult, setSearchResult] = useState(data);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 350);

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

    const result = handleSearch(debouncedQuery);
    if (!ignore) {
      setSearchResult(result);
      virtuoso.current.scrollToIndex({
        index: 0,
      });
    }

    return () => (ignore = true);
  }, [debouncedQuery, kanjiList, virtuoso]);

  return { query, setQuery, searchResult, setKanjiList };
};

export default useSearch;
