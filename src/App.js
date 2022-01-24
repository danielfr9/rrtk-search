import { useState } from "react/cjs/react.development";
import { rrtk } from "./rrtk-2";
import { useEffect, useRef } from "react";
import { HashLoader } from "react-spinners";

// Components
import KanjiCard from "./components/KanjiCard";
import SearchFilter from "./components/SearchFilter";
import NotFound from "./components/NotFound";

const optionRange = 400;
const filterValues = [
  {
    title: "All",
    min: 1,
    max: null,
  },
  {
    title: "Primitives",
    min: null,
    max: null,
  },
  ...[...new Array(Math.floor(2000 / 400 + 1))].map((item, index) => {
    return {
      title: `${index * optionRange + 1}${
        Math.floor(2000 / optionRange + 1) === index + 1
          ? "+"
          : `-${(index + 1) * optionRange}`
      }`,
      min: index * optionRange + 1,
      max:
        Math.floor(2000 / optionRange + 1) === index + 1
          ? null
          : (index + 1) * optionRange,
    };
  }),
];

// const fOpts = [...new Array(Math.floor(2000 / 400 + 1))].map((item, index) => {
//   return {
//     title: `${index * optionRange + 1}${
//       Math.floor(2000 / optionRange + 1) === index + 1
//         ? "+"
//         : `-${(index + 1) * optionRange}`
//     }`,
//     min: index * optionRange + 1,
//     max:
//       Math.floor(2000 / optionRange + 1) === index + 1
//         ? null
//         : (index + 1) * optionRange,
//   };
// });

let count = 0;

const App = () => {
  // Display Items
  const [isLoading, setLoading] = useState(false);

  // App States
  const [displayData, setDisplayData] = useState(rrtk);

  // Values
  const containerRef = useRef();

  console.log("Render #", ++count);

  useEffect(() => {
    setLoading(false);
    containerRef.current.scrollTop = 0;
  }, [displayData]);

  return (
    <div className="relative flex flex-col h-screen">
      <header className="flex flex-col sticky top-0 left-0 right-0">
        <div className="text-center bg-teal-600">
          <h1 className="font-bold text-white text-2xl p-2">Recognition RTK</h1>
        </div>
        <SearchFilter
          rrtk={rrtk}
          setLoading={setLoading}
          setDisplayData={setDisplayData}
          filterValues={filterValues}
        />
      </header>
      <div
        className="flex flex-col grow bg-slate-50 p-4 overflow-auto"
        ref={containerRef}
      >
        {isLoading ? (
          <div className="flex grow justify-center items-center">
            <HashLoader color="black" loading={isLoading} size={150} />
          </div>
        ) : displayData.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-rows-1 gap-4">
            {displayData.map((kanji) => (
              <KanjiCard
                key={`${kanji.keywords.primary}${kanji.rtkNumber}`}
                kanji={kanji}
              />
            ))}
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
};

export default App;
