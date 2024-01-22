import express from "express";
import bookingController from "../controllers/bookingController.js";

const router = express.Router();

router.post("/bookings", bookingController.bookViewing);
router.get("/bookings", bookingController.getBookings);

export default router;
