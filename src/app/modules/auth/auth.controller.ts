import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUserWithGmail = catchAsync(async (req, res) => {
  const token = await AuthServices.loginUserWithGmail(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successful!',
    data: {
      accessToken: token,
    },
  });
});

const loginUserWithEmailPassword = catchAsync(async (req, res) => {
  const token = await AuthServices.loginUserWithEmailPassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successful!',
    data: {
      accessToken: token,
    },
  });
});

export const AuthControllers = {
  loginUserWithGmail,
  loginUserWithEmailPassword,
};
