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
// Controller for getting all listing properties by email
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

//getting properties by place

export const getPropertiesByPlace = async (req, res) => {
  try {
    const { place } = req.body;

    const properties = await ListingProperty.find({ place: place });

    if (properties.length === 0) {
      return res
        .status(404)
        .json({ msg: "No properties found for the given place." });
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//getting properties by price

export const getPropertiesByPrice = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.body;

    const properties = await ListingProperty.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });

    if (properties.length === 0) {
      return res
        .status(404)
        .json({ msg: "No properties found within the specified price range." });
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const approveListing = async (req, res) => {
  try {
    const { listingId } = req.params;

    // Find the listing by ID and update the isVerified field
    const updatedListing = await ListingProperty.findByIdAndUpdate(
      listingId,
      { $set: { isVerified: true } },
      { new: true } // Return the updated document
    );

    if (!updatedListing) {
      return res.status(404).json({ msg: "Listing not found" });
    }

    res.status(200).json(updatedListing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
