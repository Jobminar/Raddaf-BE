// Import mongoose
import { Schema, model } from "mongoose";

// Create a schema for the callback agent
const callbackAgent = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  contactMethod: {
    type: String,
    required: true,
    enum: ["Valuation", "Letting information", "Other"],
  },
  other: { type: String },
  message: { type: String, required: true },
});

// Export the schema as a model
export default model("CallbackAgent", callbackAgent);
