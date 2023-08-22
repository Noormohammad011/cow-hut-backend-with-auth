import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidator } from './order.validation';

const router = express.Router();

router
  .route('/')
  .post(
    auth(ENUM_USER_ROLE.BUYER),
    validateRequest(OrderValidator.createOrderZodSchema),
    OrderController.createOrder
  )
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
    OrderController.getOrders
  );

router.get(
  '/:orderId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  OrderController.getSingleOrder
);

export const OrderRoute = router;
