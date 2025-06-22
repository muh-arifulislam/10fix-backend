import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post(
  '/login-with-gmail',
  validateRequest(AuthValidation.loginWithGmailValidationSchema),
  AuthControllers.loginUserWithGmail,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginWithEmailPasswordValidationSchema),
  AuthControllers.loginUserWithEmailPassword,
);

export const AuthRoutes = router;
