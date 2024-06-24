import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'blog title is required!',
      invalid_type_error: 'Please! enter a string.',
    }),
    description: z.string({
      required_error: 'Description is required!',
      invalid_type_error: 'Please! enter a string.',
    }),
    image: z.string({
      required_error: 'Image is required!',
      invalid_type_error: 'Please! enter a string.',
    }),
    category: z.string({
      required_error: 'category is required!',
      invalid_type_error: 'Please! enter a string.',
    }),
    tags: z
      .string({
        required_error: 'Tag is required!',
        invalid_type_error: 'Please! enter a string.',
      })
      .array(),
  }),
});

export const BlogValidation = { createBlogValidationSchema };
