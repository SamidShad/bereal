const PostModel = require("../../models/PostModel");

const apiController = (req, res) => {
  try {
    res.status(200).json({
      message: "API working successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllPostsController = async (req, res) => {
  try {
    const getAllPosts = await PostModel.find();
    res.status(200).json(getAllPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const postAddController = async (req, res) => {
  try {
    const post = req.body;
    post.createAt = new Date();
    const newPost = await PostModel.create(post);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const postDeleteController = async (req, res) => {
  try {
    const id = req.params.id;
    const getDeletedArray = await PostModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Post deleted", deletedArray: getDeletedArray });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const postUpdateController = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPostContent = req.body;
    await PostModel.findByIdAndUpdate(id, updatedPostContent);
    res.status(200).json({ message: "Post edited" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const postLikeController = async (req, res) => {
  try {
    const id = req.params.id;
    const userLike = req.body.userId;
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const index = post.like.indexOf(userLike);

    if (index === -1) {
      post.like.push(userLike);
    } else {
      post.like.splice(index, 1);
    }

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const isUser = req.body.isUser;
    const getAllPosts = await PostModel.find({ isUser: isUser });
    res.status(200).json(getAllPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addPostComment = async (req, res) => {
  try {
    const { postname, userName, comment } = req.body;
    const post = await PostModel.findOne({ title: postname });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({ userName, comment });
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostComments = async (req, res) => {
  try {
    const { postname } = req.params;
    const post = await PostModel.findOne({ title: postname });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ comments: post.comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  apiController,
  getAllPostsController,
  postAddController,
  postDeleteController,
  postUpdateController,
  postLikeController,
  getUserPosts,
  addPostComment,
  getPostComments,
};
