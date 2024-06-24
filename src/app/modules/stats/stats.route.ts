import { Router } from 'express';
import { StatsControllers } from './stats.controller';
import validateAuth from '../../middlewares/validateAuth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.get(
  '/orders',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  StatsControllers.getOrderStats,
);
router.get(
  '/customers',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  StatsControllers.getCustomerStats,
);

router.get(
  '/',
  validateAuth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.moderate),
  StatsControllers.getStatistics,
);

export const StatsRoutes = router;
