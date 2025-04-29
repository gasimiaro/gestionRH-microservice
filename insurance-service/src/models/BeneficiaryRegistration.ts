import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { BeneficiaryRegistrationAttributes } from '../types/insurance';
import InsuranceCompany from './InsuranceCompany';

// Define BeneficiaryRegistration model
class BeneficiaryRegistration extends Model<BeneficiaryRegistrationAttributes, Optional<BeneficiaryRegistrationAttributes, 'id' | 'createdAt' | 'updatedAt'>> implements BeneficiaryRegistrationAttributes {
  public id!: number;
  public companyId!: number;
  public requesterId!: string;
  public beneficiaryId!: string;
  public nomBeneficiaire!: string;
  public nomNouveauBeneficiaire!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  // Static methods for associations
  public static associate() {
    BeneficiaryRegistration.belongsTo(InsuranceCompany, {
      foreignKey: 'companyId',
      as: 'company',
    });
  }
}

BeneficiaryRegistration.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'insurance_companies',
        key: 'id',
      },
    },
    requesterId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    beneficiaryId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomBeneficiaire: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomNouveauBeneficiaire: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'beneficiary_registrations',
    timestamps: true,
  }
);

export default BeneficiaryRegistration;