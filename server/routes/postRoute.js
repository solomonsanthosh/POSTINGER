const express = require('express');
const multer = require('multer');
const {cloudinary,storage} = require('../cloudinary')
const upload = multer({ storage });


const router = express.Router();
const {getPost,addPost,deletePost,updatePost} = require('../controllers/post');
router.get('/getposts', getPost);
router.post('/addposts',upload.single("image"), addPost);
router.delete('/post/:id', deletePost);
router.put('/post/:id',upload.single("image"),updatePost)
module.exports = router;