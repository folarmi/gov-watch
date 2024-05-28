import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
// import searchIcon from "../../../public/searchIcon.svg";
// import filterIcon from "../../../public/filterIcon.svg";
// import Image from "next/image";
// import CustomSelect from "./CustomSelect";
// import { useForm } from "react-hook-form";
// import trashCan from "../../../public/trash.svg";

const Table = ({ columns, data }: any) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section>
      {/* Search Bar */}
      <section className="flex items-center justify-between">
        {/* <div className="flex items-center border border-gray-300 rounded-[50px] overflow-hidden w-[420px] h-[54px]">
          <div className="px-3 cursor-pointer">
            <Image src={filterIcon} alt="filter icon" width={30} height={30} />
          </div>
          <input type="text" className="flex-1 px-2 focus:outline-none" />
          <div className="bg-primary px-4 py-4">
            <Image src={searchIcon} alt="filter icon" width={20} height={20} />
          </div>
        </div> */}

        {/* Dropdown */}
        {/* <div className="">
          <CustomSelect
            name="mySelect"
            options={options}
            label="Actions"
            control={control}
          />
        </div> */}

        {/* <Image src={trashCan} alt="trash can" className="" /> */}

        {/* <button
          type="button"
          className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
        >
          Apply
        </button> */}
      </section>

      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left pr-10 pl-2 whitespace-nowrap"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b-2 border-b-grey-100">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-2 whitespace-nowrap py-3 w-full"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
