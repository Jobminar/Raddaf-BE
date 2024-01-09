import ListingProperty from "../models/listingPropertySchema.js";
import { parseExcel } from "./excelParser.js";
import { parsePdf } from "./pdfParser.js";

// Controller for getting all listing properties
export const getListings = async (req, res) => {
  try {
    const listings = await ListingProperty.find();
    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getListingByUserEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ error: "User email is required in the request body" });
    }

    const listings = await ListingProperty.find({
      "contactDetails.email": email,
    });

    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getListingByAddress = async (req, res) => {
  try {
    const { place } = req.body;

    if (!place) {
      return res
        .status(400)
        .json({ error: "place is required in the request body" });
    }

    const listings = await ListingProperty.find({ place });

    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
