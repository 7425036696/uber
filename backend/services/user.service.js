const userModel = require('../models/user.model');

exports.createUser = async ({ firstname, lastname , email, password }) => {
  try {
    // ✅ Check if user already exists (for safety)


    // ✅ Create new user document
    const user = userModel.create({
      fullname:{
        firstname,
        lastname
      },
      email,
      password,
    });

   return user;

  } catch (error) {
    console.error("Error in createUser:", error.message);
    throw error;
  }
};
