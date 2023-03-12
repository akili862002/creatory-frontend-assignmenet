"use client";

import CopyableText from "@/components/CopyableText/CopyableText";
import PageSizeSelect from "@/components/PageSizeSelect/PageSizeSelect";
import { Pagination } from "@/components/Pagination/Pagination";
import { Table } from "@/components/Table/Table";
import { User, UserResponse } from "@/pages/api/view";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Column } from "react-table";

interface IUserTableProps {
  data: UserResponse;
  limit: number;
  offset: number;
}

const UserTable: React.FC<IUserTableProps> = ({ data, limit, offset }) => {
  const router = useRouter();

  const columns: Column<User>[] = useMemo(
    () => [
      {
        Header: "ID",
        accessor: (row) => (
          <CopyableText className="max-w-[120px]" buttonClassName="bg-gray-100">
            {row.id}
          </CopyableText>
        ),
      },
      {
        Header: "Name",
        accessor: (row) => <p className="font-bold text-black">{row.name}</p>,
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
    ],
    []
  );

  const handleChangePage = (newPage: number) => {
    router.push(`/users?offset=${newPage}&limit=${limit}`, {});
  };

  const handleChangePageSize = (newOffset: number) => {
    router.push(`/users?offset=${offset}&limit=${newOffset}`, {});
  };

  return (
    <div>
      <Table columns={columns} data={data.data} />
      <div className="flex flex-col items-center gap-3 mt-5 sm:justify-between sm:flex-row">
        <PageSizeSelect
          size={limit}
          options={[10, 20, 50, 100]}
          onChange={handleChangePageSize}
        />
        <Pagination
          selected={offset}
          totalCount={data.total}
          sizePerPage={limit}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default UserTable;
