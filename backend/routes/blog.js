import express from 'express';
const blogRouter = express.Router();

import { addBlog, getAllBlogs, updateBlog } from '../controllers/Blog';

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);

export default blogRouter;