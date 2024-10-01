const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/UserModel");

const secret = "test";

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signup = async (req, res) => {
  const { profileImage, email, password, fullName, userName } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      profileImage,
      email,
      userName,
      fullName,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getRecentUsers = async (req, res) => {
  try {
    const getAllRecentUsers = await UserModel.find().sort({ _id: -1 }).limit(4);
    res.status(200).json(getAllRecentUsers);
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const searchquery = req.query.search || "";
    const getAllUsers = await UserModel.find(
      searchquery ? { userName: { $regex: searchquery, $options: "i" } } : {}
    );
    res.status(200).json(getAllUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

const getThatUser = async (req, res) => {
  try {
    const username = req.body.username;
    const User = await UserModel.find({ userName: username });
    res.status(200).json(User);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

module.exports = {
  signin,
  signup,
  getRecentUsers,
  getAllUsers,
  getThatUser,
};
