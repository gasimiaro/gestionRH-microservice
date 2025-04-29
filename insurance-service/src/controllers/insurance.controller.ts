import { InsuranceService } from '../services/insurance.service';
import { CreateInsuranceCompanyInput, RegisterBeneficiaryInput } from '../types/insurance';

export class InsuranceController {
  static async createInsuranceCompanyController(input: CreateInsuranceCompanyInput) {
    try {
      return await InsuranceService.createInsuranceCompany(input);
    } catch (error: any) {
      throw new Error(`Error creating insurance company: ${error.message}`);
    }
  }

  static async getAllCompaniesController() {
    try {
      return await InsuranceService.getAllCompanies();
    } catch (error: any) {
      throw new Error(`Error fetching insurance companies: ${error.message}`);
    }
  }

  static async getCompanyByIdController(id: number) {
    try {
      const company = await InsuranceService.getCompanyById(id);
      if (!company) {
        throw new Error(`Insurance company with ID ${id} not found`);
      }
      return company;
    } catch (error: any) {
      throw new Error(`Error fetching insurance company: ${error.message}`);
    }
  }

  static async registerBeneficiaryController(input: RegisterBeneficiaryInput) {
    try {
      return await InsuranceService.registerBeneficiary(input);
    } catch (error: any) {
      throw new Error(`Error registering beneficiary: ${error.message}`);
    }
  }

  static async getCompanyWithRegistrationsController(id: number) {
    try {
      const companyWithRegistrations = await InsuranceService.getCompanyWithRegistrations(id);
      if (!companyWithRegistrations) {
        throw new Error(`Insurance company with ID ${id} not found`);
      }
      return companyWithRegistrations;
    } catch (error: any) {
      throw new Error(`Error fetching company with registrations: ${error.message}`);
    }
  }

  static async getCompanyRegistrationsController(companyId: number) {
    try {
      return await InsuranceService.getCompanyRegistrations(companyId);
    } catch (error: any) {
      throw new Error(`Error fetching company registrations: ${error.message}`);
    }
  }
}