import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    email: z.string({
      invalid_type_error: 'Please! enter a valid email.',
      required_error: 'Email is required.',
    }),
    password: z
      .string({
        invalid_type_error: 'Password must be a string.',
      })
      .optional(),
    fullName: z.string({
      invalid_type_error: 'FullName must be a string.',
    }),
    authType: z.enum(['gmail', 'email-password']),
    role: z.string({
      invalid_type_error: 'Password must be string',
      required_error: 'Password is required.',
    }),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
