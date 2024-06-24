import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const addBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.addBlogIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog added successfully',
    data: result,
  });
});
const removeBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.deleteBlogIntoDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog added successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const { meta, data } = await BlogServices.getAllBlogsFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Blogs retrieved successfully',
    meta,
    data,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.getSingleBlogFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog data retrieved successfully',
    data: result,
  });
});

const getLatestBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.getLatestBlogFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Latest blog data retrieved successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.updateBlogIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog data updated',
    data: result,
  });
});

export const BlogControllers = {
  addBlog,
  getAllBlogs,
  removeBlog,
  getSingleBlog,
  getLatestBlog,
  updateBlog,
};
