const express = require('express');
const router = express.Router();
const {getPost,addPost} = require('../controllers/post');
router.get('/getposts', getPost);
router.post('/addposts', addPost);
module.exports = router;