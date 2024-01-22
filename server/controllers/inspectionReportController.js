import crypto from "crypto";
import multer from "multer";
import InspectionReport from "../models/inspectionReportSchema.js";
import { uploadToS3 } from "./fileUpload.js";

const storage = multer.memoryStorage();
const fileUpload = multer({ storage: storage });

export const createInspectionReport = async (req, res) => {
  try {
    const uuid = crypto.randomUUID();
    const uploadFile = req.file;

    // Your existing file upload logic
    let uploadResult;

    if (uploadFile) {
      uploadResult = await uploadToS3(uuid, uploadFile);
    }

    const { scheduleDetails, date, agentDetails } = req.body;

    // Create a new inspection report entry with the uploaded file details
    const newInspectionReport = new InspectionReport({
      scheduleDetails,
      date,
      agentDetails,
      uploadInspection: uploadResult ? uploadResult[0].Value : null,
    });

    // Save the new inspection report entry to the database
    const savedReport = await newInspectionReport.save();

    // Respond with the saved inspection report data
    res.status(201).json(savedReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getInspectionReports = async (req, res) => {
  try {
    // Fetch all inspection reports from the database
    const inspectionReports = await InspectionReport.find();

    // Respond with the inspection reports data
    res.status(200).json(inspectionReports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Apply the middleware separately
export const uploadInspectionMiddleware = fileUpload.single("uploadInspection");
