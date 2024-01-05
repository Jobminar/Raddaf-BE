// controllers/evalRequestController.js
import evalRequest from "../models/evalrequest.js";

export async function getAllevalRequests(req, res) {
  try {
    // Extract userId from the request body
    const { userId } = req.body;

    // If userId is not provided, fetch all evalRequests from the database
    if (!userId) {
      const evalRequests = await evalRequest.findevalRequests();
      return res.json(evalRequests);
    }

    // If userId is provided, fetch only the evalRequests associated with that userId
    const userevalRequests = await evalRequest.find({ userId });

    // Respond with the retrieved evalRequests for the specific user
    res.json(userevalRequests);
  } catch (error) {
    // Handle errors and respond with a 500 Internal Server Error
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function postevalRequest(req, res) {
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

    // Create a new evalRequest instance with the provided data
    const newevalRequest = new evalRequest({
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

    // Save the new evalRequest record to the database
    await newevalRequest.save();

    // Respond with a 201 Created status and a success message
    res.status(201).json({ message: "evalRequest created successfully" });
  } catch (error) {
    // Handle errors and respond with a 500 Internal Server Error
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getListings = async (req, res) => {
  try {
    // Fetch all listing properties from the database
    const listings = await ListingProperty.find();

    // Respond with the listing properties
    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for getting a listing property by user email
export const getListingByUserEmail = async (req, res) => {
  try {
    const { userEmail } = req.body;

    if (!userEmail) {
      return res
        .status(400)
        .json({ error: "User email is required in the request body" });
    }

    // Fetch the listing properties for the given user email
    const listings = await ListingProperty.find({
      "contactDetails.email": userEmail,
    });

    // Respond with the listing properties
    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for getting a listing property by address
export const getListingByAddress = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res
        .status(400)
        .json({ error: "Address is required in the request body" });
    }

    // Fetch the listing properties for the given address
    const listings = await ListingProperty.find({ address });

    // Respond with the listing properties
    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
