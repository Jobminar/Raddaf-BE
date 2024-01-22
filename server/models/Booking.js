import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  email: { type: String },
  zoneNumber: { type: String },
  agentEmail: { type: String },
  propertyId: { type: String },
  dateTime: { type: Date, required: true },
  currentDate: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
