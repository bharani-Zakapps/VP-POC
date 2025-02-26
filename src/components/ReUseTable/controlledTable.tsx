import { useState } from "react";
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from "@tanstack/react-table";
import { Input } from "@/components/ui/input"; // ShadCN Input

// Define Product Type
type Product = {
  id: number;
  name: string;
  price: number;
};

// Sample Data
const initialData: Product[] = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 },
];

// **Parent Component**
export default function ParentComponent() {
  const [data, setData] = useState<Product[]>(initialData);

  const updatePrice = (id: number, newPrice: number) => {
    // console.log(newPrice,"dasdsadasdsa")
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, price: newPrice } : item))
    );
  };

  return <ChildTable data={data} updatePrice={updatePrice} />;
}

// **Child Table Component**
function ChildTable({ data, updatePrice }: { data: Product[]; updatePrice: (id: number, newPrice: number) => void }) {
  const columns: ColumnDef<Product>[] = [
    { accessorKey: "name", header: "Product" },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <EditableCell row={row.original} updatePrice={updatePrice} />,
    },
  ];

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <table className="border">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="border p-2">{header.column.columnDef.header as string}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border p-2">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// **Editable Input Cell**
function EditableCell({ row, updatePrice }: { row: Product; updatePrice: (id: number, newPrice: number) => void }) {
  const [localValue, setLocalValue] = useState(row.price);

  return (
    <Input
      type="number"
      value={localValue} // Local state for smooth editing
      onChange={(e) => setLocalValue(Number(e.target.value))}
      onBlur={() => updatePrice(row.id, localValue)} // Update parent state on blur only
      className="w-24 p-1 border rounded"
    />
  );
}
