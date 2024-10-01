const jwt = require("jsonwebtoken");

const authCheck = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const getToken = authHeader.split(" ")[1];

    if (!getToken) {
      return res.status(401).json({ message: "Token missing" });
    }

    const verifiedToken = jwt.verify(getToken, "test");

    if (!verifiedToken) {
      return res.status(400).json({ message: "Not authenticated" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = authCheck;
