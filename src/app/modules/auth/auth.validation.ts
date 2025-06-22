import { z } from 'zod';

const loginWithGmailValidationSchema = z.object({
  body: z.object({
    token: z.string({ required_error: 'email is required.' }),
  }),
});

const loginWithEmailPasswordValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'email is required.' })
      .email('Please! enter a valid email.'),
    password: z.string({ required_error: 'Password is required.' }),
  }),
});

export const AuthValidation = {
  loginWithEmailPasswordValidationSchema,
  loginWithGmailValidationSchema,
};
