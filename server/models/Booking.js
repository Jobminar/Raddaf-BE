import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  email: { type: String, required: true },
  zoneNumber: { type: String, required: true },
  agentEmail: { type: String, required: true },
  propertyId: { type: String, required: true },
  dateTime: { type: Date, required: true },
  currentDate: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
