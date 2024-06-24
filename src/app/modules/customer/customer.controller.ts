import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CustomerServices } from './customer.service';

const getCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerServices.getCustomerFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Customer data retrieve successfully',
    data: result,
  });
});

const getAllCustomer = catchAsync(async (req, res) => {
  const filterQuery = req.query;

  const { meta, data } =
    await CustomerServices.getAllCustomerFromDB(filterQuery);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Customers data retrieve successfully',
    meta,
    data: data,
  });
});

const deleteCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
  await CustomerServices.deleteCustomerFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Customer deleted successfully',
    data: null,
  });
});

const softDelete = catchAsync(async (req, res) => {
  const { id } = req.params;
  await CustomerServices.softDeleteFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Customer is softly deleted.',
    data: null,
  });
});

const getCustomerOrders = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { data, meta } = await CustomerServices.getCustomerOrdersFromDB(
    id,
    req,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Customer orders data retrieve successfully',
    meta: meta,
    data: data,
  });
});

const updateSingle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerServices.updateFromDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Customer orders data retrieve successfully',
    data: result,
  });
});

export const CustomerControllers = {
  getCustomer,
  getAllCustomer,
  deleteCustomer,
  getCustomerOrders,
  softDelete,
  updateSingle,
};
