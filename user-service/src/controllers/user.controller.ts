import { UserService } from '../services/user.service';
import { CreateUserInput, UpdateUserInput } from '../types/user';

export class UserController {
  static async getAllUsersController() {
    try {
      return await UserService.getAllUsers();
    } catch (error: any) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  static async getUserByMatriculeController(matricule: string) {
    try {
      const user = await UserService.getUserByMatricule(matricule);
      if (!user) {
        throw new Error(`User with matricule ${matricule} not found`);
      }
      return user;
    } catch (error: any) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  static async createUserController(input: CreateUserInput) {
    try {
      return await UserService.createUser(input);
    } catch (error: any) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  static async updateUserController(matricule: string, input: UpdateUserInput) {
    try {
      return await UserService.updateUserService(matricule, input);
    } catch (error: any) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  static async getUserWithRelationsController(matricule: string) {
    try {
      const userWithRelations = await UserService.getUserWithRelations(matricule);
      if (!userWithRelations) {
        throw new Error(`User with matricule ${matricule} not found`);
      }
      return userWithRelations;
    } catch (error: any) {
      throw new Error(`Error fetching user with relations: ${error.message}`);
    }
  }

  static async getAdviseesController(matricule: string) {
    try {
      return await UserService.getAdvisees(matricule);
    } catch (error: any) {
      throw new Error(`Error fetching advisees: ${error.message}`);
    }
  }
}