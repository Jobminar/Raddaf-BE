import express from "express";
import {
  createAppointment,
  getAppointmentsByZone,
} from "../controllers/appointmentController.js";

const router = express.Router();

// Route to create a new appointment
router.post("/appointments", createAppointment);

// Route to get all appointments based on zoneNumber
router.get("/appointments/:zoneNumber", getAppointmentsByZone);

export default router;
