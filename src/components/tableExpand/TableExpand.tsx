import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  ExpandedState,
  flexRender,
} from "@tanstack/react-table";

// Define column structure
const columns: ColumnDef<any>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row, getValue }) => (
      <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
        {row.getCanExpand() && (
          <button
            onClick={row.getToggleExpandedHandler()}
            style={{ cursor: "pointer", marginRight: "5px" }}
          >
            {row.getIsExpanded() ? "👇" : "👉"}
          </button>
        )}
        {getValue<string>()}
      </div>
    ),
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
];

// ✅ Raw JSON Data
const data = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Johnson",
    age: 30,
    subRows: [
      {
        id: 2,
        firstName: "Bob",
        lastName: "Brown",
        age: 25,
        subRows: [
          { id: 3, firstName: "Charlie", lastName: "Davis", age: 35 },
        ],
      },
    ],
  },
  {
    id: 4,
    firstName: "David",
    lastName: "Smith",
    age: 40,
    subRows: [
      { id: 5, firstName: "Emma", lastName: "Williams", age: 28 },
      { id: 6, firstName: "Frank", lastName: "Taylor", age: 33 },
    ],
  },
  {
    id: 9,
    firstName: "tests",
    lastName: "sample",
    age: 49,
  }
];

const TableExpand = () => {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: { expanded },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows, // Enables nested rows
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="p-4">
      <table className="border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* <pre className="mt-4">Expanded Rows: {JSON.stringify(expanded, null, 2)}</pre> */}
    </div>
  );
};

export default TableExpand;
