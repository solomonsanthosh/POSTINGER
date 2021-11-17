const express = require('express');
const router = express.Router();
const {getPost,addPost,deletePost,updatePost} = require('../controllers/post');
router.get('/getposts', getPost);
router.post('/addposts', addPost);
router.delete('/post/:id', deletePost);
router.put('/post/:id',updatePost)
module.exports = router;