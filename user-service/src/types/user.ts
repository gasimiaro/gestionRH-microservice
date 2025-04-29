export interface CreateUserInput {
  matricule: string;
  name: string;
  email: string;
  cin: string;
  role: string;
  advisedById?: string | null;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  cin?: string;
  role?: string;
  advisedById?: string | null;
}

export interface UserAttributes {
  matricule: string;
  name: string;
  email: string;
  cin: string;
  role: string;
  advisedById?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInstance extends UserAttributes {
  advisedBy?: UserInstance | null;
  advisees?: UserInstance[];
}