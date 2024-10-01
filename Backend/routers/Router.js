const express = require("express");
const {
  apiController,
  postAddController,
  getAllPostsController,
  postDeleteController,
  postUpdateController,
  postLikeController,
  getUserPosts,
  addPostComment,
  getPostComments,
} = require("./controllers/PostController");
const {
  getAllUsers,
  getRecentUsers,
  getThatUser,
  signin,
  signup,
} = require("./controllers/UserController");
const authCheck = require("../middleware/authCheck");

const router = express.Router();

router.get("/", apiController);
router.get("/posts", getAllPostsController);
router.post("/addpost", authCheck, postAddController);
router.post("/userposts", getUserPosts);
router.delete("/deletepost/:id", authCheck, postDeleteController);
router.patch("/updatepost/:id", authCheck, postUpdateController);
router.patch("/likepost/:id", authCheck, postLikeController);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/recentusers", getRecentUsers);
router.get("/getallusers", getAllUsers);
router.post("/getthatuser", getThatUser);
router.post("/comment/:postname", authCheck, addPostComment);
router.get("/getcomments/:postname", getPostComments);

module.exports = router;
