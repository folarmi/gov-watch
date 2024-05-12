import React from "react";
import { useState } from "react";
import searchIcon from "../../../public/searchIcon.svg";
import filterIcon from "../../../public/filterIcon.svg";
import Image from "next/image";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Call the onSearch callback with the search term
    onSearch(searchTerm);
  };

  return (
    <section className="flex justify-center my-14">
      <div className="flex items-center justify-center bg-white p-2 w-1/2 rounded-tl-[50px] rounded-bl-[50px] border border-primary">
        {/* <select
          className="px-2 py-1 mr-2 bg-white border rounded-md"
          onChange={(e) => setSearchTerm(e.target.value)}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select> */}
        <Image src={filterIcon} alt="a search icon" width={32} />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-2 py-1 bg-transparent border-0 focus:outline-none"
        />

        <button
          onClick={handleSearch}
          className="flex-shrink-0 bg-primary text-white px-4 py-2 rounded-tr-[50px] rounded-br-[50px]"
        >
          <Image src={searchIcon} alt="a search icon" width={32} />
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
