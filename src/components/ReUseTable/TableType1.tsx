// import React from "react";
import DataTable from "../ui/TanstackTable";
import { ColumnDef } from "@tanstack/react-table";

// Define data type
type User = {
  id: number;
  name: string;
  email: string;
};

// Sample data
const userData: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
];

// Define columns
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];

const UserTable1 = () => {
  return <DataTable data={userData} columns={columns} />;
};

export default UserTable1;
