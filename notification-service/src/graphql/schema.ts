import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar DateTime

  # Extend the User type from the User service
  extend type User @key(fields: "matricule") {
    matricule: String! @external
    notifications: [Notification!]
  }

  type Notification {
    id: ID!
    recipientId: String!
    message: String!
    sentAt: DateTime!
  }

  type Query {
    notifications: [Notification!]!
    notificationsByUser(matricule: String!): [Notification!]!
  }

  input SendNotificationInput {
    recipientId: String!
    message: String!
  }

  type Mutation {
    sendNotification(input: SendNotificationInput!): Notification!
  }
`;