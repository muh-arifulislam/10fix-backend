import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import nodemailer from 'nodemailer';
import config from './config';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com.',
  port: 587,
  secure: config.NODE_ENV === 'production',
  auth: {
    user: 'arifibnenam@gmail.com',
    pass: 'etwj eljn febf yxgv',
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
  from: 'arifibnenam@gmail.com',
  to: 'ibnarif34@gmail.com',
  subject: 'Sending email using Node.js',
  template: 'welcomeMessage',
  context: {
    userName: 'Ariful Islam',
  },
};
