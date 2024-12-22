import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { RegisterUser } from '../user/user.model';
import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import { BlogSearchableFields } from './blog.constant';

const createBlogIntoDB = async (payload: TBlog, credential: JwtPayload) => {
  const userEmail = credential?.userEmail;
  const user = await RegisterUser.findOne({
    email: userEmail,
  });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  payload.author = user?._id;
  const result = await BlogModel.create(payload);
  const responseData = {
    _id: result._id,
    title: result.title,
    content: result.content,
    author: result.author,
  };
  return responseData;
};

const updateBlogIntoDB = async (
  id: string,
  payload: Partial<TBlog>,
  credential: JwtPayload,
) => {
  const { userEmail } = credential;
  const user = await RegisterUser.findOne({ email: userEmail });
  const blog = await BlogModel.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (user?._id.toString() !== blog?.author.toString()) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You have not permission to update this blog',
    );
  }
  const result = await BlogModel.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author');

  const responseData = {
    _id: result?._id,
    title: result?.title,
    content: result?.content,
    author: result?.author,
  };

  return responseData;
};

const deleteBlogFromDB = async (id: string, credential: JwtPayload) => {
  const { userEmail } = credential;
  const user = await RegisterUser.findOne({ email: userEmail });
  const blog = await BlogModel.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (user?._id.toString() !== blog?.author.toString()) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You have not permission to Delete this blog',
    );
  }

  const result = await BlogModel.findByIdAndDelete(id, { new: true });
  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const getAllBlogsFromDB = new QueryBuilder(BlogModel.find(), query)
    .search(BlogSearchableFields)
    .filter()
    .sort();

  const result = await getAllBlogsFromDB.modelQuery.populate('author');
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};
