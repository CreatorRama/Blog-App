const Blog = require('../models/Blog');

// Get all blogs for a user (published and drafts)
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id })
      .sort({ updatedAt: -1 });
    
    res.status(200).json({ 
      success: true, 
      count: blogs.length, 
      data: blogs 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    // Check if the user owns this blog
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'User not authorized to access this blog' });
    }
    
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new blog or save draft
exports.createBlog = async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;
    
    const blog = await Blog.create({
      title,
      content,
      tags: tags || [],
      status: status || 'draft',
      author: req.user.id,
      lastSaved: Date.now()
    });
    
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update blog (save draft or publish)
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;
    let blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    // Check if the user owns this blog
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'User not authorized to update this blog' });
    }
    
    blog = await Blog.findByIdAndUpdate(
      req.params.id, 
      {
        title,
        content,
        tags: tags || blog.tags,
        status: status || blog.status,
        lastSaved: Date.now()
      },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    // Check if the user owns this blog
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'User not authorized to delete this blog' });
    }
    
    await blog.deleteOne();
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
