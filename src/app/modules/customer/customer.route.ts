import { Router } from 'express';
import { CustomerControllers } from './customer.controller';
import validateAuth from '../../middlewares/validateAuth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.get(
  '/',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  CustomerControllers.getAllCustomer,
);

router.put(
  '/:id',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  CustomerControllers.updateSingle,
);

router.get(
  '/:id',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  CustomerControllers.getCustomer,
);

router.get(
  '/orders/:id',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  CustomerControllers.getCustomerOrders,
);

router.delete(
  '/:id',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  CustomerControllers.deleteCustomer,
);

router.put(
  '/soft-delete/:id',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  CustomerControllers.softDelete,
);

export const CustomerRoutes = router;
