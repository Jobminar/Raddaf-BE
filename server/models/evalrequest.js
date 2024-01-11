// models/evalRequest.js
import { Schema, model } from "mongoose";

const evalRequestSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
  username: { type: String, required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  contactNumber: { type: String, required: true },
  postCode: { type: String, required: true },
  address: { type: String, required: true },
  propertyAction: {
    type: String,
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
  additionalMessage: { type: String, required: true },
  bestWayToContact: { type: String, required: true },
  bestTimeToContact: {
    type: String,
    required: true,
  },
  createdOn: { type: Date, default: Date.now() },
});

// Custom find function
evalRequestSchema.statics.findevalRequests = function (query = {}) {
  return this.find(query);
};

const evalRequest = model("evalRequest", evalRequestSchema);

export default evalRequest;
