import { ActionIcon, Menu, useMantineColorScheme } from "@mantine/core";
import { useMemo } from "react";
import { HiOutlineAdjustments } from "react-icons/hi";
import { BsFillMoonFill, BsSun } from "react-icons/bs";
import { FilterOption } from "../assets/filters";

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
  const { colorScheme } = useMantineColorScheme();
  const dark = useMemo(() => colorScheme === "dark", [colorScheme]);

  return (
    <header
      className={`flex items-center space-x-4 w-full px-4 h-16 ${
        dark ? "bg-[#0E182F] text-gray-300" : "bg-white shadow-md"
      }`}
    >
      <h1 className="inline-block font-bold text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-sky-600">
        RRTK
      </h1>
      <div className="flex w-full">
        <input
          type="text"
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
      <DarkModeToggle size={20} />
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
  const { colorScheme } = useMantineColorScheme();
  const dark = useMemo(() => colorScheme === "dark", [colorScheme]);

  return (
    <Menu
      classNames={{
        item: `${
          dark
            ? "data-[hovered]:bg-gray-700 text-white"
            : "data-[hovered]:bg-gray-300 text-gray-600 font-semibold"
        }`,
        dropdown: `${dark ? "bg-gray-800 border-gray-800" : "bg-white"}`,
      }}
      shadow="md"
      width={200}
      position="bottom-end"
    >
      <Menu.Target>
        <button
          aria-label="Select list filter"
          className={`p-1 px-3 rounded-r-md h-auto ${
            dark ? "bg-gray-700" : "bg-gray-500"
          }  `}
        >
          <HiOutlineAdjustments
            className={`w-5 h-5 cursor-pointer ${
              dark ? "text-gray-300" : "text-white"
            }`}
          />
        </button>
      </Menu.Target>
      <Menu.Dropdown>
        {filters.map((filter) => (
          <Menu.Item
            className={`cursor-pointer ${
              filter === selectedFilter &&
              "bg-gradient-to-r from-blue-700 to-sky-600 !text-white"
            } active:text-white active:bg-gradient-to-r active:from-blue-700/60 active:to-sky-600/60 font-semibold mb-1 last:mb-0`}
            onClick={() => changeFilter(filter)}
            key={filter.title}
          >
            {filter.title}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

const DarkModeToggle = ({ size }: { size: number }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = useMemo(() => colorScheme === "dark", [colorScheme]);

  return (
    <ActionIcon
      aria-label="Toggle Dark Mode"
      variant="transparent"
      onClick={() => toggleColorScheme()}
    >
      {dark ? (
        <BsSun size={size} className="text-gray-300" />
      ) : (
        <BsFillMoonFill size={size} className="text-gray-600" />
      )}
    </ActionIcon>
  );
};
