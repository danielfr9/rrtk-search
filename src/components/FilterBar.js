// import { useState } from "react";

const FilterBar = ({ selected, filterValues, handleFilter }) => {
  return (
    <div className="flex flex-wrap justify-center pt-4 pb-2 px-4 bg-white shadow-md">
      {filterValues.map((item, index) => (
        <div
          key={item.min}
          onClick={() => {
            handleFilter(item, index);
          }}
          className={`flex rounded-md p-2 ${
            selected === item
              ? "text-white bg-amber-500 hover:bg-amber-600"
              : "border border-dashed hover:border-transparent hover:text-white bg-white hover:bg-slate-400"
          } font-semibold cursor-pointer text-xs md:text-sm lg:text-base justify-center mr-2 mb-2`}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
