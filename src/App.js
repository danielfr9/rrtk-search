// Data
import { rrtk } from "./assets/data";
import { filterValues } from "./assets/filterValues";
// Hooks
import { useRef } from "react";
import useFilter from "./hooks/useFilter";
import useSearch from "./hooks/useSearch";
// Components
import { VirtuosoGrid } from "react-virtuoso";
import MainHeader from "./components/MainHeader";
import KanjiCard from "./components/KanjiCard";
// Dark Mode
import { Global, MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useLocalStorage, useColorScheme } from "@mantine/hooks";

const App = () => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage(preferredColorScheme);
  const dark = colorScheme === "dark";
  const virtuoso = useRef(null);

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const { query, setQuery, searchResult, setKanjiList } = useSearch(
    rrtk,
    virtuoso
  );
  const { selected, handleFilter } = useFilter(
    rrtk,
    filterValues,
    setKanjiList,
    setQuery
  );

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }}>
        <Global
          styles={(theme) => ({
            body: {
              backgroundColor:
                theme.colorScheme === "dark" ? "#101113" : "white",
              color: theme.colorScheme === "dark" ? "white" : "black",
            },
          })}
        />
        <div className="flex flex-col min-h-screen">
          <MainHeader
            filters={filterValues}
            menuSelected={selected}
            changeFilter={handleFilter}
            query={query}
            handleQuery={setQuery}
          />
          <VirtuosoGrid
            ref={virtuoso}
            style={{ flexGrow: 1 }}
            totalCount={searchResult.length}
            itemContent={(index) => <KanjiCard data={searchResult[index]} />}
            overscan={{ main: 200, reverse: 200 }}
            listClassName={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 px-3 ${
              dark && `bg-[#101113]`
            }`}
          />
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
