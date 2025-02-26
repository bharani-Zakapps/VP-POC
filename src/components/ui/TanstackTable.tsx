import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
//   TableMeta,
  flexRender,
} from "@tanstack/react-table";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  enableSorting?: boolean;
  enableFiltering?: boolean;
//    meta?: TableMeta<T>;
}

const DataTable = <T,>({
  data,
  columns,
  enableSorting = false,
  enableFiltering = false,
//   meta,
}: TableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
    // console.log(data,"dsadddddddddddddd")
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: enableSorting ? setSorting : undefined,
    onGlobalFilterChange: enableFiltering ? setGlobalFilter : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    // meta,
  });

  return (
    <div className="border rounded-lg p-4">
      {/* Global Search Filter (Only if filtering is enabled) */}
      {enableFiltering && (
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="mb-4 p-2 border rounded w-full"
        />
      )}

      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b bg-gray-100">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`p-2 ${enableSorting ? "cursor-pointer" : ""}`}
                  onClick={
                    enableSorting
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : (header.column.columnDef.header as string)}
                  {enableSorting &&
                    (header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : header.column.getIsSorted() === "desc"
                      ? " 🔽"
                      : " ⬍")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center p-4">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
