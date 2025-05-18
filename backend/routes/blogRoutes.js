const express = require('express');
const { 
  getBlogs, 
  getBlogById, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

router.route('/')
  .get(getBlogs)
  .post(createBlog);

router.route('/:id')
  .get(getBlogById)
  .put(updateBlog)
  .delete(deleteBlog);

module.exports = router;
