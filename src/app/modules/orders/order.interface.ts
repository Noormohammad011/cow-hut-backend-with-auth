import { IUser } from './../auth/auth.interface';
import { Document, Model, Types } from 'mongoose';
import { ICow } from '../cow/cow.interface';


export interface IOrder extends Document { 
    cow: Types.ObjectId | ICow;
    buyer: Types.ObjectId | IUser;
}
export interface Payload {
  _id: string;
  role: string;
  orderId?: string;
}
export type reqUser = Payload | null;

export type OrderModel = Model<IOrder, Record<string, unknown>>;