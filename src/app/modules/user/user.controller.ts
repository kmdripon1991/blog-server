import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import { RegisterUserServices } from './user.service';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await RegisterUserServices.createRegisterUserIntoDB(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'User registered successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await RegisterUserServices.loginUser(req.body);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Login successful',
    statusCode: StatusCodes.OK,
    data: { token: result },
  });
});

export const RegisterUserControllers = {
  registerUser,
  loginUser,
};
