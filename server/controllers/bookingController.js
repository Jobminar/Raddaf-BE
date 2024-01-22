import Booking from "../models/Booking.js";
import Agent from "../models/Agent.js";
import User from "../models/User.js";

const bookingController = {
  bookViewing: async (req, res) => {
    try {
      const { email, zoneNumber, agentEmail, propertyId, dateTime } = req.body;

      const agent = await Agent.findOne({ email: agentEmail });
      if (!agent) {
        return res.status(404).json({ error: "Agent not found" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const newBooking = new Booking({
        email,
        zoneNumber,
        agentEmail,
        propertyId,
        dateTime,
        currentDate: new Date(),
      });

      await newBooking.save();

      res
        .status(201)
        .json({ message: "Booking successful", booking: newBooking });
    } catch (error) {
      console.error("Error while booking a viewing:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getBookings: async (req, res) => {
    try {
      const { email } = req.query;

      const bookings = await Booking.find({ email });

      res.status(200).json({ bookings });
    } catch (error) {
      console.error("Error while getting bookings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default bookingController;
