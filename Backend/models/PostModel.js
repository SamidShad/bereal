const { model, Schema } = require("mongoose");

const PostSchema = new Schema({
  isUser: {
    type: String,
    default: "",
  },
  title: String,
  content: String,
  author: String,
  hastags: [String],
  selectedFile: String,
  comments: [Object],
  like: {
    type: [String],
    default: [],
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

const PostModel = model("Post", PostSchema);

module.exports = PostModel;
