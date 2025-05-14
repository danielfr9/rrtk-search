import { useMemo } from "react";
import { type FilterOption } from "../assets/filters";
import { FilterIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "./theme-provider";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type IProps = {
  filters: FilterOption[];
  selectedFilter: FilterOption;
  changeFilter: (filter: FilterOption) => void;
  query: string;
  changeQuery: (searchValue: string) => void;
};

const Header = ({
  filters,
  selectedFilter,
  changeFilter,
  query,
  changeQuery,
}: IProps) => {
  const { theme } = useTheme();
  const dark = useMemo(() => theme === "dark", [theme]);

  return (
    <header
      className={`flex items-center space-x-4 w-full p-4 h-20 ${
        dark ? "bg-[#0E182F] text-gray-300" : "bg-white shadow-md"
      }`}
    >
      <h1 className="font-bold text-xl hidden md:inline-block md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-sky-600">
        RRTK
      </h1>
      <div className="flex w-full">
        <Input
          className={`border focus:ring-1 text-sm h-10 w-full px-3 rounded-md rounded-r-none outline-none ${
            dark
              ? "bg-slate-800 border-slate-700 text-gray-300 placeholder:text-gray-300 focus:border-blue-900  focus:ring-blue-900"
              : "bg-gray-200 border-slate-300 text-gray-800 placeholder:text-gray-800 focus:border-blue-500  focus:ring-blue-500"
          }`}
          placeholder="Search a keyword, kanji or number"
          value={query}
          onChange={(e) => changeQuery(e.target.value)}
        />
        <FilterMenu
          filters={filters}
          selectedFilter={selectedFilter}
          changeFilter={changeFilter}
        />
      </div>
      <ModeToggle />
    </header>
  );
};

export default Header;

const FilterMenu = ({
  filters,
  selectedFilter,
  changeFilter,
}: {
  filters: FilterOption[];
  selectedFilter: FilterOption;
  changeFilter: (filter: FilterOption) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={`h-auto rounded-r-md rounded-l-none`}>
          <FilterIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {filters.map((filter) => (
          <DropdownMenuItem
            key={filter.title}
            onClick={() => changeFilter(filter)}
            className={`cursor-pointer ${
              filter === selectedFilter &&
              "bg-gradient-to-r from-blue-700 to-sky-600 !text-white"
            } font-semibold`}
          >
            {filter.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
