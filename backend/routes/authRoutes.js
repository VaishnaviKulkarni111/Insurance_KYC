const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const router = express.Router();

const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

// Register route
router.post("/register", async (req, res) => {
  const { fname, email, password, mobile, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    // Check if user already exists by email or mobile
    const oldUser = await User.findOne({ email });
    const oldMobile = await User.findOne({ mobile });

    if (oldUser || oldMobile) {
      return res.json({ error: "User with this email or mobile number already exists" });
    }

    // Create the new user
    const user = await User.create({
      fname,
      email,
      mobile,
      password: encryptedPassword,
      userType,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, mobile: user.mobile, userType: user.userType },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      status: "ok",
      data: {
        token: token,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.send({ status: "error" });
  }
});

router.post("/login", async (req, res) => {
  const { emailOrMobile, password } = req.body;

  try {

    // Find user by email or mobile
    const user = await User.findOne({
      $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
    }); 

    if (!user) {
      return res.status(400).json({ status: "error", error: "Invalid credentials" });
    }

    // Compare the hashed password stored in the database with the provided password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ status: "error", error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, mobile: user.mobile, userType: user.userType },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "ok",
      data: { token, userType: user.userType },
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ status: "error", error: "Login failed" });
  }
});



router.get("/getAllUser", async (req, res) => {
    try {
      const allUser = await User.find({});
      res.send({ status: "ok", data: allUser });
    } catch (error) {
      console.log(error);
    }
  });




module.exports = router;