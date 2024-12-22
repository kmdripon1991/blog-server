import express from 'express';
import { RegisterUserControllers } from './user.controller';
import ValidateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './user.validation';
// import { AuthValidations } from './user.validation';

const router = express.Router();

router.post(
  '/register',
  ValidateRequest(AuthValidations.createRegisterUserValidationSchema),
  RegisterUserControllers.registerUser,
);

router.post('/login', RegisterUserControllers.loginUser);

export const AuthRoutes = router;