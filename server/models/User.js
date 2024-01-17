// userModel.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  profileImage: {
    type: String,
    required: false,
  },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  title: String,
  fullname: String,
  language: String,
  googleId: { type: String, unique: false, required: false, sparse: true },
  facebookId: { type: String, unique: false, required: false, sparse: true },
});

// No need for pre-save hook related to image conversion

export default mongoose.model("User", userSchema);
