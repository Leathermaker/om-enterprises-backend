import { Blog } from "../models/blog.model.js";

const createBlog = async (req, res) => {
  const { content, title } = req.body;
  if (!content && !title) {
    res.status(400).json({
      success: false,
      msg: "Content is required"
    });
  }
  try {
    await Blog.create({
      content,
      title
    });
    return res.status(200).json({
      success: true,
      msg: "Blog created successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server Error"
    });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs) {
      return res.status(404).json({
        success: false,
        msg: "No blogs found"
      });
    }
    return res.status(200).json({
      success: true,
      msg: "blog founded",
      blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server Error"
    });
  }
};

const getBlogById = async (req, res) => {
  const { id } = req.params;
   console.log(id);
   
  if (!id) {
    return res.status(404).json({
      success: false,
      msg: "No blogs found"
    });
  }
  try {
    const blog = await Blog.findOne({ _id: id });
    if (!blog) {
      return res.status(404).json({
        success: false,
        msg: "No blog found"
      });
    }
    return res.status(200).json({
      success: true,
      msg: "blog founded",
      blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server Error"
    });
  }
};

export { createBlog, getBlogs, getBlogById };
