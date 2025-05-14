import { SearchIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Input } from "./ui/input";

type IProps = {
  query: string;
  changeQuery: (searchValue: string) => void;
};

const Header = ({ query, changeQuery }: IProps) => {
  return (
    <>
      <header className="border-b border-slate-800 px-4 py-3 sticky top-0 bg-slate-950/80 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-8">
            <h1 className="text-2xl font-bold text-sky-500">RRTK</h1>
            {/* <nav className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-white hover:text-sky-400 transition">
                  Dashboard
                </a>
                <a href="#" className="text-slate-400 hover:text-sky-400 transition">
                  Study
                </a>
                <a href="#" className="text-slate-400 hover:text-sky-400 transition">
                  Dictionary
                </a>
                <a href="#" className="text-slate-400 hover:text-sky-400 transition">
                  Progress
                </a>
              </nav> */}
          </div>

          <div className="flex items-center max-md:w-full gap-3">
            <div className="relative w-full md:w-80">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                className="pl-9 bg-slate-900 border-slate-700 focus:border-sky-500"
                placeholder="Search a keyword, kanji or number"
                value={query}
                onChange={(e) => changeQuery(e.target.value)}
              />
            </div>
            <ModeToggle />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
