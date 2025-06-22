import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import config from '../config';

export const sendEmail = async ({
  to,
  subject,
  template,
  context,
}: {
  to: string;
  subject: string;
  template: string;
  context: Record<string, unknown>;
}) => {
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
      name: '10fix',
      address: 'noreply@10fix.com.bd',
    },
    to,
    subject,
    template,
    context,
  };

  await transporter.sendMail(mailOptions);
};
