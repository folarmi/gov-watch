/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { useState } from "react";
// import { searchBarFilter } from "../data";
// import { useController } from "react-hook-form";

// interface SearchBarProps {
//   setSelectedFilter: (searchTerm: string) => void;
//   setQueryParam: (searchTerm: string) => void;
//   name: string;
//   control: any;
// }

// const SearchBar: React.FC<SearchBarProps> = ({
//   setSelectedFilter,
//   name,
//   control,
//   setQueryParam,
// }: SearchBarProps) => {
//   const { field } = useController({
//     name,
//     control,
//   });

//   const [showFilterDropdown, setShowFilterDropdown] = useState(false);
// const toggleFilter = () => {
//   setShowFilterDropdown(!showFilterDropdown);
// };

//   const selectFilter = (name: string) => {
//     setSelectedFilter(name);
//     toggleFilter();
//   };

//   const setParam = (name: string) => {
//     setQueryParam(name);
//   };
//   return (
//     <section className="md:flex justify-center my-4 md:my-14">
//       <div className="flex items-center border border-gray-300 rounded-[50px] overflow-hidden w-auto md:w-[719px] h-[54px]">
//         <div className="px-3 cursor-pointer">
//           <img
//             src="/filterIcon.svg"
//             alt="filter icon"
//             width={30}
//             height={30}
//             className="cursor-pointer"
//             onClick={toggleFilter}
//           />
// {showFilterDropdown && (
//   <div
//     className={`mt-6 absolute md:top-52 md:left-64  bg-green_100  text-offwhite font-medium text-xs rounded-md text-center transition-opacity  ${
//       showFilterDropdown
//         ? "opacity-100 duration-500"
//         : "opacity-0 duration-1000 pointer-events-none"
//     }`}
//   >
//     {searchBarFilter?.map(({ id, name }) => (
//       <div key={id} onClick={() => selectFilter(name)}>
//         <p className="border-b-2 pb-4 border-gray-100 whitespace-nowrap py-4 px-20">
//           {name}
//         </p>
//       </div>
//     ))}
//   </div>
// )}
//         </div>

//         <input
//           {...field}
//           type="text"
//           name={name}
//           className="flex-1 px-2 focus:outline-none"
//         />
//         <div
//           className="bg-primary px-4 py-4 cursor-pointer"
//           onClick={() => setParam(field.value)}
//         >
//           <img src="searchIcon.svg" alt="filter icon" width={20} height={20} />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SearchBar;

import React, { useState, useEffect, useCallback } from "react";
import { useController } from "react-hook-form";
import { searchBarFilter } from "../data";

interface SearchBarProps {
  setSelectedFilter: (searchTerm: string) => void;
  setQueryParam: (searchTerm: string) => void;
  name: string;
  control: any;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({
    setSelectedFilter,
    name,
    control,
    setQueryParam,
    loading,
  }: SearchBarProps) => {
    const { field } = useController({
      name,
      control,
    });

    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleFilter = useCallback(() => {
      setShowFilterDropdown((prev) => !prev);
    }, []);

    // const toggleFilter = () => {
    //   setShowFilterDropdown(!showFilterDropdown);
    // };

    const selectFilter = useCallback(
      (name: string) => {
        setSelectedFilter(name);
        setShowFilterDropdown(false);
      },
      [setSelectedFilter]
    );

    const handleSearch = useCallback(() => {
      setIsLoading(true); // Show loading indicator
      setQueryParam(field.value);

      // Simulate a delay for the search action (replace with actual API call)
      setTimeout(() => {
        setIsLoading(false); // Hide loading indicator
      }, 1000);
    }, [field.value, setQueryParam]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (!(event.target as HTMLElement).closest(".filter-dropdown")) {
          setShowFilterDropdown(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <section className="md:flex justify-center my-4 md:my-14">
        <div className="flex items-center border border-gray-300 rounded-[50px] overflow-hidden w-auto md:w-[719px] h-[54px]">
          <div className="px-3 cursor-pointer">
            <button
              type="button"
              aria-label="Toggle filter dropdown"
              onClick={() => toggleFilter()}
              className="relative"
            >
              {loading ? (
                <p>hghhh</p>
              ) : (
                <img
                  src="/filterIcon.svg"
                  alt="filter icon"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
              )}
            </button>
            {/* md:top-12 md:left-0 */}
            {showFilterDropdown && (
              <div className="mt-6 absolute z-40 bg-green_100 text-offwhite font-medium text-xs rounded-md text-center transition-opacity">
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
            value={field.value || ""}
            name={name}
            className="flex-1 px-2 focus:outline-none"
            placeholder="Search..."
            aria-label="Search input"
          />

          <button
            type="button"
            aria-label="Search"
            className="bg-primary px-4 py-4 cursor-pointer"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <img
                src="searchIcon.svg"
                alt="search icon"
                width={20}
                height={20}
              />
            )}
          </button>
        </div>
      </section>
    );
  }
);

export default SearchBar;

// {showFilterDropdown && (
//   <div
//     className={`mt-6 absolute md:top-52 md:left-64  bg-green_100  text-offwhite font-medium text-xs rounded-md text-center transition-opacity  ${
//       showFilterDropdown
//         ? "opacity-100 duration-500"
//         : "opacity-0 duration-1000 pointer-events-none"
//     }`}
//   >
//     {searchBarFilter?.map(({ id, name }) => (
//       <div key={id} onClick={() => selectFilter(name)}>
//         <p className="border-b-2 pb-4 border-gray-100 whitespace-nowrap py-4 px-20">
//           {name}
//         </p>
//       </div>
//     ))}
//   </div>
// )}
