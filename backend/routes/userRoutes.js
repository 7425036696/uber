const express = require('express');
const router = express.Router();
const { registerUser } = require("../controllers/user.controller");
const { body } = require("express-validator")
router.post('/register', [
    body('fullname.firstname').isString().withMessage('firstname min length should 3'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], registerUser);


module.exports = router;