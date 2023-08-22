import { Schema, model } from 'mongoose';
import {
  Breed,
  Category,
  CowModel,
  ICow,
  Label,
  Location,
} from './cow.interface';

export const CowSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      enum: Object.values(Location),
      required: true,
    },
    breed: {
      type: String,
      enum: Object.values(Breed),
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      enum: Object.values(Label),
      default: Label.ForSale,
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(Category),
      required: true,
    },
    seller: {
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

export const Cow = model<ICow, CowModel>('Cow', CowSchema);
