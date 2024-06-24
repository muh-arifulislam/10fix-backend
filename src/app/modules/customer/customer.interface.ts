import { Model, Types } from 'mongoose';

export type TFullName = {
  firstName: string;
  lastName?: string;
};

export type TAddress = {
  thana: string;
  street: string;
};

export type TCustomerStatus = 'ACTIVE' | 'DISABLED' | 'DELETED';

export interface ICustomer {
  fullName: TFullName;
  email: string;
  contactNo: string;
  address: TAddress;
  orders: Types.ObjectId[];
  status?: TCustomerStatus;
}

export interface ICustomerFilterRequest {
  name?: string | undefined;
  email: string | undefined;
  contactNo?: string | undefined;
  searchTerm?: string | undefined;
}

export interface CustomerModel extends Model<ICustomer> {
  // eslint-disable-next-line no-unused-vars
  isCustomerExistsByEmail(email: string): Promise<ICustomer>;
}
