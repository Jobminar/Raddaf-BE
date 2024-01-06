import ListingProperty from "../models/listingPropertySchema.js";
import { parseExcel } from "./excelParser.js";
import { parsePdf } from "./pdfParser.js";
import { validationResult } from "express-validator";






// Controller for getting all listing properties
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
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ error: "User email is required in the request body" });
    }

    // Fetch the listing properties for the given user email
    const listings = await ListingProperty.find({
      "contactDetails.email": email,
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
