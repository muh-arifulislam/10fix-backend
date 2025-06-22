import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TEmailPasswordLoginUser, TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import bcrypt from 'bcrypt';
import admin from '../../firebase';

const loginUserWithEmailPassword = async (payload: TEmailPasswordLoginUser) => {
  // checking if the user exists
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  if (!user.password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Password is not set for this user.',
    );
  }

  // Here you should also check the password, e.g.:
  const isPasswordMatched = bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password is incorrect!');
  }

  // create token and send to the client
  const jwtPayload = {
    email: payload.email,
    role: user.role,
    fullName: user.fullName,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return accessToken;
};

const loginUserWithGmail = async (gmailPayload: TLoginUser) => {
  const idToken = gmailPayload.token;
  if (!idToken) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Token is required.');
  }

  const decodedToken = await admin.auth().verifyIdToken(idToken);
  if (!decodedToken?.email) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid token or email not found in token.',
    );
  }

  const { email } = decodedToken;
  const user = await User.isUserExistsByEmail(email);
  if (!user) {
    // If user does not exist, you can create a new user or throw an error
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    fullName: user.fullName,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return accessToken;
};

export const AuthServices = {
  loginUserWithEmailPassword,
  loginUserWithGmail,
};
