import { Document, Model, Types } from 'mongoose';
import { IUser } from '../auth/auth.interface';

export enum Location {
  Dhaka = 'Dhaka',
  Chattogram = 'Chattogram',
  Barishal = 'Barishal',
  Rajshahi = 'Rajshahi',
  Sylhet = 'Sylhet',
  Comilla = 'Comilla',
  Rangpur = 'Rangpur',
  Mymensingh = 'Mymensingh',
}

export enum Breed {
  Brahman = 'Brahman',
  Nellore = 'Nellore',
  Sahiwal = 'Sahiwal',
  Gir = 'Gir',
  Indigenous = 'Indigenous',
  Tharparkar = 'Tharparkar',
  Kankrej = 'Kankrej',
}
type BreedKey = keyof typeof Breed;

export const Label = {
  ForSale: 'for sale',
  SoldOut: 'sold out',
} as const;

type Label = (typeof Label)[keyof typeof Label];

export enum Category {
  Dairy = 'Dairy',
  Beef = 'Beef',
  DualPurpose = 'Dual Purpose',
}

export interface ICow extends Document {
  name: string;
  age: number;
  price: number;
  location: Location;
  breed: Breed;
  weight: number;
  label: Label;
  category: Category;
  seller: Types.ObjectId | IUser;
}

export type ICowFilters = {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: Location;
  breed?: (typeof Breed)[BreedKey][];
}; 

//Testing Interface
export type ICowFiltersTest = {
  price?: string;
  location?: Location;
  breed?: Breed;
  searchText?: string;
  page?: string;
  limit?: string;
};

export type CowModel = Model<ICow, Record<string, unknown>>;
