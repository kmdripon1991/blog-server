import express from 'express';
import { BlogControllers } from './blog.controller';
import Auth from '../../middlewares/auth';
import ValidateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  Auth('user'),
  ValidateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.patch(
  '/:id',
  Auth('user'),
  ValidateRequest(BlogValidation.updateBlogValidationSchema),
  BlogControllers.updateSingleBlog,
);

router.delete('/:id', Auth('user'), BlogControllers.deleteSingleBlog);

router.get('/', BlogControllers.getAllBlogs);

export const BlogRoutes = router;
