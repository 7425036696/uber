const express = require('express');
const router = express.Router();
const { body } = require("express-validator");

// Controller functions
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} = require("../controllers/user.controller");

// Auth middleware (JWT checker)
const authMiddleware = require("../middlewares/auth.middleware");

// --------------------
// 🔐 Register Route
// --------------------
router.post(
  '/register',
  [
    body('fullname.firstname')
      .isString().withMessage('First name must be a string')
      .isLength({ min: 3 }).withMessage('First name must be at least 3 characters'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
      .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
  ],
  registerUser
);

// --------------------
// 🔐 Login Route
// --------------------
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  loginUser
);

// --------------------
// 🔒 Get Profile (requires token)
// --------------------
router.get('/profile', authMiddleware, getUserProfile);

// --------------------
// 🔒 Logout (requires token)
// --------------------
router.post('/logout', authMiddleware, logoutUser);

module.exports = router;
