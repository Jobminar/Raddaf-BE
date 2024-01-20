import express from "express";
const router = express.Router();
import {
  saveAdmin,
  getAgentsListForApproval,
  approveAgent,
  adminLogin,
  getAllVerifiedAgents,
  getAllAdmins, // Add this import
} from "../controllers/adminController.js";

router.post("/save", saveAdmin);
router.post("/login", adminLogin);
router.post("/getAgentList", getAgentsListForApproval);
router.get("/agents/verified", getAllVerifiedAgents);
router.get("/allAdmins", getAllAdmins); // Add this route
router.post("/approveAgent", approveAgent);

export default router;
