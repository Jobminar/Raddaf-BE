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
    const { address } = req.body;

    if (!address) {
      return res
        .status(400)
        .json({ error: "Address is required in the request body" });
    }

    const listings = await ListingProperty.find({ address });

    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
