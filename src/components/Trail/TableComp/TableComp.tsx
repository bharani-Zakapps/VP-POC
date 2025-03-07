import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";

type IDlist = {
  userId: number;
  id?: number;
  title: string;
};

const TableComp = () => {
  const queryClient = useQueryClient();
  const [sorting, setSorting] = useState<SortingState>([]);
  const qData: IDlist[] | undefined = queryClient.getQueryData(["albumData"]);
  const isFetching = useIsFetching({ queryKey: ["albumData"] });

  const columns: ColumnDef<IDlist>[] = [
    {
      accessorKey: "id",
      header: "Id",
      enableSorting: true,
    },
    {
      accessorKey: "userId",
      header: "User Id",
      enableSorting: false,
    },
    {
      accessorKey: "title",
      header: "Title",
      enableSorting: false,
    },
  ];

  const table = useReactTable({
    data: qData || [],
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  if (isFetching) {
    return (
      <>
        <p>Loading....</p>
      </>
    );
  }

  return (
    <div className="overflow-y-scroll max-h-[300px]">
      <table className="table-auto w-full border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr key={"headertr" + index} className="bg-gray-100">
              {headerGroup.headers.map((header, index2) => (
                <th
                  key={"headertd" + index2}
                  className="p-2 border text-left"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getCanSort() ? <ArrowUpDown /> : ""}
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
    </div>
  );
};

export default TableComp;
