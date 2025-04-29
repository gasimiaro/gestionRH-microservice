import { NotificationController } from '../controllers/notification.controller';
import { GraphQLDateTime } from 'graphql-scalars';

export const resolvers = {
  DateTime: GraphQLDateTime,

  User: {
    notifications: async (user: { matricule: string }) => {
      return NotificationController.getNotificationsByMatriculeController(user.matricule);
    },
  },

  Query: {
    notifications: async () => NotificationController.getNotificationsController(),
    notificationsByUser: async (_: any, { matricule }: { matricule: string }) => 
      NotificationController.getNotificationsByMatriculeController(matricule),
  },

  Mutation: {
    sendNotification: async (_: any, { input }: { input: any }) => 
      NotificationController.sendNotificationController(input),
  },
};