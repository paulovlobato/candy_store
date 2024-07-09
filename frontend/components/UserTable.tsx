import { makeQuery } from "@/lib/graphql/makeQuery";
import GET_USERS, { User, UserResponse } from "@/lib/graphql/queries/GET_USERS";

async function getUsers(
  page = 1,
  pageSize = 10,
  sortBy = "name",
  sortOrder = "asc",
  filterPerson = "",
  filterCandy = ""
): Promise<{ users: User[]; totalCount: number }> {
  const variables = {
    page,
    pageSize,
    sortBy,
    sortOrder,
    filterPerson,
    filterCandy,
  };

  const { data, errors } = (await makeQuery(GET_USERS, variables)) as {
    data: UserResponse;
    errors: any;
  };

  if (errors) {
    console.error(errors);
    throw new Error("Failed to fetch users");
  }

  return {
    users: data.users.users,
    totalCount: data.users.totalCount,
  };
}

export default async function UserTable({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.pageSize) || 10;
  const sortBy = (searchParams.sortBy as string) || "name";
  const sortOrder = (searchParams.sortOrder as string) || "asc";
  const filterPerson = (searchParams.filterPerson as string) || "";
  const filterCandy = (searchParams.filterCandy as string) || "";

  let users: User[];
  let totalCount: number;

  try {
    const result = await getUsers(
      page,
      pageSize,
      sortBy,
      sortOrder,
      filterPerson,
      filterCandy
    );

    users = result.users;
    totalCount = result.totalCount;
  } catch (error) {
    console.error("Error fetching users: ", error);
    return <p>Error fetching users</p>;
  }

  const createSortLink = (field: string) => {
    const _sortOrder = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    const params = new URLSearchParams(searchParams as Record<string, string>);

    params.set("sortBy", field);
    params.set("sortOrder", _sortOrder);

    return `?${params.toString()}`;
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className="px-6 py-4 bg-white">
              <form action="" method="get" className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="filterPerson"
                    placeholder="Filter by person"
                    defaultValue={filterPerson}
                    className="border rounded px-2 py-1 text-gray-800"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="filterCandy"
                    placeholder="Filter by candy"
                    defaultValue={filterCandy}
                    className="border rounded px-2 py-1 text-gray-800"
                  />
                </div>
                <input type="hidden" name="sortBy" value={sortBy} />
                <input type="hidden" name="sortOrder" value={sortOrder} />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                  Apply Filters
                </button>
              </form>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <a href={createSortLink("name")}>Name</a>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <a href={createSortLink("candy")}>Candy</a>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <a href={createSortLink("eaten")}>Eaten</a>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <a href={createSortLink("date")}>Date</a>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user: User, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.candy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.eaten}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p className="text-gray-800">Total users: {totalCount}</p>
    </div>
  );
}
