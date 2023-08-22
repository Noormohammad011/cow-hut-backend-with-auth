import { Document, Model } from 'mongoose';

export type AdminName = {
  firstName: string;
  lastName: string;
};
export enum UserRole {
  ADMIN = 'admin',
}

export interface IAdmin extends Document {
  phoneNumber: string;
  role: UserRole;
  password: string;
  name: AdminName;
  address: string;
}
export type ILoginAdmin = {
  phoneNumber: string;
  password: string;
};

export type ILoginAdminResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};


export type AdminModel = {
  isAdminExist: (
    phoneNumber: string
  ) => Promise<
    Pick<IAdmin, 'phoneNumber' | 'role' | 'name' | 'address' | 'password' | '_id'>
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin, Record<string, unknown>>;
