import InsuranceCompany from '../models/InsuranceCompany';
import BeneficiaryRegistration from '../models/BeneficiaryRegistration';
import { CreateInsuranceCompanyInput, RegisterBeneficiaryInput } from '../types/insurance';
import axios from 'axios';

export class InsuranceService {
  static async createInsuranceCompany(input: CreateInsuranceCompanyInput) {
    return InsuranceCompany.create(input);
  }

  static async getAllCompanies() {
    return InsuranceCompany.findAll();
  }

  static async getCompanyById(id: number) {
    return InsuranceCompany.findByPk(id);
  }


  static async registerBeneficiary(insurance: RegisterBeneficiaryInput) {
    console.log('Registering beneficiary...');
    try {
      // Fetch the beneficiary user from User Service
      console.log('Fetching user from User Service...');
      const userResponse = await axios.post('http://localhost:3001/graphql', {
        query: `
          query ($matricule: String!) {
            user(matricule: $matricule) {
              matricule
              name
              email
            }
          }
        `,
        variables: { matricule: insurance.beneficiaryId },
      });

      const user = userResponse.data.data.user;
      console.log('User:', user);

      if (!user) {
        throw new Error(`User with matricule ${insurance.beneficiaryId} not found`);
      }

      // Check if name needs updating
      const oldName = user.name;
      const newName = insurance.nomNouveauBeneficiaire;
      let updatedUser = user;

      if (oldName !== newName) {
        console.log('Updating user name...');
        // Update user name via User Service
        const updateResponse = await axios.post('http://localhost:3001/graphql', {
          query: `
            mutation ($matricule: String!, $input: UpdateUserInput!) {
              updateUser(matricule: $matricule, input: $input) {
                matricule
                name
                email
              }
            }
          `,
          variables: {
            matricule: insurance.beneficiaryId,
            input: { name: newName },
          },
        });
        // console.log('Before updating user...');
        updatedUser = updateResponse.data.data.updateUser;
        // console.log('After updating user:', updatedUser);


        // Fetch insurance company details
        const company = await InsuranceCompany.findByPk(insurance.companyId);

        if (!company) {
          throw new Error(`Insurance company with ID ${insurance.companyId} not found`);
        }

        // Send notification to insurance company
        await axios.post('http://localhost:3003/graphql', {
          query: `
            mutation ($notification: SendNotificationInput!) {
              sendNotification(input: $notification) {
                id
              }
            }
          `,
          variables: {
            notification: {
              recipientId: `COMPANY_${insurance.companyId}`, // Use a distinct identifier
              message: `Beneficiary updated. Matricule: ${insurance.beneficiaryId}, Old name: ${oldName}, New name: ${newName}`,
            },
          },
        });
      }

      // Create beneficiary registration
      return BeneficiaryRegistration.create(insurance);
    } catch (error: any) {
      console.error('Error registering beneficiary:', error);
      throw new Error('Error registering beneficiary: ' + error.message);
    }
  }

  static async getCompanyWithRegistrations(id: number) {
    return InsuranceCompany.findByPk(id, {
      include: [
        {
          model: BeneficiaryRegistration,
          as: 'beneficiaryRegistrations',
        },
      ],
    });
  }

  static async getCompanyRegistrations(companyId: number) {
    return BeneficiaryRegistration.findAll({
      where: {
        companyId,
      },
    });
  }
}