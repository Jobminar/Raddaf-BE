import express from "express";
const router = express.Router();
import {
  saveAdmin,
  getAgentsListForApproval,
  approveAgent,
  adminLogin,
} from "../controllers/adminController.js";

router.post("/save", saveAdmin);
router.post("/login", adminLogin);
router.post("/getAgentList", getAgentsListForApproval);

router.post("/approveAgent", approveAgent);

export default router;
