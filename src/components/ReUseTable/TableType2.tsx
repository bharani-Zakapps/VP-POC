import { useState } from "react";
import DataTable from "../ui/TanstackTable";
import { ColumnDef } from "@tanstack/react-table";
import { Input } from "../ui/input";

// Define the Product type
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
};

// Sample product data
const productData: Product[] = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1000, stock: 50 },
  { id: 2, name: "Phone", category: "Electronics", price: 500, stock: 100 },
  { id: 3, name: "Shoes", category: "Fashion", price: 100, stock: 200 },
];

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>(productData);

  const [editing, setEditing] = useState<{ [key: number]: string }>({}); // Track local edits

  // Handle local input changes (without updating parent state)
  const handleLocalChange = (id: number, value: string) => {
    setEditing((prev) => ({ ...prev, [id]: value }));
  };

  // Commit changes to parent state when user blurs (loses focus)
  const handleBlur = (id: number) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, price: Number(editing[id]) || 0 } : item
      )
    );
    setEditing((prev) => {
      const newEditing = { ...prev };
      delete newEditing[id]; // Remove from local state after updating
      return newEditing;
    });
  };

  // Define columns
  const productColumns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Product Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "price",
      header: "Price ($)",
      cell: ({ row }) => (
        <Input
          type="number"
          value={editing[row.original.id] ?? row.original.price} // Use local value if editing
          onChange={(e) => handleLocalChange(row.original.id, e.target.value)}
          onBlur={() => handleBlur(row.original.id)} // Commit on blur
          className="w-24 p-1 border rounded"
          autoFocus={editing[row.original.id] !== undefined} // Auto-focus only on active edit
        />
      ),
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
  ];

  return (
    <DataTable
      data={products}
      columns={productColumns}
      enableSorting
      enableFiltering
    //   meta={{ priceChange }}
    />
  );
};

export default ProductTable;
