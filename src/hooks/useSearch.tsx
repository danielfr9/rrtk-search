import { useState, useEffect } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { VirtuosoGridHandle } from "react-virtuoso";

const useSearch = (
  data: kanjiData[],
  virtuoso: React.RefObject<VirtuosoGridHandle>
) => {
  // Result based on the query
  const [searchResult, setSearchResult] = useState(data);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 350);

  useEffect(() => {
    let ignore = false;

    const handleSearch = (value: string) => {
      let searchQuery = value.toLowerCase().trim();

      if (searchQuery === "") return data;

      const searchList = data.filter((kanji) => {
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
      virtuoso?.current?.scrollToIndex({
        index: 0,
      });
    }

    return () => {
      ignore = true;
    };
  }, [debouncedQuery, data, virtuoso]);

  return { query, setQuery, searchResult };
};

export default useSearch;
