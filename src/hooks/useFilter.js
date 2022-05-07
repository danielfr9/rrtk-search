import { useState } from "react";

const useFilter = (data, filters) => {
  const [selected, setSelected] = useState(filters[0]);
  const [filteredData, setFilteredData] = useState(data);

  const handleFilter = (index) => {
    if (filters[index] === selected) return;

    setSelected(filters[index]);

    let result = [];

    if (filters[index].title === "All") {
      result = data;
    } else if (!(filters[index].min || filters[index].max))
      result = data.filter((kanji) => kanji.heisig_number === null);
    else if (filters[index].min && filters[index].max)
      result = data.filter((kanji) => {
        return (
          parseInt(kanji.heisig_number) >= parseInt(filters[index].min) &&
          parseInt(kanji.heisig_number) <= parseInt(filters[index].max)
        );
      });
    else
      result = data.filter((kanji) => {
        return parseInt(kanji.heisig_number) >= parseInt(filters[index].min);
      });

    setFilteredData(result);
  };

  return { selected, handleFilter, filteredData };
};

export default useFilter;
