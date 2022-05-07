import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { useCallback } from "react";

const useDarkMode = () => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage(preferredColorScheme);
  const dark = colorScheme === "dark";

  const toggleColorScheme = useCallback(
    (value) =>
      setColorScheme(
        (prevScheme) => value || (prevScheme === "dark" ? "light" : "dark")
      ),
    [setColorScheme]
  );

  return { dark, colorScheme, toggleColorScheme };
};

export default useDarkMode;
