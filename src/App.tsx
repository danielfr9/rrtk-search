import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import RRTK from "./RRTK";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <RRTK />
    </ThemeProvider>
  );
}

export default App;
