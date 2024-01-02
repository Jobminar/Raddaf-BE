import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  profileImage: String,
  username: { type: String, unique: true, required: false },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullname: String,
  title: String,
  language: String,
  googleId: { type: String, unique: true, required: false },
  facebookId: { type: String, unique: true, required: false },
});

userSchema.virtual("image").set(function (image) {
  this.profileImage = image;
});

export default mongoose.model("User", userSchema);
