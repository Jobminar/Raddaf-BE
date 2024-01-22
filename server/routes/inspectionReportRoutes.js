import express from "express";
import {
  createInspectionReport,
  getInspectionReports,
} from "../controllers/inspectionReportController.js";

const router = express.Router();

router.post("/createInspectionReport", createInspectionReport);
router.get("/getInspectionReports", getInspectionReports);

export default router;
