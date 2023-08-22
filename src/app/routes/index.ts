import express from 'express';
import { AdminRoute } from '../modules/admin/admin.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { CowRoute } from '../modules/cow/cow.route';
import { OrderRoute } from '../modules/orders/order.route';
import { ProfileRoute } from '../modules/profile/profile.route';
import { UsersRoute } from '../modules/users/users.route';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/cows',
    route: CowRoute,
  },
  {
    path: '/orders',
    route: OrderRoute,
  },
  {
    path: '/admins',
    route: AdminRoute,
  },
  {
    path: '/users/my-profile',
    route: ProfileRoute,
  },
  {
    path: '/users',
    route: UsersRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
