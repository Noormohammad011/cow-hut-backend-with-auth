import { Document, Model } from 'mongoose';
export type UserName = {
  firstName: string;
  lastName: string;
};

export enum UserRole {
  SELLER = 'seller',
  BUYER = 'buyer',
  ADMIN = 'admin',
}

export interface IUser extends Document {
  phoneNumber: string;
  role: UserRole;
  password: string;
  name: UserName;
  address: string;
  budget: number;
  income: number;
}

export type IUsersFilters = {
  searchTerm?: string;
  role?: UserRole;
  budget?: number;
  income?: number;
};


export type ILoginUser = {
  phoneNumber: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};



export type UserModel = {
  isUserExist: (
    phoneNumber: string
  ) => Promise<
    Pick<
      IUser,
      'phoneNumber' | 'role' | 'name' | 'address' | 'password' | '_id'
    >
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser, Record<string, unknown>>;
