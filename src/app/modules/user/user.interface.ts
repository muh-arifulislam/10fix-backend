import { Model } from 'mongoose';
import { TUserRole } from './user.constant';

export interface IUser {
  email: string;
  role: TUserRole;
  status: 'active' | 'disabled';
  password?: string | null;
  authType: 'gmail' | 'email-password';
  fullName: string;
}

export interface UserModel extends Model<IUser> {
  //instance methods for checking if the user exist
  // eslint-disable-next-line no-unused-vars
  isUserExistsByEmail(email: string): Promise<IUser>;
}
