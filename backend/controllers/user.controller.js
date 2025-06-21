const { validationResult } = require('express-validator')
const userModel = require('../models/user.model')
const userService = require("../services/user.service")
const blackListTokenModel = require("../models/blacklistToken.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
        message: "Validation failed. Please check your inputs."
      });
    }
    const { fullname, password, email } = req.body;
    console.log(fullname, "consoling full name")
    const hashedPassword = await userModel.hashPassword(password)
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword
    })
    if (!user) {
      return res.status(500).json({ message: "User creation failed." });
    }

    const token = await user.generateAuthToken()
    res.status(201).json({
      message: "User registered successfully",
      user,
      token
    })
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: 'Server error' });
  }
}
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = req.user; // 👈 populated by JWT auth middleware
    res.status(200).json(user)
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error while fetching user profile' });
  }
};
exports.logoutUser = async (req, res, next) => {
  try {
    // Clear cookie if using token in cookies
    res.clearCookie("token");

    // Get token from Authorization header or cookie
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "Token missing or invalid" });
    }

    // Decode token to get expiration time (for blacklist TTL)
    const decoded = jwt.decode(token);
    const expiresAt = decoded?.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // fallback: 7 days

    // Save token to blacklist
    await blackListTokenModel.create({
      token,
      expiresAt,
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });

  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error during logout" });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
     user
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
