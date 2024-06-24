import { sendEmail } from '../../utils/sendEmail';
import { TCustomerMessage } from './message.interface';

const sendEmailFromCustomer = async (payload: TCustomerMessage) => {
  console.log(payload);
  await sendEmail({
    to: 'info@10fix.com.bd',
    subject: 'Message From Customer!!',
    template: 'welcomeMessage',
    context: {
      fullName: 'Ariful islam',
    },
  });
};

export const MessageServices = { sendEmailFromCustomer };
