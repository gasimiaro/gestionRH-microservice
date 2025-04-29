import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { UserAttributes } from '../types/user';

// Define User model
class User extends Model<UserAttributes, Optional<UserAttributes, 'createdAt' | 'updatedAt'>> implements UserAttributes {
  public matricule!: string;
  public name!: string;
  public email!: string;
  public cin!: string;
  public role!: string;
  public advisedById!: string | null;
  public createdAt!: Date;
  public updatedAt!: Date;

  // Static methods for associations
  public static associate() {
    User.belongsTo(User, {
      foreignKey: 'advisedById',
      as: 'advisedBy',
    });
    User.hasMany(User, {
      foreignKey: 'advisedById',
      as: 'advisees',
    });
  }
}

User.init(
  {
    matricule: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    cin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    advisedById: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);

// Setup self-referential relationship
User.associate();

export default User;