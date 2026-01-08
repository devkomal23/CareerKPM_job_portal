
/**
 * @project      CareerKPM Job Portal - MERN Stack
 * @author       Komal (Lead Developer)
 * @internship   AMDOX Internship Program 2026
 * @copyright    (c) 2026 Komal. All rights reserved.
 * @description  Unauthorized copying or distribution of this file is strictly prohibited.
 * This module handles [Insert Module Name, e.g., Authentication/Dashboard].
 */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ✅ Mongo connection
mongoose.connect("mongodb://127.0.0.1:27017/CareerKPM")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo error:", err));

// ✅ User model (TEMP – no models folder needed)
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  user_type: String,
  fname: String,
  lname: String // Added this
});

const User = mongoose.model('User',UserSchema, 'users');
module.exports = User;

// ✅ LOGIN API
app.post("/login", async (req, res) => {
  console.log(req);
  try {
    let { email, password } = req.body;

    email = req.body.email;
    password = req.body.password;


const user = await User.findOne({ email: req.body.email });
   
    console.log(user);

    

    return res.json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        user_type: user.user_type,
fname: user.fname, // Sent to frontend
        lname: user.lname  // Sent to frontend      }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
