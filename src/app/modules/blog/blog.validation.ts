import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z
    .object({
      title: z
        .string({
          required_error: 'Title is required',
        })
        .min(1, 'Title must not be empty'),

      content: z
        .string({
          required_error: 'Content is required',
        })
        .min(1, 'Content must not be empty'),
    })
    .strict({ message: 'Only provide title and content' }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(1, 'Title must not be empty')
      .optional(),

    content: z
      .string({
        required_error: 'Content is required',
      })
      .min(1, 'Content must not be empty')
      .optional(),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
