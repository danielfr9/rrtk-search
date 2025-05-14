// Data
import { filters } from "./assets/filters";
// Hooks
import { useRef, useState } from "react";
import useModal from "./hooks/useModal";
// Components
import Header from "./components/Header";
import { KanjiCard, KanjiCardRow } from "./components/KanjiCard";
import InfoModal from "./components/InfoModal";
import {
  Virtuoso,
  VirtuosoGrid,
  type VirtuosoGridHandle,
} from "react-virtuoso";
// Icons
import NotFound from "./components/NotFound";
import useFilter from "./hooks/useFilter";
import useQuery from "./hooks/useQuery";
import { Button } from "./components/ui/button";
import { ChevronRightIcon, GridIcon, ListIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { getTotalKanjis, getTotalPrimitives } from "./assets/data";

const RRTK = () => {
  // Kanji cards container
  const virtuoso = useRef<VirtuosoGridHandle>(null);

  const { filteredKanjis, selectedFilter, handleChangeFilter } = useFilter(
    filters[0]
  );
  const { resultKanjis, query, handleChangeQuery } = useQuery(filteredKanjis);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const {
    content,
    isOpened,
    isFetching,
    close: closeModal,
    open: openModal,
  } = useModal();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
        <Header query={query} changeQuery={handleChangeQuery} />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col grow md:grow-0 md:flex-row gap-6">
            <div className="md:w-64 space-y-6">
              <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
                <h2 className="font-medium text-lg mb-3 text-white">
                  Categories
                </h2>
                <ul className="space-y-1">
                  {filters.map((filter) => {
                    const isActive = filter === selectedFilter;
                    const activeWrapperClass = isActive
                      ? "bg-sky-500/10 text-sky-500 font-medium"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white";

                    const activeBadgeClass = isActive
                      ? "text-xs bg-sky-500 text-white px-2 py-0.5 rounded-full"
                      : "text-xs bg-slate-700 px-2 py-0.5 rounded-full";

                    if (filter.id === "all")
                      return (
                        <li
                          key={filter.id}
                          onClick={() => handleChangeFilter(filter)}
                        >
                          <a
                            href="#"
                            // className="flex items-center justify-between p-2 rounded-md bg-sky-500/10 text-sky-500 font-medium"
                            className={`flex items-center justify-between p-2 rounded-md ${activeWrapperClass}`}
                          >
                            <span>All</span>
                            <span className={activeBadgeClass}>
                              {getTotalKanjis()}
                            </span>
                          </a>
                        </li>
                      );
                    if (filter.id === "primitives")
                      return (
                        <li
                          key={filter.id}
                          onClick={() => handleChangeFilter(filter)}
                        >
                          <a
                            href="#"
                            className={`flex items-center justify-between p-2 rounded-md ${activeWrapperClass}`}
                          >
                            <span>Primitives</span>
                            <span className={activeBadgeClass}>
                              {getTotalPrimitives()}
                            </span>
                          </a>
                        </li>
                      );

                    return (
                      <li
                        key={filter.id}
                        onClick={() => handleChangeFilter(filter)}
                      >
                        <a
                          href="#"
                          className={`flex items-center justify-between p-2 rounded-md ${activeWrapperClass}`}
                        >
                          <span>{filter.title}</span>
                          <ChevronRightIcon className="h-4 w-4" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
                <h2 className="font-medium text-lg mb-3 text-white">
                  Study Progress
                </h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Learned</span>
                      <span className="text-white">324/2500</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div
                        className="bg-sky-500 h-2 rounded-full"
                        style={{ width: "13%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Reviews Due</span>
                      <span className="text-orange-400">42</span>
                    </div>
                  </div>
                  <Button className="w-full mt-2 bg-sky-600 hover:bg-sky-700">
                    Start Review Session
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col grow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Primitives</h2>
                <div className="flex items-center gap-2">
                  <Tabs
                    defaultValue="grid"
                    onValueChange={(value) => {
                      setViewMode(value as "grid" | "list");
                    }}
                  >
                    <TabsList className="bg-slate-800">
                      <TabsTrigger value="grid">
                        <GridIcon className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="list">
                        <ListIcon className="h-4 w-4" />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-700"
                      >
                        Sort by: Frequency
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Frequency</DropdownMenuItem>
                      <DropdownMenuItem>Alphabetical</DropdownMenuItem>
                      <DropdownMenuItem>JLPT Level</DropdownMenuItem>
                      <DropdownMenuItem>Stroke Count</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {resultKanjis.length === 0 ? (
                <NotFound />
              ) : viewMode === "grid" ? (
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
                  listClassName={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3`}
                />
              ) : (
                <Virtuoso
                  data={resultKanjis}
                  totalCount={resultKanjis.length}
                  itemContent={(index) => (
                    <KanjiCardRow
                      data={resultKanjis[index]}
                      handleOpenModal={openModal}
                    />
                  )}
                  components={{
                    List: (props) => (
                      <div
                        className="flex flex-col gap-2"
                        style={{ height: "100%" }}
                        {...props}
                      />
                    ),
                  }}
                  overscan={{ main: 200, reverse: 200 }}
                />
              )}
            </div>
          </div>
        </main>
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
