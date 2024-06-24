import { Schema, model } from 'mongoose';
import { CustomerModel, ICustomer, TAddress } from './customer.interface';

const fullNameSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: { type: String },
});

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

const customerSchema = new Schema<ICustomer, CustomerModel>(
  {
    fullName: fullNameSchema,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    address: addressSchema,
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    status: {
      type: String,
      enum: ['ACTIVE', 'DISABLED', 'DELETED'],
      default: 'ACTIVE',
    },
  },
  {
    timestamps: true,
  },
);

customerSchema.statics.isCustomerExistsByEmail = async function (
  email: string,
) {
  return await Customer.findOne({ email });
};

export const Customer = model<ICustomer, CustomerModel>(
  'Customer',
  customerSchema,
);
