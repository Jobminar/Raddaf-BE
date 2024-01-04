// controllers/instantevalController.js

import InstantEval, { find } from "../models/instanteval";

// Get all instantevals
export async function getAllInstantEvals(req, res) {
  try {
    // Fetch all InstantEvals from the database
    const instantEvals = await find();

    // Respond with the retrieved InstantEvals
    res.json(instantEvals);
  } catch (error) {
    // Handle errors and respond with a 500 Internal Server Error
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Post a new instanteval
export async function postInstantEval(req, res) {
  try {
    // Destructure the relevant fields from the request body
    const {
      userId,
      username,
      firstName,
      lastName,
      emailAddress,
      contactNumber,
      postCode,
      address,
      propertyAction,
      timing,
      additionalMessage,
      bestWayToContact,
      bestTimeToContact,
    } = req.body;

    // Create a new InstantEval instance with the provided data
    const newInstantEval = new InstantEval({
      userId,
      username,
      firstName,
      lastName,
      emailAddress,
      contactNumber,
      postCode,
      address,
      propertyAction,
      timing,
      additionalMessage,
      bestWayToContact,
      bestTimeToContact,
    });

    // Save the new InstantEval record to the database
    await newInstantEval.save();

    // Respond with a 201 Created status and a success message
    res.status(201).json({ message: "InstantEval created successfully" });
  } catch (error) {
    // Handle errors and respond with a 500 Internal Server Error
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
