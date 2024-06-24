import { Router } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import validateAuth from '../../middlewares/validateAuth';
import { USER_ROLE } from './user.constant';

const router = Router();

router.post(
  '/create-user',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
);

router.delete(
  '/:userId',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin),
  UserControllers.removeUser,
);

router.put(
  '/:userId',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin),
  UserControllers.updateUser,
);

router.get(
  '/',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin),
  UserControllers.getAllUsers,
);

export const UserRoutes = router;
