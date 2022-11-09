import { Menu, useMantineColorScheme } from "@mantine/core";
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
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = useMemo(() => colorScheme === "dark", [colorScheme]);

  return (
    <header
      className={`px-4 pr-4 py-4 ${
        dark ? "bg-[#0E182F] text-gray-300" : "bg-white shadow-md"
      }`}
    >
      <div className="flex justify-between items-center space-x-4 md:space-x-4">
        <h1 className="grow w-fit font-bold text-xl md:text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-teal-500">
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
                    filter.title.toLowerCase() ===
                      selectedFilter.title.toLowerCase() &&
                    "bg-gradient-to-r from-amber-500 to-orange-600 !text-white"
                  } active:text-white active:bg-gradient-to-r active:from-orange-500 active:to-gray-700`}
                  onClick={() => changeFilter(filter)}
                  key={filter.title}
                >
                  {filter.title}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </div>
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            checked={dark}
            onChange={() => toggleColorScheme()}
          />
          <BsSun className="swap-on w-6 h-6 text-gray-300 cursor-pointer" />
          <BsFillMoonFill className="swap-off w-6 h-6 text-gray-600 cursor-pointer" />
        </label>
      </div>
    </header>
  );
};

export default Header;
