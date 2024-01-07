// Import the CallbackAgent model
import CallbackAgent from "../models/callBackAgent.js";

// Create a controller function to handle creating a new callback agent
export const createCallbackAgent = async (req, res) => {
  try {
    // Get the data from the request body
    const { name, email, phoneNumber, contactMethod, other, message } =
      req.body;

    // Validate the data
    // You can use a library like Joi or express-validator to validate the data
    // For simplicity, we assume that the data is valid

    // Create a new callback agent using the CallbackAgent model
    const newCallbackAgent = new CallbackAgent({
      name,
      email,
      phoneNumber,
      contactMethod,
      other,
      message,
    });

    // Save the callback agent to the database
    await newCallbackAgent.save();

    // Send a success response to the client
    res.json({
      message: "Callback agent created successfully",
      newCallbackAgent,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: "Something went wrong", error });
  }
};
