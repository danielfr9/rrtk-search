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
// Icons
import { RiTranslate } from "react-icons/ri";

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
        {searchResult.length === 0 ? (
          <div className="flex flex-col grow justify-center items-center m-4 space-y-4">
            <div className="flex items-center space-x-6">
              <RiTranslate className="w-8 h-8 md:w-12 md:h-12" />
              <span className="font-semibold italic text-lg sm:text-xl md:text-2xl">
                No Kanji Found!
              </span>
            </div>
            <p className="text-xs sm:text-sm italic">
              Please try with a different kanji, keyword or number.
            </p>
          </div>
        ) : (
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
