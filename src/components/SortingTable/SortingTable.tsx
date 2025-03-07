import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// Sample Data
const data = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bob", age: 25 },
  { id: 3, name: "Charlie", age: 35 },
];

const columns: ColumnDef<{ id: number; name: string; age: number }>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true, // Sorting enabled
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true, // Sorting enabled
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "age",
    header: "Age",
    enableSorting: true, // ✅ Sorting enabled only for Age column
  },
];

const SortingTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // ✅ Required for sorting
    state: { sorting },
    onSortingChange: setSorting, // Updates sorting state
    // sortingMode: "multi", // Prevents removing sorting after two clicks,
    enableSortingRemoval: false,
  });

  return (
    <table className="table-auto w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="flex flex-row justify-evenly">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={
                  header.column.getCanSort() ? "cursor-pointer !flex" : ""
                }
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}{" "}
                {/* {header.column.getIsSorted() === "asc" ? "🔼" : header.column.getIsSorted() === "desc" ? "🔽" : ""}
                 */}
                {header.column.getCanSort() ? <ArrowUpDown /> : ""}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="flex flex-row justify-evenly p-2">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortingTable;
