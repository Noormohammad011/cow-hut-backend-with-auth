import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { cowSearchableFields } from './cow.constants';
import { ICow, ICowFilters } from './cow.interface';
import { Cow } from './cow.model';

const creatCowDoc = async (payload: ICow): Promise<ICow | null> => {
  const cow = await Cow.create(payload);
  return cow;
};

const getSingleCowDoc = async (id: string): Promise<ICow | null> => {
  const cow = await Cow.findById({ _id: id }).populate({
    path: 'seller',
  });
  return cow;
};

const updateCowDoc = async (
  id: string,
  sellerId: string,
  payload: ICow
): Promise<ICow | null> => {
  const isExist = await Cow.findOne({ _id: id, seller: sellerId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found !');
  }
  const { ...cowData } = payload;

  const updateCowData: Partial<ICow> = { ...cowData };

  const result = await Cow.findOneAndUpdate({ _id: id }, updateCowData, {
    new: true,
    validateBeforeSave: true,
  });
  return result;
};

const deleteCowDoc = async (
  id: string,
  sellerId: string
): Promise<ICow | null> => {
  const isExist = await Cow.findOne({ _id: id, seller: sellerId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found !');
  }
  return await Cow.findByIdAndDelete({ _id: id });
};

const getAllCowsDoc = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, minPrice, maxPrice, ...otherFilters } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (minPrice && maxPrice) {
    andConditions.push({
      price: {
        $gte: minPrice,
        $lte: maxPrice,
      },
    });
  } else if (minPrice) {
    andConditions.push({
      price: {
        $gte: minPrice,
      },
    });
  } else if (maxPrice) {
    andConditions.push({
      price: {
        $lte: maxPrice,
      },
    });
  }

  if (Object.keys(otherFilters).length) {
    andConditions.push({
      $and: Object.entries(otherFilters).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .populate({
      path: 'seller',
    })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const CowService = {
  creatCowDoc,
  getSingleCowDoc,
  updateCowDoc,
  deleteCowDoc,
  getAllCowsDoc,
};
