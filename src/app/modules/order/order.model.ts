import { Schema, model } from 'mongoose';
import {
  TAddress,
  IOrder,
  OrderModel,
  TOrdersTimeLine,
} from './order.interface';
import { Customer } from '../customer/customer.model';

const addressSchema = new Schema<TAddress>({
  thana: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
});

const ordersTimeLineSchema = new Schema<TOrdersTimeLine>(
  {
    receivedAt: {
      type: String,
      default: null,
    },
    completedAt: {
      type: String,
      default: null,
    },
  },
  {
    id: false,
  },
);

const orderSchema = new Schema<IOrder, OrderModel>(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    shippingAddress: addressSchema,
    orderedServices: [
      {
        id: { type: String },
        name: { type: String },
      },
    ],
    dateOfService: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'received', 'completed'],
      default: 'pending',
    },
    orderDetails: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: String,
      default: null,
    },
    ordersTimeLine: ordersTimeLineSchema,
  },
  {
    timestamps: true,
  },
);

orderSchema.pre('save', async function (next) {
  if (this.isModified('deletedAt') && this.deletedAt !== null) {
    try {
      // Find the corresponding customer
      const customer = await Customer.findById(this.customerId);

      if (customer) {
        // Remove the order ID from customer's orders array
        await Customer.findByIdAndUpdate(this.customerId, {
          $pull: { orders: this._id },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  next();
});

export const Order = model<IOrder, OrderModel>('Order', orderSchema);
