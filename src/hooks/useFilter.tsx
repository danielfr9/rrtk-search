import { useMemo, useState } from "react";
import { rrtk } from "../assets/data";
import type { FilterOption } from "../assets/filters";

const useFilter = (initialFilter: FilterOption) => {
  // Currently selected filter from the Filter Menu (default: "ALL")
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);

  const handleChangeFilter = (filter: FilterOption) =>
    setSelectedFilter(filter);

  // List of kanjis based on the filter
  const filteredKanjis = useMemo(() => {
    let result = [];

    // Option: All
    if (selectedFilter.min === 1 && selectedFilter.max === null) {
      result = rrtk;
    }
    // Option: Primitives
    else if (!(selectedFilter.min || selectedFilter.max))
      result = rrtk.filter((kanji) => kanji.heisig_number === null);
    // Option: 1-500, 501-1000, 1001-1500, 1501-2000
    else if (selectedFilter.min && selectedFilter.max)
      result = rrtk.filter((kanji) => {
        return (
          parseInt(kanji.heisig_number || "") >= selectedFilter.min! &&
          parseInt(kanji.heisig_number || "") <= selectedFilter.max!
        );
      });
    // Option: 2001+
    else
      result = rrtk.filter((kanji) => {
        return parseInt(kanji.heisig_number || "") >= selectedFilter.min!;
      });

    return result;
  }, [selectedFilter]);

  return {
    selectedFilter,
    handleChangeFilter,
    filteredKanjis,
  };
};

export default useFilter;
