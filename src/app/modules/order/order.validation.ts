import { z } from 'zod';

const addressValidationSchema = z.object({
  thana: z.string({
    required_error: 'Thana is required!',
    invalid_type_error: 'Thana must be a string!',
  }),
});

const fullNameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
});

const createOrderValidationSchema = z.object({
  body: z.object({
    fullName: fullNameValidationSchema,
    contactNo: z.string({
      required_error: 'Contact Number is required!',
      invalid_type_error: 'Contact Number must be a string',
    }),
    email: z
      .string({
        required_error: 'Email is required!',
        invalid_type_error: 'Enter a valid Email',
      })
      .email(),
    shippingAddress: addressValidationSchema,
    dateOfService: z.string({
      required_error: 'Date of Service is required!',
      invalid_type_error: 'Date of Service must be a string',
    }),
    orderedServices: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .array(),
    orderDetails: z.string().optional(),
  }),
});

export const OrderValidation = { createOrderValidationSchema };
