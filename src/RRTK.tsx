// Data
import { rrtk } from "./assets/data";
import { FilterOption, filters } from "./assets/filters";
// Hooks
import { useRef, useMemo, useState } from "react";
import useModal from "./hooks/useModal";
import { useMantineColorScheme } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
// Components
import Header from "./components/Header";
import KanjiCard from "./components/KanjiCard";
import InfoModal from "./components/InfoModal";
import { VirtuosoGrid, VirtuosoGridHandle } from "react-virtuoso";
// Icons
import NotFound from "./components/NotFound";

const RRTK = () => {
  // Dark mode
  const { colorScheme } = useMantineColorScheme();
  // Check if is dark or light
  const dark = useMemo(() => colorScheme === "dark", [colorScheme]);

  // Kanji Card container
  const virtuoso = useRef<VirtuosoGridHandle>(null);

  // Filter Menu selected filter, default is ALL
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);

  // Search input
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 350);

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

  // List of kanjis based on the query, using the filtered list
  const queryKanjis = useMemo(() => {
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

  const { content, opened, isFetching, handleCloseModal, handleOpenModal } =
    useModal();

  return (
    <>
      <div
        className={`flex flex-col min-h-screen ${
          dark ? "bg-[#131F3E]" : "bg-white"
        } `}
      >
        <Header
          filters={filters}
          selectedFilter={selectedFilter}
          changeFilter={async (filter: FilterOption) => {
            setSelectedFilter(filter);
          }}
          query={query}
          changeQuery={(searchValue: string) => setQuery(searchValue)}
        />
        {queryKanjis.length === 0 ? (
          <NotFound />
        ) : (
          <VirtuosoGrid
            ref={virtuoso}
            style={{ flexGrow: 1 }}
            totalCount={queryKanjis.length}
            itemContent={(index) => (
              <KanjiCard
                data={queryKanjis[index]}
                handleOpenModal={handleOpenModal}
              />
            )}
            overscan={{ main: 200, reverse: 200 }}
            listClassName={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 my-3 mx-3`}
          />
        )}
      </div>
      <InfoModal
        content={content}
        isFetching={isFetching}
        opened={opened}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default RRTK;
