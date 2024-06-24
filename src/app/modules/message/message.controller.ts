import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MessageServices } from './message.service';

const sendEmailFromCustomer = catchAsync(async (req, res) => {
  await MessageServices.sendEmailFromCustomer(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'message sent successfully',
    data: null,
  });
});

export const MessageControllers = { sendEmailFromCustomer };
