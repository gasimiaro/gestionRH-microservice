import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { InsuranceCompanyAttributes } from '../types/insurance';
import BeneficiaryRegistration from './BeneficiaryRegistration';

// Define InsuranceCompany model
class InsuranceCompany extends Model<InsuranceCompanyAttributes, Optional<InsuranceCompanyAttributes, 'id' | 'createdAt' | 'updatedAt'>> implements InsuranceCompanyAttributes {
  public id!: number;
  public companyName!: string;
  public companyEmail!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  // Static methods for associations
  public static associate() {
    InsuranceCompany.hasMany(BeneficiaryRegistration, {
      foreignKey: 'companyId',
      as: 'beneficiaryRegistrations',
    });
  }
}

InsuranceCompany.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    tableName: 'insurance_companies',
    timestamps: true,
  }
);

export default InsuranceCompany;