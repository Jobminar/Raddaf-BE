import mongoose from "mongoose";

const Schema = mongoose.Schema;

const inspectionReportSchema = new Schema({
  scheduleDetails: String,
  date: String,
  agentDetails: String,
  uploadInspection: String, // Assuming you store the S3 URL or file path
});

export default mongoose.model("InspectionReport", inspectionReportSchema);
