import express from "express";
const router = express.Router();
import { saveAdmin, getAgentsListForApproval , approveAgent } from "../controllers/adminController.js";


router.post("/save", saveAdmin);

router.post("/getAgentList", getAgentsListForApproval);

router.post("/approveAgent", approveAgent )


export default router;

