import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';
import { ReviewControllers } from './review.controller';
import validateAuth from '../../middlewares/validateAuth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/add-review',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  validateRequest(ReviewValidation.createReviewValidationSchema),
  ReviewControllers.addReview,
);

router.delete(
  '/:id',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),

  ReviewControllers.deleteReview,
);

router.get('/', ReviewControllers.getAllReviews);

router.put(
  '/:id',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  ReviewControllers.updateReview,
);

export const ReviewRoutes = router;
