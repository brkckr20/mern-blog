import mongoose from 'mongoose';
import Blog from '../models/Blog';
import User from '../models/User';

export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find()
    } catch (error) {
        return console.log(error);
    }
    if (!blogs) {
        return res.status(404).json({
            message: "Blog bulunamadı!"
        })
    }
    return res.status(200).json({ blogs })
}

export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    let existUser;
    try {
        existUser = await User.findById(user);
    } catch (e) {
        return console.log(e);
    }

    if (!existUser) {
        return res.status(400).json({
            message: "Bu ID'ye sahip kullanıcı bulunamadı!!"
        })
    }

    const blog = new Blog({
        title,
        description,
        image,
        user
    })
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existUser.blogs.push(blog);
        await existUser.save({ session });
        await session.commitTransaction();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        })
    }
    return res.status(200).json({ blog });
}

export const updateBlog = async (req, res, next) => {
    const { title, description } = req.body;
    const { id } = req.params;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(id, {
            title,
            description
        });
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return res.status(404).json({
            message: "Blog güncellenemedi!"
        })
    }
    return res.status(200).json({
        blog
    })
}

export const getById = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (error) {
        return console.log(error)
    }
    if (!blog) {
        return res.status(404).json({
            message: "Blog bulunamadı!"
        })
    }
    res.status(200).json({ blog })
}

export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id);
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return res.status(500).json({
            message: "Silme işlemi başarısız!"
        })
    }
    return res.status(200).json({
        message: "Silme işlemi başarılı!"
    })
}