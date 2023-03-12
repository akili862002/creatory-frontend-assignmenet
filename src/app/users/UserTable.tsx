"use client";

import CopyableText from "@/components/CopyableText/CopyableText";
import { Table } from "@/components/Table/Table";
import { User } from "@/pages/api/view";
import { Column, useTable } from "react-table";

interface IUserTableProps {
  users: User[];
}

const UserTable: React.FC<IUserTableProps> = ({ users }) => {
  const columns: Column<User>[] = [
    {
      Header: "ID",
      accessor: (row) => (
        <CopyableText className="max-w-[120px]">{row.id}</CopyableText>
      ),
    },
    {
      Header: "Name",
      accessor: "name",
      minWidth: 200,
    },
    {
      Header: "Email",
      accessor: "email",
      minWidth: 200,
    },
    {
      Header: "Phone",
      accessor: "phone",
      minWidth: 200,
    },
  ];

  return <Table columns={columns} data={users} />;
};

export default UserTable;
