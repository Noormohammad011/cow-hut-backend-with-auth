import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

export const OrderSchema = new Schema<IOrder, OrderModel>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: 'Cow',
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Order = model<IOrder, OrderModel>('Order', OrderSchema);