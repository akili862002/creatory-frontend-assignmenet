import { UserListArgs } from "@/pages/api/view";
import api from "@/services/sdk";
import UserTable from "./UserTable";

const fetchUsers = async (args: UserListArgs) => {
  const data = await api.getUserList(args);

  return data;
};

export default async function ListUsersView({
  searchParams,
}: {
  searchParams: Partial<UserListArgs>;
}) {
  const limit = Number(searchParams.limit) || 10;
  const offset = Number(searchParams.offset) || 0;

  const data = await fetchUsers({
    limit,
    offset,
  });

  return (
    <main className="mt-11">
      <h1>List Users</h1>
      <div className="mt-5 space-y-3">
        <UserTable data={data} limit={limit} offset={offset} />
      </div>
    </main>
  );
}
