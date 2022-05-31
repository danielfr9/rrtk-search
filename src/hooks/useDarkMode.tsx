import { ColorScheme } from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { useCallback } from "react";

const useDarkMode = () => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: preferredColorScheme,
  });
  const dark = colorScheme === "dark";

  const toggleColorScheme = useCallback(
    (value?: ColorScheme) =>
      setColorScheme(
        (prevScheme) => value || (prevScheme === "dark" ? "light" : "dark")
      ),
    [setColorScheme]
  );

  return { dark, colorScheme, toggleColorScheme };
};

export default useDarkMode;
