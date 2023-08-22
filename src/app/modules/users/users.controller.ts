import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../auth/auth.interface';
import { usersService } from './users.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await usersService.getAllUsers();
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Users Successfully!',
    data: result,
  });
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await usersService.getUser(req.params.id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get User Successfully!',
    data: user,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = await usersService.updateUser(req.params.id, req.body);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update User Successfully!',
    data: user,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const user = await usersService.deleteUser(req.params.id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete User Successfully!',
    data: user,
  });
});

export const UsersController = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
