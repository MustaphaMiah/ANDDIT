const express = require('express');
const PostController = require('../controllers/postController');

const router = express.Router();

router.route('/').post(PostController.createPost);

router.route('/timeline').get(PostController.getTimelinePosts);

module.exports = router;
