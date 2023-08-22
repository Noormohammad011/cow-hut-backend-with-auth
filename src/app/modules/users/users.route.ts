import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UsersController } from './users.controller';
import { UserValidator } from './users.validation';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UsersController.getAllUsers);
router
  .route('/:id')
  .get(auth(ENUM_USER_ROLE.ADMIN), UsersController.getUser)
  .delete(auth(ENUM_USER_ROLE.ADMIN), UsersController.deleteUser);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidator.updateUserZodSchema),
  UsersController.updateUser
);
export const UsersRoute = router;
