import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewServices } from './review.service';

const addReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.addReviewIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review Added successfull',
    data: result,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewServices.deleteReviewFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review deleted successfull',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const { meta, data } = await ReviewServices.getAllReviewsFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Reviews retrieved successfull',
    data,
    meta,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewServices.updateReviewIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review updated successfull',
    data: result,
  });
});

export const ReviewControllers = {
  addReview,
  deleteReview,
  getAllReviews,
  updateReview,
};
