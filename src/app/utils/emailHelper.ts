import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import config from '../config';
import { IOrder } from '../modules/order/order.interface';
import { ICustomer } from '../modules/customer/customer.interface';
import moment from 'moment';

const sendConfirmationEmail = async (order: IOrder, customer: ICustomer) => {
  const context = {
    fullName: `${customer.fullName.firstName} ${customer.fullName.lastName}`,
    orderId: order.orderId,
    address: `${customer.address.street}, ${customer.address.thana}`,
    email: order.email,
    contactNo: order.contactNo,
    date: moment(order.createdAt).format('MM/DD/YYYY'),
    services: order.orderedServices.map((order, idx: number) =>
      (idx + 1).toString().concat('. ', order.name),
    ),
    randomness: Date.now(),
  };
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email_user,
      pass: config.email_password,
    },
  });

  transporter.use(
    'compile',
    hbs({
      viewEngine: {
        extname: '.html',
        partialsDir: path.resolve('./views'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./views'),
      extName: '.handlebars',
    }),
  );

  const mailOptions = {
    from: {
      name: '10Fix',
      address: 'noreply@10fix.com.bd',
    },
    to: order.email,
    subject: `Order confirmation from 10fix - #${order.orderId}`,
    template: 'orderConfirmationEmail',
    context,
  };

  await transporter.sendMail(mailOptions);
};

const sendReceivedEmail = async (order: IOrder, customer: ICustomer) => {
  const context = {
    fullName: `${customer.fullName.firstName} ${customer.fullName.lastName}`,
    orderId: order.orderId,
    address: `${customer.address.street}, ${customer.address.thana}`,
    email: order.email,
    contactNo: order.contactNo,
    date: moment(order.createdAt).format('MM/DD/YYYY'),
    randomness: Date.now(),
  };
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email_user,
      pass: config.email_password,
    },
  });

  transporter.use(
    'compile',
    hbs({
      viewEngine: {
        extname: '.html',
        partialsDir: path.resolve('./views'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./views'),
      extName: '.handlebars',
    }),
  );

  const mailOptions = {
    from: {
      name: '10Fix',
      address: 'noreply@10fix.com.bd',
    },
    to: order.email,
    subject: `Confirmation of Hardware Receipt from 10fix. - #${order.orderId}`,
    template: 'orderReceivedEmail',
    context,
  };

  await transporter.sendMail(mailOptions);
};
const sendCompletedEmail = async (order: IOrder, customer: ICustomer) => {
  const context = {
    fullName: `${customer.fullName.firstName} ${customer.fullName.lastName}`,
    orderId: order.orderId,
    address: `${customer.address.street}, ${customer.address.thana}`,
    email: order.email,
    contactNo: order.contactNo,
    date: moment(order.updatedAt).format('MM/DD/YYYY'),
    services: order.orderedServices.map((order, idx: number) =>
      (idx + 1).toString().concat('. ', order.name),
    ),
    randomness: Date.now(),
  };
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email_user,
      pass: config.email_password,
    },
  });

  transporter.use(
    'compile',
    hbs({
      viewEngine: {
        extname: '.html',
        partialsDir: path.resolve('./views'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./views'),
      extName: '.handlebars',
    }),
  );

  const mailOptions = {
    from: {
      name: '10Fix',
      address: 'noreply@10fix.com.bd',
    },
    to: order.email,
    subject: `Your Hardware Repair is Complete - #${order.orderId}`,
    template: 'orderCompletedEmail',
    context,
  };

  await transporter.sendMail(mailOptions);
};

export const emailHelper = {
  sendConfirmationEmail,
  sendReceivedEmail,
  sendCompletedEmail,
};
