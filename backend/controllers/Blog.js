import Blog from '../models/Blog';

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
    const blog = new Blog({
        title,
        description,
        image,
        user
    })
    try {
        await blog.save()
    } catch (error) {
        return console.log(error);
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