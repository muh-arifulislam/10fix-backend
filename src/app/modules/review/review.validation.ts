import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    review: z.string({
      required_error: 'review title is required!',
      invalid_type_error: 'Please! enter a string.',
    }),
    ratings: z.number({
      required_error: 'review is required!',
      invalid_type_error: 'Please! enter a number.',
    }),
    name: z.string({
      required_error: 'name is required!',
      invalid_type_error: 'Please! enter a string.',
    }),
    designation: z
      .string({
        invalid_type_error: 'Please! enter a string.',
      })
      .optional(),
  }),
});

export const ReviewValidation = { createReviewValidationSchema };
