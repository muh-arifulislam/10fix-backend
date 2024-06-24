import { IUser } from './user.interface';
import { User } from './user.model';

const addUserToDB = async (payload: IUser) => {
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
