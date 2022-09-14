const Post = require('../models/postModel');
const APIFeatures = require('../utilities/APIFeatures');
const AppError = require('../utilities/AppError');
const HelperFn = require('../utilities/HelperFns');

//----------SET USER ID MIDDLEWARE------------//
exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

//---------- CURRENT USER HANDLERS------------//
exports.createPost = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newPost = await Post.create({
      name,
      description,
    });

    res.status(201).json({
      status: 'success',
      data: newPost,
    });
  } catch (err) {
    next(err);
  }
};

exports.getTimelinePosts = async (req, res, next) => {
  try {
    const ApiFeatures = new APIFeatures(Post.find(), req.query)
      .filter()
      .sort()
      .fields()
      .paginate();
    const posts = await ApiFeatures.query;
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return next(new AppError("Post doesn't exist.", 404));

    res.status(200).json({ status: 'success', data: post });
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const filteredBody = HelperFn.filterObj(req.body, 'description');
    const post = await Post.findById(req.params.postId);
    if (!post) return next(new AppError("Post doesn't exist.", 404));

    //This is possible because with used a Query Middleware in Post Model that populates the user.
    if (post.user.id !== req.user.id)
      return next(new AppError('You can only update your post.', 401));

    await post.updateOne({ $set: filteredBody });

    res
      .status(200)
      .json({ status: 'success', message: 'Post has been updated.' });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new AppError("Post doesn't exist.", 404));
    //This is possible because with used a Query Middleware in Post Model that populates the user.
    if (post.user.id !== req.user.id)
      return next(new AppError('You can only delete your post.', 401));

    await deleteFile(post.image);
    await post.deleteOne();

    res
      .status(204)
      .json({ status: 'success', message: 'Post has been deleted.' });
  } catch (err) {
    next(err);
  }
};
