import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../auth/auth.interface';
import { User } from '../auth/auth.model';

const getAllUsers = async (): Promise<IUser[] | null> => {
  const result = await User.find();
  return result;
};

const getUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }
  const { name, role, ...userData } = payload;

  const updateUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      (updateUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (role) {
    updateUserData.role = role;
  }

  const result = await User.findOneAndUpdate({ _id: id }, updateUserData, {
    new: true,
    validateBeforeSave: true,
  });
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete({
    _id: id,
  });
  return result;
};

export const usersService = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
