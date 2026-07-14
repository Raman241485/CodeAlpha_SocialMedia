import Post from "../models/Post.js";

export const createPost = async (req, res) => {

  try {

    const post = await Post.create({
      user: req.user.id,
      caption: req.body.caption,
      image: req.file ? req.file.filename : "",
    });

    res.status(201).json(post);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

export const getPosts = async (req, res) => {

  try {

    const posts = await Post.find()
      .populate("user", "name profilePic")
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
export const likePost = async (req, res) => {
  try {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user.id
      );
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();

    res.json({
      success: true,
      likes: post.likes.length
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const commentPost = async (req, res) => {
  try {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    post.comments.push({
      user: req.user.id,
      text: req.body.text
    });

    await post.save();

    res.json({
      success: true,
      comments: post.comments
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const deletePost = async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: "Post Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};