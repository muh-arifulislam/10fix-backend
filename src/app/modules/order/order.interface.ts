import { Model, Types } from 'mongoose';
import { TOrderStatus } from './order.constant';

export type TAddress = {
  thana: string;
  street: string;
};

export type TOrdersTimeLine = {
  receivedAt: null | string;
  completedAt: null | string;
};

export interface IOrder {
  orderId: string;
  customerId: Types.ObjectId;
  email: string;
  contactNo: string;
  shippingAddress: TAddress;
  orderedServices: { id: string; name: string }[];
  orderDetails?: string;
  dateOfService: string;
  status: TOrderStatus;
  deletedAt?: string;
  isDeleted?: boolean;
  ordersTimeLine: TOrdersTimeLine;
  createdAt: string;
  updatedAt: string;
}

export interface OrderModel extends Model<IOrder> {}
