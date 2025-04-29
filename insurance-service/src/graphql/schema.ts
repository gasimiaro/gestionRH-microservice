import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar DateTime

  type InsuranceCompany @key(fields: "id") {
    id: ID!
    companyName: String!
    companyEmail: String!
    beneficiaryRegistrations: [BeneficiaryRegistration!]
  }

  type BeneficiaryRegistration {
    id: ID!
    companyId: ID!
    requesterId: String!
    beneficiaryId: String!
    nomBeneficiaire: String!
    nomNouveauBeneficiaire: String!
    createdAt: DateTime!
    company: InsuranceCompany
  }

  type Query {
    insuranceCompanies: [InsuranceCompany!]!
    insuranceCompany(id: ID!): InsuranceCompany
    beneficiaryRegistrations(companyId: ID!): [BeneficiaryRegistration!]!
  }

  input CreateInsuranceCompanyInput {
    companyName: String!
    companyEmail: String!
  }

  input RegisterBeneficiaryInput {
    companyId: ID!
    requesterId: String!
    beneficiaryId: String!
    nomBeneficiaire: String!
    nomNouveauBeneficiaire: String!
  }

  type Mutation {
    createInsuranceCompany(input: CreateInsuranceCompanyInput!): InsuranceCompany!
    registerBeneficiary(input: RegisterBeneficiaryInput!): BeneficiaryRegistration!
  }
`;