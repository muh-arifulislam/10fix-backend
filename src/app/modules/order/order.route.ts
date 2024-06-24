import { Router } from 'express';
import { OrderControllers } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';
import validateAuth from '../../middlewares/validateAuth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.get(
  '/draft',
  validateAuth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.moderate),
  OrderControllers.getDraftOrders,
);
router.post(
  '/place-order',
  validateRequest(OrderValidation.createOrderValidationSchema),
  OrderControllers.addOrder,
);

router.delete(
  '/:id/soft-delete',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  OrderControllers.softDeleteOrder,
);

router.put(
  '/:orderId',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  OrderControllers.updateOrderStatus,
);

router.get(
  '/',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  OrderControllers.getFilteredOrders,
);

router.get(
  '/:orderId',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  OrderControllers.getSingleOrder,
);

router.get(
  '/order-statistics/:interval',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  OrderControllers.getOrderStates,
);

router.post(
  '/sent-invoice/:orderId',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  OrderControllers.sentInvoice,
);

export const OrderRoutes = router;
