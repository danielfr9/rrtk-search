// Components
import { Header, TextInput, ActionIcon, Menu, Divider } from "@mantine/core";
// Utilities
import { useMantineColorScheme } from "@mantine/core";
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
  const dark = colorScheme === "dark";

  return (
    <div className="sticky top-0 z-50">
      <Header className="border-0 flex flex-col shadow-md" height={110} p="xs">
        <div className="flex items-center">
          <h1
            className={`font-semibold text-2xl text-center grow ${
              dark && "text-white"
            }`}
          >
            Recognition RTK
          </h1>
          <ActionIcon
            variant="hover"
            size="lg"
            onClick={() => toggleColorScheme()}
          >
            {dark ? <BsSunFill size="1.5rem" /> : <BsMoonFill size="1.5rem" />}
          </ActionIcon>
        </div>
        <div className="flex items-center py-3">
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
              <ActionIcon
                variant="hover"
                className="mr-1"
                color="cyan"
                size="lg"
              >
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
      </Header>
    </div>
  );
};

export default MainHeader;
