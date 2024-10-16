/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// type TableProps = {
//   columns: any;
//   data: any;
//   isLoading: boolean;
// };

// const Table = ({ columns, data, isLoading }: any) => {
//   const table = useReactTable({
//     columns,
//     data,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <section>
//       {table ? (
//         <table className="w-full">
//           <thead>
//             {table?.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     className="text-left pr-10 pl-2 whitespace-nowrap"
//                   >
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table?.getRowModel().rows.map((row) => (
//               <tr key={row.id} className="border-b-2 border-b-grey-100">
//                 {row?.getVisibleCells().map((cell) => (
//                   <td
//                     key={cell.id}
//                     className="px-2 whitespace-nowrap py-3 w-full"
//                   >
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="text-center py-4">
//           {/* Optional: Loading spinner or message */}
//           No data available
//         </div>
//       )}
//     </section>

//     // <section>
//     //   {/* Check if data is still loading */}
//     //   {isLoading ? ( // Add your loading state check here
//     //     <div className="text-center py-4">
//     //       {/* Optional: Loading spinner or message */}
//     //       Loading data...
//     //     </div>
//     //   ) : table ? ( // Check if the table exists
//     //     <table className="w-full">
//     //       <thead>
//     //         {table.getHeaderGroups().map((headerGroup) => (
//     //           <tr key={headerGroup.id}>
//     //             {headerGroup.headers.map((header) => (
//     //               <th
//     //                 key={header.id}
//     //                 className="text-left pr-10 pl-2 whitespace-nowrap"
//     //               >
//     //                 {flexRender(
//     //                   header.column.columnDef.header,
//     //                   header.getContext()
//     //                 )}
//     //               </th>
//     //             ))}
//     //           </tr>
//     //         ))}
//     //       </thead>
//     //       <tbody>
//     //         {table.getRowModel().rows.map((row) => (
//     //           <tr key={row.id} className="border-b-2 border-b-grey-100">
//     //             {row.getVisibleCells().map((cell) => (
//     //               <td
//     //                 key={cell.id}
//     //                 className="px-2 whitespace-nowrap py-3 w-full"
//     //               >
//     //                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
//     //               </td>
//     //             ))}
//     //           </tr>
//     //         ))}
//     //       </tbody>
//     //     </table>
//     //   ) : (
//     //     <div className="text-center py-4">No data available</div>
//     //   )}
//     // </section>
//   );
// };

const Table = ({ data, columns, isLoading }: any) => {
  // Initialize table instance with useReactTable
  const table = useReactTable({
    data: data || [], // Provide empty array if data is not loaded yet
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section>
      {isLoading ? (
        <div className="text-center py-4">Loading data...</div>
      ) : table ? (
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left pr-10 pl-2 whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
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
      ) : (
        <div className="text-center py-4">No data available</div>
      )}
    </section>
  );
};

export default Table;
