import { NotificationService } from '../services/notification.service';
import { CreateNotificationInput } from '../types/notification';

export class NotificationController {
  static async createNotificationController(input: CreateNotificationInput) {
    try {
      return await NotificationService.createNotification(input);
    } catch (error: any) {
      throw new Error(`Error creating notification: ${error.message}`);
    }
  }

  static async getNotificationsController() {
    try {
      return await NotificationService.getNotifications();
    } catch (error: any) {
      throw new Error(`Error fetching notifications: ${error.message}`);
    }
  }

  static async sendNotificationController(input: CreateNotificationInput) {
    try {
      return await NotificationService.sendNotification(input);
    } catch (error: any) {
      throw new Error(`Error sending notification: ${error.message}`);
    }
  }

  static async getNotificationsByMatriculeController(matricule: string) {
    try {
      return await NotificationService.getNotificationsByMatricule(matricule);
    } catch (error: any) {
      throw new Error(`Error fetching notifications for user: ${error.message}`);
    }
  }
}