import useDList from "@/stores/useDList";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type IDlist = {
  userId: number;
  id?: number;
  title: string;
  completed: boolean;
};

// const fetchDlist = async () => {
//   const { data } = await axios.get(
//     "https://jsonplaceholder.typicode.com/todos"
//   );
//   setData([...data]);
//   return data;
// };

const addDlist = async (newPost: IDlist) => {
  const { data } = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    newPost
  );
  return data;
};

const DList = () => {
  const { allData, setData } = useDList();
  const queryClient = useQueryClient();

  const fetchDlist = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    setData([...data]);
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["Dlist"],
    queryFn: fetchDlist,
    refetchOnWindowFocus: false
  });

  // useEffect(() => {
  //   if (data) {
  //     setData(data);
  //   }
  // }, [data]);

  const [rowSelection, setRowSelection] = useState<IDlist>({
    userId: 0,
    id: 0,
    title: "",
    completed: false,
  });
  const checkboxRef = useRef<any>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      const total = allData.length;
      const selectedCount = Object.values(rowSelection).filter(Boolean).length;
      checkboxRef.current.indeterminate =
        selectedCount > 0 && selectedCount === total;
    }
  }, [rowSelection]);

  const mutation = useMutation({
    mutationFn: addDlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Dlist"] });
    },
  });

  const updateData = (id: any) => {
    let updatedData: any = allData.map((item: IDlist) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );

    setData(updatedData);
  };

  const updateDataAll = (checked: boolean | string) => {
    let updatedData: any = allData.map((item: IDlist) => ({
      ...item,
      completed: checked,
    }));
    setData(updatedData);
  };

  const columns: ColumnDef<IDlist>[] = [
    {
      id: "select",
      header: ({  }) => (
        <Checkbox
          ref={checkboxRef}
          checked={allData.every((item) => item.completed)}
          onCheckedChange={(checked) => updateDataAll(checked)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.original.completed || false}
          onCheckedChange={() => updateData(row.original.id)}
        />
      ),
    },
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "userId",
      header: "User Id",
      enableSorting: true,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <Tooltip>
          <TooltipTrigger>{row.original.title}</TooltipTrigger>
          <TooltipContent>
            <p>{row.original.title}</p>
          </TooltipContent>
        </Tooltip>
      ),
    },
    {
      accessorKey: "completed",
      header: "Completed",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Accordion type="single" collapsible>
          <AccordionItem value={`row-${row.index}`}>
            <AccordionTrigger>Details</AccordionTrigger>
            <AccordionContent>
              <p>
                <strong>ID:</strong> {row.original.id}
              </p>
              <p>
                <strong>Name:</strong> {row.original.userId}
              </p>
              <p>
                <strong>Email:</strong> {row.original.title}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
    },
  ];

  const table = useReactTable({
    data: allData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Button
        variant={"success"}
        onClick={() =>
          mutation.mutate({
            title: "New Post",
            completed: true,
            userId: 3821837,
          })
        }
      >
        create new post
      </Button>
      <div className="overflow-y-scroll max-h-[300px]">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            {table.getHeaderGroups().map((headerGroup, index) => (
              <tr key={"headertr" + index} className="bg-gray-100">
                {headerGroup.headers.map((header, index2) => (
                  <th
                    key={"headertd" + index2}
                    className="p-2 border text-left"
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
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={"tablebodytr" + index}
                className="border hover:bg-gray-50"
              >
                {row.getVisibleCells().map((cell, index2) => (
                  <td
                    key={"tablebodytd" + index + index2}
                    className="p-2 border"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DList;
