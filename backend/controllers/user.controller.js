const { validationResult } = require('express-validator')
const userModel = require('../models/user.model')
const userService = require("../services/user.service")
exports.registerUser = async (req,res,next) =>{
    try{
 const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
        message: "Validation failed. Please check your inputs."
      });
    }
    const {fullname, password, email} = req.body;
    console.log(fullname, "consoling full name")
    const hashedPassword = await userModel.hashPassword(password)
    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
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
}catch (error) {
    console.error("Register error:", error);
   res.status(500).json({ error: 'Server error' });
  }
}