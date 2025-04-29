export interface CreateNotificationInput {
  recipientId: string;
  message: string;
}

export interface NotificationAttributes {
  id?: number;
  recipientId: string;
  message: string;
  sentAt?: Date;
}