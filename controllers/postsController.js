const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', (req, res) => {
    console.log(Post.getAll()); // Log to see if posts are being retrieved
    res.render('index', { posts: Post.getAll() });
});
  

// Hiển thị form để tạo bài viết mới
router.get('/posts/new', (req, res) => {
    res.render('newPost');
});
  
  // Xử lý việc tạo bài viết mới
router.post('/posts', (req, res) => {
    const { title, body } = req.body;
    Post.create(title, body);
    res.redirect('/');
});

router.get('/posts/:id', (req, res) => {
    const post = Post.getById(parseInt(req.params.id));
    if (post) {
      res.render('post', { post });
    } else {
      res.status(404).send('Post not found');
    }
});
  
router.get('/posts/:id/edit', (req, res) => {
    const post = Post.getById(parseInt(req.params.id));
    if (post) {
      res.render('editPost', { post });
    } else {
      res.status(404).send('Post not found');
    }
});
  
// Xử lý việc chỉnh sửa bài viết
router.post('/posts/:id/edit', (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    const post = Post.updateById(parseInt(id), title, body);
    if (post) {
      res.redirect(`/posts/${id}`);
    } else {
      res.status(404).send('Post not found');
    }
});
  
// Xử lý việc xóa bài viết
router.post('/posts/:id/delete', (req, res) => {
  const success = Post.deleteById(parseInt(req.params.id));
  if (success) {
    res.json({ success: true });
  } else {
    // Send a 404 error with JSON
    res.status(404).json({ success: false, error: 'Post not found' });
  }
});

router.get('/posts/:id/comments', (req, res) => {
    const post = Post.getById(parseInt(req.params.id));
    if (post) {
        res.render('postDetail', { post });
    } else {
        res.status(404).send('Post not found');
    }
});

// Thêm bình luận
router.post('/posts/:id/comments', (req, res) => {
    const post = Post.getById(parseInt(req.params.id));
    if (post) {
        const comment = req.body.comment;
        post.addComment(comment);
        res.json({ success: true, comment: comment, postId: post.id });
    } else {
        res.status(404).send('Post not found');
    }
});

module.exports = router;
