import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidator } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();


router.post(
  '/signup',
  validateRequest(UserValidator.createUserZodSchema),
  AuthController.createUser
);
router.post(
  '/login',
  validateRequest(UserValidator.loginZodSchema),
  AuthController.loginUser
);

router.post(
  '/refresh-token',
  validateRequest(UserValidator.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoute = router;