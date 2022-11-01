import React, { useCallback } from "react";
// Dark  Mode
import { ColorScheme, ColorSchemeProvider } from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
// Components
import RRTK from "./RRTK";

const App = () => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: preferredColorScheme,
  });
  const toggleColorScheme = useCallback(
    (value?: ColorScheme) =>
      setColorScheme(
        (prevScheme) => value || (prevScheme === "dark" ? "light" : "dark")
      ),
    [setColorScheme]
  );

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <RRTK />
    </ColorSchemeProvider>
  );
};

export default App;
