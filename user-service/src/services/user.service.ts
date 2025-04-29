import User from '../models/User';
import { CreateUserInput, UpdateUserInput } from '../types/user';
import axios from 'axios';

export class UserService {
  static async getAllUsers() {
    return User.findAll();
  }

  static async getUserByMatricule(matricule: string) {
    return User.findByPk(matricule);
  }

  static async createUser(input: CreateUserInput) {
    return User.create(input);
  }

  static async updateUserService(matricule: string, input: UpdateUserInput) {
    const user = await User.findByPk(matricule);
    if (!user) {
      throw new Error(`User with matricule ${matricule} not found`);
    }
    const last_name = user.name;
    // Check if name is being updated to trigger notification
    const nameChanged = input.name && input.name !== user.name;
    const updatedUser = await user.update(input);

    // Send notification if name changed
    if (nameChanged) {
      try {
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
              recipientId: matricule,
              message: `Your name has been updated from "${last_name}" to "${input.name}"`,
            },
          },
        });
        console.log('Name change notification sent successfully');
      } catch (error) {
        console.error('Failed to send name change notification:', error);
      }
    }

    return updatedUser;
  }

  static async getUserWithRelations(matricule: string) {
    return User.findByPk(matricule, {
      include: [
        {
          model: User,
          as: 'advisedBy',
        },
        {
          model: User,
          as: 'advisees',
        },
      ],
    });
  }

  static async getAdvisees(matricule: string) {
    return User.findAll({
      where: {
        advisedById: matricule,
      },
    });
  }
}