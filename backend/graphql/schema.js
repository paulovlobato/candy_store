const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    name: String!
    candy: String
    eaten: Int
    date: String
  }

  type PaginatedUsers {
    users: [User]!
    totalCount: Int!
  }

  type Query {
    users(
      page: Int
      pageSize: Int
      sortBy: String
      sortOrder: String
      filterPerson: String
      filterCandy: String
    ): PaginatedUsers!
  }
`;

module.exports = typeDefs;