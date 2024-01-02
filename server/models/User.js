import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  Fullname: String,
  title: String,
  language: String,
  googleId: String,
  facebookId: String,
});

export default mongoose.model("User", userSchema);
