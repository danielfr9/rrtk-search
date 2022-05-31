import { useState } from "react";

const useFilter = (data: kanjiData[], filters: filterOption[]) => {
  const [selected, setSelected] = useState(filters[0]);
  const [filteredData, setFilteredData] = useState(data);

  const handleFilter = (index: number) => {
    if (filters[index] === selected) return;

    setSelected(filters[index]);

    let result = [];

    // Option: All
    if (filters[index].min === 1 && filters[index].max === null) {
      result = data;
    }
    // Option: Primitives
    else if (!(filters[index].min || filters[index].max))
      result = data.filter((kanji) => kanji.heisig_number === null);
    // Option: 1-500, 501-1000, 1001-1500, 1501-2000
    else if (filters[index].min && filters[index].max)
      result = data.filter((kanji) => {
        return (
          parseInt(kanji.heisig_number || "") >= filters[index].min! &&
          parseInt(kanji.heisig_number || "") <= filters[index].max!
        );
      });
    // Option: 2001+
    else
      result = data.filter((kanji) => {
        return parseInt(kanji.heisig_number || "") >= filters[index].min!;
      });

    setFilteredData(result);
  };

  return { selected, handleFilter, filteredData };
};

export default useFilter;
