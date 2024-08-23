import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, " Please provide a Username "],
    unique: true,
  },
  email: {
    type: String,
    required: [true, " Please provide a email "],
    unique: true,
  },
  password: {
    type: String,
    required: [true, " Please provide a Password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "User",
  },
  forgotePasswordToken: String,
  forgotePasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;
