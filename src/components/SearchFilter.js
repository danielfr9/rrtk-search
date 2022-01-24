import { BsSearch, BsFilter } from "react-icons/bs";
import FilterBar from "./FilterBar";
import { useState, useEffect } from "react";

const SearchFilter = ({ rrtk, setLoading, setDisplayData, filterValues }) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(rrtk);
  const [showFilter, setShowFilter] = useState(false);
  const [selected, setSelected] = useState(filterValues[0]);

  const handleFilter = (option, index) => {
    if (option === selected) return;

    setSelected(filterValues[index]);
    setLoading(true);

    let result = [];

    if (option.title === "All") {
      result = rrtk;
    } else if (!(option.min || option.max))
      result = rrtk.filter((kanji) => kanji.rtkNumber === null);
    else if (option.min && option.max)
      result = rrtk.filter((kanji) => {
        return (
          parseInt(kanji.rtkNumber) >= parseInt(option.min) &&
          parseInt(kanji.rtkNumber) <= parseInt(option.max)
        );
      });
    else
      result = rrtk.filter((kanji) => {
        return parseInt(kanji.rtkNumber) >= parseInt(option.min);
      });

    setFilteredData(result);
    setDisplayData(result);
    setQuery("");
  };

  useEffect(() => {
    let ignore = false;

    const handleSearch = (value) => {
      let searchValue = value.toLowerCase().trim();
      setLoading(true);

      const filteredList = filteredData.filter((kanji) => {
        if (kanji.rtkNumber) {
          if (kanji.rtkNumber.includes(searchValue)) return true;
        }

        if (kanji.kanjiDesign) {
          if (kanji.kanjiDesign.includes(searchValue)) return true;
        }

        if (kanji.keywords.primary.includes(searchValue)) return true;
        if (kanji.keywords.secondary.includes(searchValue)) return true;

        return false;
      });

      return filteredList;
    };

    const result = handleSearch(query);
    if (!ignore) {
      setDisplayData(result);
    }

    return () => (ignore = true);
  }, [query, filteredData, setDisplayData, setLoading]);

  return (
    <div className="relative">
      <div className="flex bg-teal-800 items-center pl-4 pr-6">
        <label className="relative block w-full my-2 mr-4">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <BsSearch size="1rem" color="lightgray" />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search for the keyword, kanji or number"
            type="text"
            autoComplete="false"
          />
        </label>
        <BsFilter
          onClick={() => setShowFilter((prev) => !prev)}
          size="2rem"
          className="cursor-pointer text-white"
        />
      </div>
      {showFilter && (
        <FilterBar
          selected={selected}
          setSelected={setSelected}
          filterValues={filterValues}
          handleFilter={handleFilter}
        />
      )}
    </div>
  );
};

export default SearchFilter;
