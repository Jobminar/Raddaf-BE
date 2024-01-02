// controllers/instantevalController.js
import InstantEval, { find } from "../models/instanteval";

// Get all instantevals
export async function getAllInstantEvals(req, res) {
  try {
    const instantEvals = await find();
    res.json(instantEvals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Post a new instanteval
export async function postInstantEval(req, res) {
  try {
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

    await newInstantEval.save();
    res.status(201).json({ message: "InstantEval created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
