// agentModel.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: { type: String, unique: false, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  fullName: { type: String, require: true },
  phoneNo: { type: String, require: true },
  adminZones: { type: Array, require: false },
});

export default mongoose.model("Admins", adminSchema);
