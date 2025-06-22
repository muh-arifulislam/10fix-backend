import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ICustomer } from '../customer/customer.interface';
import { Customer } from '../customer/customer.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import { generateOrderId } from './order.utils';
import { ORDER_STATUS } from './order.constant';
import { Request } from 'express';
import getDateTime from '../../utils/getDateTime';
import { emailHelper } from '../../utils/emailHelper';

interface IPayload extends IOrder {
  fullName: {
    firstName: string;
    lastName: string;
  };
}

const addOrderIntoDB = async (payload: IPayload) => {
  const orderId = await generateOrderId();
  payload.orderId = orderId;

  //check if customer is new or not
  const customer = await Customer.findOne({ email: payload.email });

  //check if customer is blocked
  if (customer?.status === 'DISABLED') {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Customer account is disabled. To enable your account, please communicate to support@10fix.com.bd',
    );
  }

  if (customer) {
    payload.customerId = customer._id;

    const order = await Order.create(payload);

    await Customer.updateOne(
      { email: payload.email },
      {
        $addToSet: { orders: order._id },
      },
    );

    await emailHelper.sendConfirmationEmail(order, customer);

    return order;
  } else {
    const customerData: ICustomer = {
      fullName: payload.fullName,
      address: payload.shippingAddress,
      email: payload.email,
      contactNo: payload.contactNo,
      orders: [],
    };

    const customer = new Customer(customerData);

    payload.customerId = customer._id;

    const order = await Order.create(payload);

    customer.orders = [order._id];
    await customer.save();

    await emailHelper.sendConfirmationEmail(order, customer);

    return order;
  }
};

const softDeleteOrderFromDB = async (id: string) => {
  const order = await Order.findOne({
    orderId: id,
  });
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }

  if (order.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Order is already deleted');
  }

  if (
    order.status === ORDER_STATUS.completed ||
    order.status === ORDER_STATUS.received
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You cannot delete an order that is already completed or received',
    );
  }

  order.deletedAt = new Date().toString();
  order.isDeleted = true;
  await order.save();

  return null;
};

const updateOrderStatusIntoDB = async (orderId: string) => {
  const order = await Order.findOne({ orderId });
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }
  if (order.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order has been softly deleted');
  }

  const customer = await Customer.findById(order.customerId);
  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, 'customer not found');
  }

  if (order.status == ORDER_STATUS.pending) {
    await Order.updateOne(
      { orderId },
      {
        status: ORDER_STATUS.received,
        'ordersTimeLine.receivedAt': getDateTime(),
      },
    );

    await emailHelper.sendReceivedEmail(order, customer);
    return null;
  }

  await Order.updateOne(
    { orderId },
    {
      status: ORDER_STATUS.completed,
      'ordersTimeLine.completedAt': getDateTime(),
    },
  );

  await emailHelper.sendCompletedEmail(order, customer);
  return null;
};

const getFilteredOrdersFromDB = async (req: Request) => {
  const query = Order.aggregate();

  let status = req?.query?.status;

  query.match({
    isDeleted: false,
  });

  //Handle filtering by searchTerm
  const searchTerm = req?.query?.searchTerm;
  if (searchTerm) {
    status = '';
    query.match({
      $or: [
        { orderId: searchTerm },
        { contactNo: { $regex: searchTerm } },
        {
          email: { $regex: searchTerm },
        },
      ],
    });
  }

  //Handle filtering for order status
  if (status) {
    if (status !== 'all') {
      query.match({ status });
    }
  }

  //Handle pagination
  const page = Number(req?.query?.page) || 1;
  const limit = Number(req?.query?.limit) || 10;
  const skip = (page - 1) * limit;
  if (!searchTerm) {
    query.skip(skip).limit(limit);
  }

  //Handle date filtering
  const dateOfService = req?.query?.date;
  if (!isNaN(new Date(dateOfService as string).getTime())) {
    query.match({ dateOfService });
  }

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
  let total;
  if (status) {
    if (status !== 'all') {
      total = await Order.countDocuments({ status });
    } else {
      total = await Order.countDocuments();
    }
  } else {
    total = await Order.countDocuments();
  }

  const meta = { page, limit, total };

  return { result, meta };
};

const getDraftOrdersFromDB = async (req: Request) => {
  const query = Order.aggregate();

  query.match({ isDeleted: true });

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

  const total = await Order.countDocuments({ isDeleted: true });
  const meta = {
    page,
    total,
    limit,
  };
  return {
    data: result,
    meta,
  };
};

const getSingleOrderFromDB = async (orderId: string) => {
  const query = Order.aggregate();

  query.match({ orderId });

  query.lookup({
    from: 'customers',
    localField: 'customerId',
    foreignField: '_id',
    as: 'customer',
  });

  query.unwind('$customer');

  query.project({
    orderId: 1,
    customerId: 1,
    dateOfService: 1,
    status: 1,
    shippingAddress: 1,
    orderedServices: 1,
    ordersTimeLine: 1,
    isDeleted: 1,
    deletedAt: 1,
    customer: {
      fullName: {
        $concat: [
          '$customer.fullName.firstName',
          ' ',
          '$customer.fullName.lastName',
        ],
      },
      email: 1,
      contactNo: 1,
    },
  });

  const result = await query;
  return result[0];
};

const sentInvoiceFromDB = async (orderId: string) => {
  const order = await Order.findOne({ orderId });
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }
  const customer = await Customer.findById(order.customerId);
  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, 'customer not found');
  }

  await emailHelper.sendCompletedEmail(order, customer);
  return null;
};

export const OrderServices = {
  addOrderIntoDB,
  softDeleteOrderFromDB,
  updateOrderStatusIntoDB,
  getFilteredOrdersFromDB,
  getSingleOrderFromDB,
  getDraftOrdersFromDB,
  sentInvoiceFromDB,
};
