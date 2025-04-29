import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar DateTime

  type User @key(fields: "matricule") {
    matricule: String!
    name: String!
    email: String!
    cin: String!
    role: String!
    advisedBy: User
    advisees: [User!]
  }

  type Query {
    users: [User!]!
    user(matricule: String!): User
  }

  input CreateUserInput {
    matricule: String!
    name: String!
    email: String!
    cin: String!
    role: String!
    advisedById: String
  }

  input UpdateUserInput {
    name: String
    email: String
    cin: String
    role: String
    advisedById: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(matricule: String!, input: UpdateUserInput!): User!
    registerUser(input: CreateUserInput!): User!
  }
`;