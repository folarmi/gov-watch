/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useState } from "react";
import { searchBarFilter } from "../data";
import { useController } from "react-hook-form";

interface SearchBarProps {
  // onSearch: (searchTerm: string) => void;
  setSelectedFilter: (searchTerm: string) => void;
  setQueryParam: (searchTerm: string) => void;
  name: string;
  control: any;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setSelectedFilter,
  name,
  control,
}: SearchBarProps) => {
  const { field } = useController({
    name,
    control,
  });
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const toggleFilter = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const selectFilter = (name: string) => {
    setSelectedFilter(name);
    toggleFilter();
  };

  return (
    <section className="md:flex justify-center my-4 md:my-14">
      <div className="flex items-center border border-gray-300 rounded-[50px] overflow-hidden w-[370px] md:w-[719px] h-[54px]">
        <div className="px-3 cursor-pointer">
          <img
            src="/filterIcon.svg"
            alt="filter icon"
            width={30}
            height={30}
            className="cursor-pointer"
            onClick={toggleFilter}
          />
          {showFilterDropdown && (
            <div
              className={`mt-6 absolute md:top-52 md:left-64  bg-green_100  text-offwhite font-medium text-xs rounded-md text-center transition-opacity  ${
                showFilterDropdown
                  ? "opacity-100 duration-500"
                  : "opacity-0 duration-1000 pointer-events-none"
              }`}
            >
              {searchBarFilter?.map(({ id, name }) => (
                <div key={id} onClick={() => selectFilter(name)}>
                  <p className="border-b-2 pb-4 border-gray-100 whitespace-nowrap py-4 px-20">
                    {name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          {...field}
          type="text"
          name={name}
          className="flex-1 px-2 focus:outline-none"
        />
        <div className="bg-primary px-4 py-4">
          <img src="searchIcon.svg" alt="filter icon" width={20} height={20} />
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
