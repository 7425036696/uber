const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors  = require("cors");
const connectDB = require('./db/db.js'); // adjust path
connectDB();
dotenv.config();
const port = process.env.PORT;

// ✅ Middleware
app.use(cors()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // 👈 VERY IMPORTANT!

// ✅ Routes
const userRoutes = require("./routes/userRoutes.js");
app.use("/user", userRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
