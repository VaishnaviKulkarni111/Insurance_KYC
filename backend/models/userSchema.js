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

    emailVerified: { type: Boolean, default: false }, 
  emailVerificationToken: { type: String },         
  emailVerificationExpires: { type: Date },       
    userType: { type: String, default: "User" },
    submission:{type: String, default: "Not Started", enum: ["Not Started", "Submitted"]},
    status: { type: String, default: "Pending", enum: ["Pending", "In Review", "Approved", "Rejected"] },

  },
  {
    collection: "Users-KYC", 
  }
);

const User = mongoose.model("UserInfo", userSchema);

module.exports = User;
