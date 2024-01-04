// userModel.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  profileImage: {
    type: String,
    required: false,
  },
  username: { type: String, unique: true, required: false },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  title: String,
  fullname: String,
  language: String,
  googleId: { type: String, unique: true, required: false },
  facebookId: { type: String, unique: true, required: false },
});

// No need for pre-save hook related to image conversion

export default mongoose.model("User", userSchema);
