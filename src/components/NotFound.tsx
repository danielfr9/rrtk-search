import { useMemo } from "react";
import { useTheme } from "./theme-provider";
import { LanguagesIcon } from "lucide-react";

const NotFound = () => {
  const { theme } = useTheme();
  const dark = useMemo(() => theme === "dark", [theme]);

  return (
    <div
      className={`flex flex-col grow justify-center items-center m-4 space-y-4 ${
        dark ? "text-gray-300" : "text-gray-600"
      }`}
    >
      <div className="flex items-center space-x-6">
        <LanguagesIcon className="w-8 h-8 md:w-12 md:h-12" />
        <span className="font-semibold italic text-lg sm:text-xl md:text-2xl">
          No Kanji Found!
        </span>
      </div>
      <p className="text-xs sm:text-sm italic">
        Please try with a different kanji, keyword or number.
      </p>
    </div>
  );
};

export default NotFound;
