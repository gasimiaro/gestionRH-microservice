import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { NotificationAttributes } from '../types/notification';

// Define Notification model
class Notification extends Model<NotificationAttributes, Optional<NotificationAttributes, 'id' | 'sentAt'>> implements NotificationAttributes {
  public id!: number;
  public recipientId!: string;
  public message!: string;
  public sentAt!: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    recipientId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sentAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'notifications',
    timestamps: false,
  }
);

export default Notification;