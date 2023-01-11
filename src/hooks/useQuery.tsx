import { useDebouncedValue } from "@mantine/hooks";
import { useMemo, useState } from "react";

const useQuery = (filteredKanjis: Kanji[]) => {
  // Search input value
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 350);

  // List of kanjis based on the query, using the filtered list
  const resultKanjis = useMemo(() => {
    let searchQuery = debouncedQuery.toLowerCase().trim();

    if (searchQuery === "") return filteredKanjis;

    const searchList = filteredKanjis.filter((kanji) => {
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
  }, [filteredKanjis, debouncedQuery]);

  const handleChangeQuery = (searchValue: string) => setQuery(searchValue);

  return {
    query,
    handleChangeQuery,
    resultKanjis,
  };
};

export default useQuery;
