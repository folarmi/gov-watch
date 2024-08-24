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
      {table ? (
        <table className="w-full">
          <thead>
            {table?.getHeaderGroups().map((headerGroup) => (
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
            {table?.getRowModel().rows.map((row) => (
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
      ) : (
        <div className="text-center py-4">
          {/* Optional: Loading spinner or message */}
          No data available
        </div>
      )}
    </section>
  );
};

export default Table;
