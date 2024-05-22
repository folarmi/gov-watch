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
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const toggleFilter = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  console.log(showFilterDropdown);

  const handleSearch = () => {
    // Call the onSearch callback with the search term
    onSearch(searchTerm);
  };

  return (
    <section className="hidden md:flex justify-center my-14">
      <div className="flex items-center justify-center bg-white p-2 w-1/2 rounded-[50px]  border border-primary">
        {/* <select
          className="px-2 py-1 mr-2 bg-white border rounded-md"
          onChange={(e) => setSearchTerm(e.target.value)}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select> */}

        <Image
          src={filterIcon}
          alt="a search icon"
          width={32}
          className="cursor-pointer "
          onClick={toggleFilter}
        />
        {showFilterDropdown && (
          <div
            className={`mt-6 absolute top-52 left-64  bg-green_100  text-offwhite font-medium text-xs rounded-md text-center transition-opacity  ${
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

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-2 py-1 bg-transparent border-0 focus:outline-none"
        />

        <button
          onClick={handleSearch}
          className="flex-shrink-0 bg-primary text-white px-4 py-2 "
        >
          <Image src={searchIcon} alt="a search icon" width={32} />
        </button>
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

// import React, { useState } from "react";
// import Image from "next/image";
// import searchIcon from "../../../public/searchIcon.svg";
// import filterIcon from "../../../public/filterIcon.svg";

// const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilterDropdown, setShowFilterDropdown] = useState(false);

//   const toggleFilter = () => {
//     setShowFilterDropdown(!showFilterDropdown);
//   };

//   const handleSearch = () => {
//     onSearch(searchTerm);
//   };

//   return (
//     <div className="relative">
//       <div className="flex justify-center my-14">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="flex-1 px-2 py-1 bg-transparent border-0 focus:outline-none"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-primary text-white px-4 py-2 rounded-tr-[50px] rounded-br-[50px]"
//         >
//           <Image src={searchIcon} alt="Search Icon" width={32} />
//         </button>
//       </div>
//       <button
//         className="bg-blue-500 text-white py-2 px-4 rounded absolute top-0 right-0 mt-2 mr-2"
//         onClick={toggleFilter}
//       >
//         Toggle Div
//       </button>
//       {showFilterDropdown && (
//         <div
//           className="absolute bg-white shadow-md p-4 rounded-lg transition-opacity opacity-100 duration-500"
//           style={{ top: "100%", right: 0, transform: "translateY(10px)" }}
//         >
//           <p className="border-b-2 pb-4 border-gray-200 whitespace-nowrap py-4 px-20">
//             Ministries, Departments, Agencies (MDAs)
//           </p>
//           <p className="border-b-2 pb-4 border-gray-200 whitespace-nowrap py-4 px-20">
//             Political actors
//           </p>
//           <p className="border-b-2 pb-4 border-gray-200 whitespace-nowrap py-4 px-20">
//             State
//           </p>
//           <p className="pb-4 whitespace-nowrap py-4 px-20">
//             Local Govt Area (LGA)
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;
