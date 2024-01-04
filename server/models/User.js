// userModel.js
import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  profileImage: {
    type: String,
    validate: {
      validator: function (value) {
        // Check if the value is a valid base64 string or a URL
        return (
          /^data:image\/(jpeg|jpg|png);base64,/.test(value) ||
          validator.isURL(value, { protocols: ["http", "https"] })
        );
      },
      message: "Invalid image format",
    },
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

// Pre-save hook to convert image to base64
userSchema.pre("save", function (next) {
  // If the image is a base64 string, do nothing
  if (this.profileImage && this.profileImage.startsWith("data:image")) {
    next();
  } else {
    // If it's a URL, convert it to a Buffer and then to a base64 string
    const bufferImage = Buffer.from(this.profileImage, "utf8");
    this.profileImage = bufferImage.toString("base64");
    next();
  }
});

export default mongoose.model("User", userSchema);
