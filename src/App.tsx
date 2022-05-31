// Hooks
import useDarkMode from "./hooks/useDarkMode";
// Dark  Mode
import { Global, MantineProvider, ColorSchemeProvider } from "@mantine/core";
// Components
import RRTK from "./RRTK";

const App = () => {
  const { colorScheme, toggleColorScheme } = useDarkMode();

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
        <RRTK />
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
