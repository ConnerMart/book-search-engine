const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Book {
    bookId: String!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(userId: ID!, book: String!): User
    removeBook(book: String!): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
