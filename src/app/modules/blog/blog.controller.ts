import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BlogServices } from './blog.service';
import catchAsync from '../../utils/catchAsync';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const userCredential = req.user;

  const result = await BlogServices.createBlogIntoDB(req.body, userCredential);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Blog created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const updateSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await BlogServices.updateBlogIntoDB(id, updatedData, req.user);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Blog updated successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const deleteSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await BlogServices.deleteBlogFromDB(id, req.user);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  updateSingleBlog,
  deleteSingleBlog,
  getAllBlogs,
};
