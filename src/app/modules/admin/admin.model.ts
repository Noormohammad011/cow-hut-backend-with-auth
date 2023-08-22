import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { AdminModel, AdminName, IAdmin, UserRole } from './admin.interface';

const NameSchema = new Schema<AdminName>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
  },
  { _id: false }
);


const adminSchema = new Schema<IAdmin, AdminModel>(
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

adminSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
  },
});

adminSchema.pre<IAdmin>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

adminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

adminSchema.statics.isAdminExist = async function (phoneNumber: string) {
  return await this.findOne({ phoneNumber }).select(
    'phoneNumber role name address'
  );
};

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);
