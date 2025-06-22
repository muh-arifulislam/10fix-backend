import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import { User } from './user.model';
import config from '../../config';
import bcrypt from 'bcrypt';
const addUserToDB = async (payload: IUser) => {
  if (payload.authType === 'email-password' && !payload.password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Password is required for email-password authentication',
    );
  }

  if (payload.authType === 'email-password' && payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_round as string),
    );
  } else if (payload.authType === 'gmail') {
    delete payload.password;
  }

  const result = await User.create(payload);
  return result;
};

const removeUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate(id, payload);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

export const UserServices = {
  addUserToDB,
  removeUserFromDB,
  updateUserIntoDB,
  getAllUsersFromDB,
};
