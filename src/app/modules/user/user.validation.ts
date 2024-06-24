import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    email: z.string({
      invalid_type_error: 'Password must be string',
      required_error: 'Password is required.',
    }),
    role: z.string({
      invalid_type_error: 'Password must be string',
      required_error: 'Password is required.',
    }),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
