import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  googleId: String,
  facebookId: String,
});

export default mongoose.model("User", userSchema);
