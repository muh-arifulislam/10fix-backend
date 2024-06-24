import cookieParser from 'cookie-parser';
import { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import upload from './app/utils/upload';
import catchAsync from './app/utils/catchAsync';
import sendResponse from './app/utils/sendResponse';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());

// origin: ['https://10fix.com.bd', 'https://dashboard.10fix.com.bd'],
// methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// credentials: true,
// cors configuration
app.use(cors());

app.post(
  '/upload',
  upload.upload.single('image'),
  catchAsync(async (req, res) => {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'upload ok',
      data:
        'https://server.10fix.com.bd/public/uploads/images/' +
        req.file?.filename,
    });
  }),
);

/* STATIC ROUTES */
app.use('/public/uploads/images', express.static('public/uploads/images'));

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ message: 'successfully working' });
});

//global error handler
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
