import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogControllers } from './blog.controller';
import validateAuth from '../../middlewares/validateAuth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/create-blog',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.addBlog,
);

router.get('/latest', BlogControllers.getLatestBlog);

router.get('/', BlogControllers.getAllBlogs);

router.delete(
  '/:id',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  BlogControllers.removeBlog,
);
router.get('/:id', BlogControllers.getSingleBlog);

router.put(
  '/:id',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  BlogControllers.updateBlog,
);

export const BlogRoutes = router;
