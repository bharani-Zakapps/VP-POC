import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import useProductList from "../../stores/useProductList";
import { Button } from "../ui/button";

type IlistProduct = {
  data: string;
  id: number;
};

const Tanstacktable = () => {
  const { products, deleteProduct } = useProductList();

  const deleteProd = (id: number) => {
    deleteProduct(id);
  };

  const columns: ColumnDef<IlistProduct>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "data",
      header: "Data",
      enableSorting: true,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button variant={"danger"} onClick={() => deleteProd(row.original.id)}>
          delete
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: products || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
    {products.length > 0 ?
      <table className="table-auto w-full border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr key={"headertr" + index} className="bg-gray-100">
              {headerGroup.headers.map((header, index2) => (
                <th key={"headertd" + index2} className="p-2 border text-left">
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
          {table.getRowModel().rows.map((row, index) => (
            <tr key={"tablebodytr" + index} className="border hover:bg-gray-50">
              {row.getVisibleCells().map((cell, index2) => (
                <td key={"tablebodytd" + index + index2} className="p-2 border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      :
      <p>No Records found</p>}
    </>
  );
};

export default Tanstacktable;
