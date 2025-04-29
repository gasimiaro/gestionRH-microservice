export interface CreateInsuranceCompanyInput {
  companyName: string;
  companyEmail: string;
}

export interface InsuranceCompanyAttributes {
  id?: number;
  companyName: string;
  companyEmail: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RegisterBeneficiaryInput {
  companyId: number;
  requesterId: string;
  beneficiaryId: string;
  nomBeneficiaire: string;
  nomNouveauBeneficiaire: string;
}

export interface BeneficiaryRegistrationAttributes {
  id?: number;
  companyId: number;
  requesterId: string;
  beneficiaryId: string;
  nomBeneficiaire: string;
  nomNouveauBeneficiaire: string;
  createdAt?: Date;
  updatedAt?: Date;
}