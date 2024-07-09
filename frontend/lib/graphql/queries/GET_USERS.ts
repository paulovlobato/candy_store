const GET_USERS = `
    query users($page: Int, $pageSize: Int, $sortBy: String, $sortOrder: String, $filterPerson: String, $filterCandy: String) {
        users(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortOrder: $sortOrder, filterPerson: $filterPerson, filterCandy: $filterCandy) {
            users {
            name
            candy
            eaten
            date
            }
            totalCount
        }
    }
`;

export interface User {
  name: string;
  candy: string;
  eaten: number;
  date: string;
}

export interface UserResponse {
  users: {
    users: User[];
    totalCount: number;
  };
}

export default GET_USERS;
