const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://samidshadgithub:787898787898@cluster0.xfuuf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const DBconnection = mongoose.connect(MONGODB_URI);

module.exports = DBconnection;
