import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CustomerRoutes } from '../modules/customer/customer.route';
import { OrderRoutes } from '../modules/order/order.route';
import { MessageRoutes } from '../modules/message/message.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { StatsRoutes } from '../modules/stats/stats.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/customers',
    route: CustomerRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/messages',
    route: MessageRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/statistics',
    route: StatsRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
