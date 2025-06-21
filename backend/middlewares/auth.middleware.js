const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');
const userModel = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    // Check blacklist
    const blacklisted = await blackListTokenModel.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ message: "Token has been blacklisted." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) return res.status(401).json({ message: "Invalid token." });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Authentication failed." });
  }
};

module.exports = authMiddleware;
