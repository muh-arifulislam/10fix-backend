import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.service';

const addOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.addOrderIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order placed successfully',
    data: result,
  });
});

const softDeleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  await OrderServices.softDeleteOrderFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order placed into trash',
    data: null,
  });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  await OrderServices.updateOrderStatusIntoDB(orderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order status updated successfully',
    data: null,
  });
});

const getFilteredOrders = catchAsync(async (req, res) => {
  const { result, meta } = await OrderServices.getFilteredOrdersFromDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order status updated successfully',
    data: result,
    meta: meta,
  });
});

const getDraftOrders = catchAsync(async (req, res) => {
  const { meta, data } = await OrderServices.getDraftOrdersFromDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Draft orders successfully retrieved',
    meta,
    data: data,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await OrderServices.getSingleOrderFromDB(orderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order data retrieved successfully',
    data: result,
  });
});

const getOrderStates = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order stats data retrieved successfully',
    data: null,
  });
});

const sentInvoice = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  await OrderServices.sentInvoiceFromDB(orderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Invoice sent successfully',
    data: null,
  });
});

export const OrderControllers = {
  addOrder,
  softDeleteOrder,
  updateOrderStatus,
  getFilteredOrders,
  getSingleOrder,
  getOrderStates,
  getDraftOrders,
  sentInvoice,
};
