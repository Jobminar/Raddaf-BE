// controllers/instantevalController.js
import InstantEval from "../models/instanteval.js";

export async function getAllInstantEvals(req, res) {
  try {
    // Extract userId from the request body
    const { userId } = req.body;

    // If userId is not provided, fetch all InstantEvals from the database
    if (!userId) {
      const instantEvals = await InstantEval.findInstantEvals();
      return res.json(instantEvals);
    }

    // If userId is provided, fetch only the InstantEvals associated with that userId
    const userInstantEvals = await InstantEval.find({ userId });

    // Respond with the retrieved InstantEvals for the specific user
    res.json(userInstantEvals);
  } catch (error) {
    // Handle errors and respond with a 500 Internal Server Error
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function postInstantEval(req, res) {
  try {
    // Destructure the relevant fields from the request body, including userId
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
