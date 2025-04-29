import { UserController } from '../controllers/user.controller';
import { GraphQLDateTime } from 'graphql-scalars';
import axios from 'axios';

export const resolvers = {
  DateTime: GraphQLDateTime,

  User: {
    __resolveReference: async (reference: { matricule: string }) => {
      return UserController.getUserByMatriculeController(reference.matricule);
    },
    advisedBy: async (parent: any) => {
      return parent.advisedById
        ? UserController.getUserByMatriculeController(parent.advisedById)
        : null;
    },
    advisees: async (parent: any) => {
      return UserController.getAdviseesController(parent.matricule);
    },
  },

  Query: {
    users: async () => UserController.getAllUsersController(),
    user: async (_: any, { matricule }: { matricule: string }) => 
      UserController.getUserWithRelationsController(matricule),
  },

  Mutation: {
    createUser: async (_: any, { input }: { input: any }) => 
      UserController.createUserController(input),
    updateUser: async (_: any, { matricule, input }: { matricule: string, input: any }) =>
      UserController.updateUserController(matricule, input),
    registerUser: async (_: any, { input }: { input: any }) => {
      try {
        // Step 1: Create user
        const user = await UserController.createUserController(input);
        
        // Step 2: Update user to trigger notifications
        const updateInput = { name: input.name }; // Simulating an update with the same name
        const updatedUser = await UserController.updateUserController(input.matricule, updateInput);
        
        // Step 3: Send welcome notification via Notification Service
        await axios.post('http://localhost:3003/graphql', {
          query: `
            mutation ($notification: SendNotificationInput!) {
              sendNotification(input: $notification) {
                id
                message
                recipientId
                sentAt
              }
            }
          `,
          variables: {
            notification: {
              recipientId: input.matricule,
              message: `Welcome, ${input.name}! Your account has been registered.`,
            },
          },
        });
        
        // Step 4: Try to send notification to the first insurance company if available
        try {
          const insuranceResponse = await axios.post('http://localhost:3002/graphql', {
            query: `
              query {
                insuranceCompanies {
                  id
                  companyName
                  companyEmail
                }
              }
            `,
          });
          
          const companies = insuranceResponse.data.data.insuranceCompanies;
          if (companies && companies.length > 0) {
            // Send notification to first insurance company
            await axios.post('http://localhost:3003/graphql', {
              query: `
                mutation ($notification: SendNotificationInput!) {
                  sendNotification(input: $notification) {
                    id
                    message
                    recipientId
                    sentAt
                  }
                }
              `,
              variables: {
                notification: {
                  recipientId: `COMPANY_${companies[0].id}`,
                  message: `New user ${input.name} has been registered.`,
                },
              },
            });
          }
        } catch (error) {
          console.error('Error notifying insurance company:', error);
          // Continue without failing if insurance service is unavailable
        }
        
        return updatedUser;
      } catch (error: any) {
        throw new Error(`Error registering user: ${error.message}`);
      }
    },
  },
};