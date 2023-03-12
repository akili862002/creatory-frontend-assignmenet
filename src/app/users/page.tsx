import { UserListArgs } from "@/pages/api/view";
import api from "@/services/sdk";

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

  return (
    <main className="mt-11">
      <h1>List Users</h1>
      <div className="mt-5 space-y-3">
        {users.map((user) => (
          <div className="p-3 border border-gray-400 rounded-lg" key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
