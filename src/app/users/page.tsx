import { Table } from "@/components/Table/Table";
import { User, UserListArgs } from "@/pages/api/view";
import api from "@/services/sdk";
import { useMemo } from "react";
import { Column, useTable } from "react-table";

const fetchUsers = async (args: UserListArgs) => {
  const data = await api.getUserList({
    limit: 10,
    offset: 0,
  });

  return data;
};

export default async function ListUsersView({
  searchParams,
}: {
  searchParams: Partial<UserListArgs>;
}) {
  const limit = Number(searchParams.limit) || 10;
  const offset = Number(searchParams.offset) || 0;

  const { data: users } = await fetchUsers({
    limit,
    offset,
  });

  const columns: Column<User>[] = [
    {
      Header: "ID",
      accessor: "id",
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

  return (
    <main className="mt-11">
      <h1>List Users</h1>
      <div className="mt-5 space-y-3">
        <Table columns={columns} data={users} />
      </div>
    </main>
  );
}
