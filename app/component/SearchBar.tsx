import React from "react";
import { useState } from "react";
import searchIcon from "../../public/searchIcon.svg";
import filterIcon from "../../public/filterIcon.svg";
import Image from "next/image";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const toggleFilter = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const handleSearch = () => {
    // Call the onSearch callback with the search term
    onSearch(searchTerm);
  };

  return (
    <section className="md:flex justify-center my-4 md:my-14">
      <div className="flex items-center border border-gray-300 rounded-[50px] overflow-hidden w-[370px] md:w-[719px] h-[54px]">
        <div className="px-3 cursor-pointer">
          <Image
            src={filterIcon}
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
              <p className="border-b-2 pb-4 border-grey_200 whitespace-nowrap py-4 px-20">
                Ministries, Departments, Agencies (MDAs)
              </p>
              <p className="border-b-2 pb-4 border-grey_200 whitespace-nowrap py-4 px-20">
                Political actors
              </p>
              <p className="border-b-2 pb-4 border-grey_200 whitespace-nowrap py-4 px-20">
                State
              </p>
              <p className="pb-4 whitespace-nowrap py-4 px-20">
                Local Govt Area (LGA)
              </p>
            </div>
          )}
        </div>
        <input type="text" className="flex-1 px-2 focus:outline-none" />
        <div className="bg-primary px-4 py-4">
          <Image src={searchIcon} alt="filter icon" width={20} height={20} />
        </div>
      </div>
    </section>
  );
};

export default SearchBar;

{
  /* <div
className={`absolute bg-white shadow-md p-4 rounded-lg transition-opacity ${
  showFilterDropdown
    ? "opacity-100 duration-500"
    : "opacity-0 duration-1000 pointer-events-none"
}`}
style={{ top: "100%", right: 0, transform: "translateY(10px)" }}
> */
}
