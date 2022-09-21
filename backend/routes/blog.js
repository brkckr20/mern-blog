import express from 'express';
const blogRouter = express.Router();

import { addBlog, deleteBlog, getAllBlogs, getById, updateBlog } from '../controllers/Blog';

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id", deleteBlog);

export default blogRouter;