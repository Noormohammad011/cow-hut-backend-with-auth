import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidator } from './admin.validation';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidator.createAdminZodSchema),
  AdminController.createAdmin
);

router.post(
  '/login',
  validateRequest(AdminValidator.loginZodSchema),
  AdminController.loginAdmin
);

router.post(
  '/refresh-token',
  validateRequest(AdminValidator.refreshTokenZodSchema),
  AdminController.refreshToken
);

export const AdminRoute = router;
