import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CowController } from './cow.controller';
import { CowValidator } from './cow.validation';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getAllCowDocs
);

router.get(
  '/test',
  CowController.getAllCowDocsTest
);

router.post(
  '/',
  auth(ENUM_USER_ROLE.SELLER),
  validateRequest(CowValidator.createCowZodSchema),
  CowController.createCowDoc
);
router
  .route('/:id')
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
    CowController.getSingleCowDoc
  )
  .delete(auth(ENUM_USER_ROLE.SELLER), CowController.deleteCowDoc);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER),
  validateRequest(CowValidator.updateCowZodSchema),
  CowController.updateCowDoc
);
export const CowRoute = router;
