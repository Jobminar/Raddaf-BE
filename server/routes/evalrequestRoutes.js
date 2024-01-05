// routes/evalRequestRoutes.js
import express from "express";
import {
  getAllevalRequests,
  postevalRequest,
} from "../controllers/evalRequestController.js";

const router = express.Router();

// Route to get all evalRequests (you can change the method to POST if needed)
router.get("/evalRequests", getAllevalRequests);

// Route to post a new evalRequest
router.post("/evalRequests", postevalRequest);

export default router;
