// Data
import { filters } from "./assets/filters";
// Hooks
import { useRef, useMemo } from "react";
import useModal from "./hooks/useModal";
import { useMantineColorScheme } from "@mantine/core";
// Components
import Header from "./components/Header";
import KanjiCard from "./components/KanjiCard";
import InfoModal from "./components/InfoModal";
import { VirtuosoGrid, VirtuosoGridHandle } from "react-virtuoso";
// Icons
import NotFound from "./components/NotFound";
import useFilter from "./hooks/useFilter";
import useQuery from "./hooks/useQuery";

const RRTK = () => {
  // Dark mode
  const { colorScheme } = useMantineColorScheme();

  // Check if is dark or light
  const dark = useMemo(() => colorScheme === "dark", [colorScheme]);

  // Kanji cards container
  const virtuoso = useRef<VirtuosoGridHandle>(null);

  const { filteredKanjis, selectedFilter, handleChangeFilter } = useFilter(
    filters[0]
  );
  const { resultKanjis, query, handleChangeQuery } = useQuery(filteredKanjis);

  const {
    content,
    isOpened,
    isFetching,
    close: closeModal,
    open: openModal,
  } = useModal();

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
          changeFilter={handleChangeFilter}
          query={query}
          changeQuery={handleChangeQuery}
        />
        {resultKanjis.length === 0 ? (
          <NotFound />
        ) : (
          <VirtuosoGrid
            ref={virtuoso}
            style={{ flexGrow: 1 }}
            totalCount={resultKanjis.length}
            itemContent={(index) => (
              <KanjiCard
                data={resultKanjis[index]}
                handleOpenModal={openModal}
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
        opened={isOpened}
        handleCloseModal={closeModal}
      />
    </>
  );
};

export default RRTK;
