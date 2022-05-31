// Data
import { rrtk } from "./assets/data";
import { filters } from "./assets/filters";
// Hooks
import { useRef, useMemo } from "react";
import useFilter from "./hooks/useFilter";
import useSearch from "./hooks/useSearch";
import useModal from "./hooks/useModal";
import { useMantineColorScheme } from "@mantine/core";
// Components
import { VirtuosoGrid, VirtuosoGridHandle } from "react-virtuoso";
import MainHeader from "./components/MainHeader";
import KanjiCard from "./components/KanjiCard";
import InfoModal from "./components/InfoModal";

const RRTK = () => {
  const virtuoso = useRef<VirtuosoGridHandle>(null);
  const { colorScheme } = useMantineColorScheme();
  const dark = useMemo(() => colorScheme === "dark", [colorScheme]);

  const { selected, handleFilter, filteredData } = useFilter(rrtk, filters);
  const { query, setQuery, searchResult } = useSearch(filteredData, virtuoso);
  const { content, opened, isFetching, handleCloseModal, handleOpenModal } =
    useModal();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <MainHeader
          filters={filters}
          menuSelected={selected}
          changeFilter={handleFilter}
          query={query}
          setQuery={setQuery}
        />
        <VirtuosoGrid
          ref={virtuoso}
          style={{ flexGrow: 1 }}
          totalCount={searchResult.length}
          itemContent={(index) => (
            <KanjiCard
              data={searchResult[index]}
              handleOpenModal={handleOpenModal}
            />
          )}
          overscan={{ main: 200, reverse: 200 }}
          listClassName={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 px-3 ${
            dark && `bg-[#101113]`
          }`}
        />
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
