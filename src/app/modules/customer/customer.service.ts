import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Order } from '../order/order.model';

import { Customer } from './customer.model';
import { Request } from 'express';
import { ICustomer, TCustomerStatus } from './customer.interface';
type TOptions = {
  page?: string;
  limit?: string;
  contactNo?: string;
  email?: string;
  sortOrder?: string;
  sortBy?: string;
  status?: TCustomerStatus;
  searchTerm?: string;
};

const getCustomerFromDB = async (id: string) => {
  const result = await Customer.findById(id);
  return result;
};

const getAllCustomerFromDB = async (options: TOptions) => {
  const query = Customer.aggregate();
  let status: TCustomerStatus = 'ACTIVE';

  if (options.status === 'DISABLED') {
    status = 'DISABLED';
  }

  //Handle filtering by searchTerm
  const searchTerm = options.searchTerm;
  if (searchTerm) {
    query.match({
      $or: [
        { contactNo: { $regex: searchTerm } },
        {
          email: { $regex: searchTerm },
        },
        {
          'fullName.firstName': { $regex: searchTerm, $options: 'i' },
        },
        {
          'fullName.lastName': { $regex: searchTerm, $options: 'i' },
        },
      ],
    });
  }

  if (options.contactNo) {
    query.match({ contactNo: options.contactNo });
  }

  if (options.email) {
    query.match({ contactNo: options.email });
  }

  query.match({
    status,
  });

  // pagination
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip: number = (page - 1) * limit;
  query.skip(skip);
  query.limit(limit);

  //sorting
  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = (options.sortOrder as 'asc' | 'desc') || 'asc';
  query.sort({ [sortBy]: sortOrder });

  query.project({ __v: 0 });
  const result = await query;

  const total = await Customer.countDocuments({ status });

  const meta = {
    total,
    page,
    limit,
  };

  return {
    meta,
    data: result,
  };
};

const deleteCustomerFromDB = async (id: string) => {
  await Customer.findByIdAndDelete(id);
  return null;
};

const softDeleteFromDB = async (id: string) => {
  const customer = await Customer.findById(id);

  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, 'customer not found!');
  }

  await Customer.updateOne(
    { _id: id },
    {
      status: 'DELETED',
    },
  );

  return null;
};

const getCustomerOrdersFromDB = async (id: string, req: Request) => {
  const customer = await Customer.findById(id);

  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, 'Customer not found!');
  }

  const query = Order.aggregate();

  query.match({
    email: customer.email,
  });

  //Handle pagination
  const page = Number(req?.query?.page) || 1;
  const limit = Number(req?.query?.limit) || 10;
  const skip = (page - 1) * limit;
  query.skip(skip).limit(limit);
  //lookup project data
  query.lookup({
    from: 'customers',
    localField: 'customerId',
    foreignField: '_id',
    as: 'customer',
  });
  query.unwind('$customer');
  query.project({
    orderId: 1,
    customerFullName: {
      $concat: [
        '$customer.fullName.firstName',
        ' ',
        '$customer.fullName.lastName',
      ],
    },
    email: 1,
    contactNo: 1,
    shippingAddress: 1,
    orderedServices: 1,
    dateOfService: 1,
    status: 1,
    orderDetails: 1,
    deletedAt: 1,
    customerId: 1,
    isDeleted: 1,
  });
  const result = await query;

  //Set meta data
  const total = await Order.countDocuments({ email: customer.email });
  const meta = {
    total,
    page,
    limit,
  };
  return { meta, data: result };
};

const updateFromDB = async (id: string, payload: Partial<ICustomer>) => {
  const result = await Customer.findByIdAndUpdate(id, payload);
  return result;
};

export const CustomerServices = {
  getCustomerFromDB,
  getAllCustomerFromDB,
  deleteCustomerFromDB,
  getCustomerOrdersFromDB,
  softDeleteFromDB,
  updateFromDB,
};
