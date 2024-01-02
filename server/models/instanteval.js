// models/instanteval.js
import { Schema, model } from "mongoose";

const instantEvalSchema = new Schema({
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
    enum: ["SELL", "LET", "CURIOUS", "REMORTGAGING"],
    required: true,
  },
  timing: {
    type: String,
    enum: ["0-3 MONTHS", "3-6 MONTHS", "6+ MONTHS"],
    required: true,
  },
  additionalMessage: { type: String },
  bestWayToContact: { type: String, enum: ["EMAIL", "PHONE", "EITHER"] },
  bestTimeToContact: {
    type: String,
    enum: ["MORNING", "AFTERNOON", "EVENING", "ANYTIME"],
  },
});

const InstantEval = model("InstantEval", instantEvalSchema);

export default InstantEval;
