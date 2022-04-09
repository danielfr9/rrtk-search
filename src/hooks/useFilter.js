import { useWindowScroll } from "@mantine/hooks";
import { useState } from "react";

const useFilter = (data, filterValues, setKanjiList, setQuery) => {
  const [filters] = useState(filterValues);
  const [selected, setSelected] = useState(filterValues[0]);
  const [kanjiData] = useState(data);
  const [, scrollTo] = useWindowScroll();

  const handleFilter = async (index) => {
    if (filters[index] === selected) return;

    setSelected(filters[index]);

    let result = [];

    if (filters[index].title === "All") {
      result = kanjiData;
    } else if (!(filters[index].min || filters[index].max))
      result = kanjiData.filter((kanji) => kanji.heisig_number === null);
    else if (filters[index].min && filters[index].max)
      result = kanjiData.filter((kanji) => {
        return (
          parseInt(kanji.heisig_number) >= parseInt(filters[index].min) &&
          parseInt(kanji.heisig_number) <= parseInt(filters[index].max)
        );
      });
    else
      result = kanjiData.filter((kanji) => {
        return parseInt(kanji.heisig_number) >= parseInt(filters[index].min);
      });

    await setKanjiList(result);
    await setQuery("");
    scrollTo({ y: 0 });
  };

  return { selected, handleFilter };
};

export default useFilter;
