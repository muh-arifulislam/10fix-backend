import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import upload from '../../utils/upload';
import { IPaginationOptions } from '../../interface';

const addBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogsFromDB = async (options: IPaginationOptions) => {
  const query = Blog.aggregate();

  //Handle pagination
  const page = Number(options?.page) || 1;
  const limit = Number(options?.limit) || 10;
  const skip = (page - 1) * limit;
  query.skip(skip).limit(limit);

  //Handle sorting
  const sortBy = options.sortBy ?? 'createdAt';
  const sortOrder = (options.sortOrder as 'asc' | 'desc') ?? 'asc';
  query.sort({
    [sortBy]: sortOrder,
  });

  //Set meta data
  const total = await Blog.countDocuments();
  const meta = { page, limit, total };

  const result = await query;
  return {
    meta,
    data: result,
  };
};

const getLatestBlogFromDB = async () => {
  const result = await Blog.find().sort({ createdAt: 1 }).limit(2);
  return result;
};

const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

const deleteBlogIntoDB = async (id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  const fileName = blog.image.split('/')[blog.image.split('/').length - 1];

  upload.deleteImage(fileName);

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  const result = await Blog.findByIdAndUpdate(id, payload);
  return result;
};

export const BlogServices = {
  addBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  deleteBlogIntoDB,
  getLatestBlogFromDB,
  updateBlogIntoDB,
};
