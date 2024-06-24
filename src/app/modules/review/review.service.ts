import { IPaginationOptions } from '../../interface';
import { TReview } from './review.interface';
import { Review } from './review.model';

const addReviewIntoDB = async (payload: TReview) => {
  const result = await Review.create(payload);
  return result;
};

const deleteReviewFromDB = async (id: string) => {
  const result = await Review.findByIdAndDelete(id);
  return result;
};

const getAllReviewsFromDB = async (options: IPaginationOptions) => {
  const query = Review.aggregate();

  //Handle pagination
  const page = Number(options?.page) || 1;
  const limit = Number(options?.limit) || 10;
  const skip = (page - 1) * limit;
  query.skip(skip).limit(limit);

  //Handle sorting
  const sortBy = options.sortBy ?? 'createdAt';
  const sortOrder = (options.sortOrder as 'asc' | 'desc') ?? 'asc';
  query.sort({
    [sortBy]: sortOrder,
  });

  //Set meta data
  const total = await Review.countDocuments();
  const meta = { page, limit, total };

  const result = await query;
  return {
    meta,
    data: result,
  };
};

const updateReviewIntoDB = async (id: string, payload: Partial<TReview>) => {
  const result = await Review.findByIdAndUpdate(id, payload);
  return result;
};

export const ReviewServices = {
  addReviewIntoDB,
  deleteReviewFromDB,
  getAllReviewsFromDB,
  updateReviewIntoDB,
};
