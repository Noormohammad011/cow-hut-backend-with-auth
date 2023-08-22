import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../auth/auth.interface';
import { ProfileService } from './profile.service';

const getProfileInformation = catchAsync(
  async (req: Request, res: Response) => {
    const { _id } = req.user as { _id: string };
    const result = await ProfileService.getProfileInformation({ _id });
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile information fetched successfully!',
      data: result,
    });
  }
);

const updateProfileInformation = catchAsync(async (req: Request, res: Response) => {
    const { _id } = req.user as { _id: string };
    const result = await ProfileService.updateProfileInformation(_id, req.body);
    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile information updated successfully!',
        data: result,
    });
 })

export const ProfileController = {
  getProfileInformation,
  updateProfileInformation,
};
