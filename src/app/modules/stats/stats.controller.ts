import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatsServices } from './stats.service';

const getOrderStats = catchAsync(async (req, res) => {
  const result = await StatsServices.getOrderStatistics();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders statistics retrieved successfully.',
    data: result,
  });
});
const getCustomerStats = catchAsync(async (req, res) => {
  const result = await StatsServices.getCustomerStatistics();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customers statistics retrieved successfully.',
    data: result,
  });
});

const getStatistics = catchAsync(async (req, res) => {
  const orderStats = await StatsServices.getOrderStatistics();
  const customerStats = await StatsServices.getCustomerStatistics();
  const reviewStats = await StatsServices.getAvgReview();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All statistics retrieved successfully.',
    data: {
      order: orderStats,
      customer: customerStats,
      review: reviewStats,
    },
  });
});

export const StatsControllers = {
  getOrderStats,
  getCustomerStats,
  getStatistics,
};
