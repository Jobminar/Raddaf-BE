// controllers/appointmentController.js

import Appointment from "../models/AppointmentSchema.js";
import User from "../models/User.js";

export const createAppointment = async (req, res) => {
  try {
    const { email, username, propertyType, date, time, zoneNumber } = req.body;

    // Check if the user exists by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      propertyType,
      date,
      time,
      zoneNumber,
      userEmail: email,
      username,
    });

    // Save the new appointment
    await newAppointment.save();

    // Add the appointment reference to the user's appointments array
    user.appointments.push(newAppointment._id);

    // Save the updated user record
    await user.save();

    res.status(200).json({ message: "Appointment created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controllers/appointmentController.js

export const getAppointmentsByZone = async (req, res) => {
  try {
    const { zoneNumber } = req.params;

    // Find all appointments with the specified zoneNumber
    const appointments = await Appointment.find({ zoneNumber });

    if (!appointments || appointments.length === 0) {
      return res
        .status(404)
        .json({ error: "No appointments found for the specified zoneNumber" });
    }

    res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
