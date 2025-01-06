const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },  // Add fname field
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: {
      type: String,
      required: true,
      unique: true,
      match: [/^\+?\d{10,15}$/, "Please enter a valid mobile number"], // Allows country codes
    },
    mobileVerified: { type: Boolean, default: false },

    emailVerified: { type: Boolean, default: false }, // New field
  emailVerificationToken: { type: String },         // Token for email verification
  emailVerificationExpires: { type: Date },        // Token expiry time
    userType: { type: String, default: "User" },
  },
  {
    collection: "Users-KYC", 
  }
);

const User = mongoose.model("UserInfo", userSchema);

module.exports = User;
