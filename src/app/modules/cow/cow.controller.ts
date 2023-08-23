import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { cowFilterableFields, cowFilterableFieldsTest } from './cow.constants';
import { ICow } from './cow.interface';
import { CowService } from './cow.service';

const getAllCowDocs = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  if (filters.breed && typeof filters.breed === 'string') {
    filters.breed = filters.breed.split(',');
  }
  const result = await CowService.getAllCowsDoc(filters, paginationOptions);
  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getAllCowDocsTest = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFieldsTest);
  if (filters.breed && typeof filters.breed === 'string') {
    filters.breed = filters.breed.split(',');
  }
  const result = await CowService.getAllCowsDocTest(filters);
  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const createCowDoc = catchAsync(async (req: Request, res: Response) => {
  const { ...cowData } = req.body;
  const result = await CowService.creatCowDoc(cowData);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Cow created successfully!',
    data: result,
  });
});

const getSingleCowDoc = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowService.getSingleCowDoc(id);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow fetched successfully!',
    data: result,
  });
});

const updateCowDoc = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id: sellerId } = req.user as { _id: string };
  const { ...cowData } = req.body;
  const result = await CowService.updateCowDoc(id, sellerId, cowData);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow updated successfully!',
    data: result,
  });
});

const deleteCowDoc = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id: sellerId } = req.user as { _id: string };
  const result = await CowService.deleteCowDoc(id, sellerId);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow deleted successfully!',
    data: result,
  });
});

export const CowController = {
  createCowDoc,
  getSingleCowDoc,
  updateCowDoc,
  deleteCowDoc,
  getAllCowDocs,
  getAllCowDocsTest,
};
