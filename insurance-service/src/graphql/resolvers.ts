import { InsuranceController } from '../controllers/insurance.controller';
import { GraphQLDateTime } from 'graphql-scalars';

export const resolvers = {
  DateTime: GraphQLDateTime,

  InsuranceCompany: {
    __resolveReference: async (reference: { id: string }) => {
      return InsuranceController.getCompanyByIdController(parseInt(reference.id));
    },
    beneficiaryRegistrations: async (parent: any) => {
      return InsuranceController.getCompanyRegistrationsController(parent.id);
    },
  },

  BeneficiaryRegistration: {
    company: async (parent: any) => {
      return InsuranceController.getCompanyByIdController(parent.companyId);
    },
  },

  Query: {
    insuranceCompanies: async () => InsuranceController.getAllCompaniesController(),
    insuranceCompany: async (_: any, { id }: { id: string }) => 
      InsuranceController.getCompanyWithRegistrationsController(parseInt(id)),
    beneficiaryRegistrations: async (_: any, { companyId }: { companyId: string }) => 
      InsuranceController.getCompanyRegistrationsController(parseInt(companyId)),
  },

  Mutation: {
    createInsuranceCompany: async (_: any, { input }: { input: any }) => 
      InsuranceController.createInsuranceCompanyController(input),
    registerBeneficiary: async (_: any, { input }: { input: any }) => {
      // Convert companyId to number if it's a string
      const updatedInput = {
        ...input,
        companyId: typeof input.companyId === 'string' ? parseInt(input.companyId) : input.companyId,
      };
      return InsuranceController.registerBeneficiaryController(updatedInput);
    },
  },
};