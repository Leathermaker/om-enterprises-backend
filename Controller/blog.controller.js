import { Blog } from "../models/blog.model.js";

const createBlog = async (req, res) => {
  const { content, title } = req.body;
  const imageUrl = req.imageUrl;
  console.log(imageUrl, content, title)

  if (!content && !title && !imageUrl) {
    res.status(400).json({
      success: false,
      msg: "Content is required"
    });
  }
  try {
    await Blog.create({
      content,
      title,
      image: imageUrl
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

const getBlogByTitle = async (req, res) => {
  const { title } = req.params; 
  console.log(title);

  
  const normalizedTitle = decodeURIComponent(title) 
  .replace(/~/g, '?')
  .replace(/_/g, ' ')
  .replace(/\s+/g, ' ') // collapse extra spaces
  .trim();


  console.log("from title", normalizedTitle);

  if (!title) {
    return res.status(404).json({
      success: false,
      msg: "No title found"
    });
  }

  // const allBlogs = await Blog.find({});
  // allBlogs.forEach((blog, i) => {
  //   console.log(`${i + 1}. [${blog.title}]`);
  // });
  try {
    // const blog = await Blog.findOne({
    //   title: { $regex: new RegExp(`^${normalizedTitle}$`, 'i') }
    // });
    const blog = await Blog.findOne({
      title: normalizedTitle
    });

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

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({
      success: false,
      msg: "No blogs found"
    });
  }
  try {
    const blog = await Blog.findOneAndDelete({ _id: id });
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


const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    await Blog.findByIdAndUpdate(id, { title, content });
    res.status(200).json({ success: true, msg: "Blog updated" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error updating blog" });
  }
};


export { createBlog, getBlogs, getBlogById, getBlogByTitle, deleteBlog, updateBlog };
