/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Loader from "./Loader";
import emptyImage from "../assets/emptyPage.svg";

const Table = ({
  data,
  columns,
  isLoading,
  rowCount,
  pagination,
  setPagination,
}: any) => {
  // Initialize table instance with useReactTable
  const table = useReactTable({
    data: data || [], // Provide empty array if data is not loaded yet
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    rowCount,
    state: {
      pagination,
    },
  });

  return (
    <section>
      {isLoading ? (
        <div className="text-center py-4">
          <Loader />
        </div>
      ) : table && table.getRowModel().rows.length > 0 ? (
        <>
          <div className="w-full overflow-x-auto">
            <table className="min-w-[600px] w-full table-auto border-collapse">
              {/* Table Header */}
              <thead className="bg-gray-200 sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 text-xs py-4 text-left font-semibold text-gray-700 border-b"
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

              {/* Table Body */}
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-100 border-b even:bg-gray-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-2 py-2 text-sm text-gray-600"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* // Pagination */}
          {data && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-md shadow-sm">
              {/* Pagination Buttons */}
              <button
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="First Page"
              >
                {"<<"}
              </button>
              <button
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Previous Page"
              >
                {"<"}
              </button>
              <button
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Next Page"
              >
                {">"}
              </button>
              <button
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Last Page"
              >
                {">>"}
              </button>

              {/* Page Number Display */}
              <span className="flex items-center gap-2 text-gray-700 text-sm font-semibold">
                <div>Page</div>
                <strong className="text-gray-900">
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount().toLocaleString()}
                </strong>
              </span>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <div className="flex flex-col items-center justify-center space-y-2 py-8">
            <img src={emptyImage} alt="No data" className="" />
            <p className="text-gray-500 text-sm">No data available</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Table;

{
  /* Optional Controls: Uncomment if needed */
}
{
  /* Go to Page */
}
{
  /*
  <span className="flex items-center gap-2">
    <label htmlFor="gotoPage" className="text-gray-700">Go to page:</label>
    <input
      type="number"
      id="gotoPage"
      min="1"
      max={table.getPageCount()}
      defaultValue={table.getState().pagination.pageIndex + 1}
      onChange={(e) => {
        const page = e.target.value ? Number(e.target.value) - 1 : 0;
        table.setPageIndex(page);
      }}
      className="border border-gray-300 rounded-md px-2 py-1 w-16 text-center text-gray-700"
    />
  </span>
  */
}

{
  /* Page Size Selector */
}
{
  /*
  <select
    value={table.getState().pagination.pageSize}
    onChange={(e) => {
      table.setPageSize(Number(e.target.value));
    }}
    className="border border-gray-300 rounded-md px-3 py-1 text-gray-700"
  >
    {[10, 20, 30, 40, 50].map((pageSize) => (
      <option key={pageSize} value={pageSize}>
        Show {pageSize}
      </option>
    ))}
  </select>
  */
}
