import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, UserModel, UserRole } from './auth.interface';

const NameSchema = new Schema<IUser['name']>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
  },
  { _id: false }
);

const userSchema = new Schema<IUser, UserModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: NameSchema,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
    },
    income: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
  },
});

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.statics.isUserExist = async function (phoneNumber: string) {
  return await this.findOne({ phoneNumber }).select(
    'phoneNumber role name address'
  );
};

export const User = model<IUser, UserModel>('User', userSchema);
