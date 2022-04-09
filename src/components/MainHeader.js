// Components
import { Header, TextInput, ActionIcon, Menu, Divider } from "@mantine/core";
// Utilities
import { useMantineColorScheme, useMantineTheme } from "@mantine/core";
// Icons
import { HiOutlineAdjustments } from "react-icons/hi";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

const MainHeader = ({
  filters,
  menuSelected,
  changeFilter,
  query,
  handleQuery,
}) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const dark = colorScheme === "dark";

  return (
    <div className="sticky top-0 z-50">
      <Header className="border-0 flex items-center" height={60} p="xs">
        <h1
          className={`font-semibold text-2xl text-center grow ${
            dark && "text-white"
          }`}
        >
          Recognition RTK
        </h1>
        <ActionIcon size="lg" onClick={() => toggleColorScheme()}>
          {dark ? <BsSunFill size="1.3rem" /> : <BsMoonFill size="1.3rem" />}
        </ActionIcon>
      </Header>
      <div
        className={`flex items-center pb-2 px-2 shadow-md ${
          dark && `bg-[${theme.colors.dark[7]}]`
        }`}
      >
        <TextInput
          value={query}
          onChange={(e) => handleQuery(e.currentTarget.value)}
          className="grow mr-1"
          placeholder="Search with a keyword, kanji or number"
          variant="filled"
        />
        <Menu
          classNames={{ itemHovered: "bg-slate-300 text-black" }}
          control={
            <ActionIcon variant="hover" className="mr-1" color="cyan" size="lg">
              <HiOutlineAdjustments size="1.5rem" />
            </ActionIcon>
          }
        >
          <Menu.Label>Filters</Menu.Label>
          <Divider />
          {filters.map((item, index) => (
            <Menu.Item
              className={`font-semibold  ${
                item.title === menuSelected.title && `bg-amber-400 text-black`
              } `}
              onClick={() => changeFilter(index)}
              key={item.title}
            >
              {item.title}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default MainHeader;
