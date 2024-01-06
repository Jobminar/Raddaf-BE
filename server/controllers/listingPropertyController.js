import ListingProperty from "../models/listingPropertySchema.js";
import { parseExcel } from "./excelParser.js";
import { parsePdf } from "./pdfParser.js";

export const createListingProperty = async (req, res) => {
  try {
    const {
      purpose,
      propertyType,
      images,
      propertyDocuments,
      fittingAndContentsForm,
      energyPerformanceCertificate,
      leaseholdInformation,
      propertyInfoForm,
      localAuthoritySearch,
      propertyValuationReport,
      floorplan,
      propertyDescription,
      receptionlength,
      receptionwidth,
      kitchenlength,
      kitchenwidth,
      masterBedroomlength,
      masterBedroomwidth,
      bedroomlength,
      bedroomwidth,
      noOfBedrooms,
      noOfBathrooms,
      noOfToilets,
      parkingCapacity,
      contactDetails,
      specialConditions,
      nearby,
      scheduleDateTime,
    } = req.body;

    const files = req.files || [];
    const parsedData = [];

    for (const file of files) {
      if (
        file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        const data = parseExcel(file.buffer);
        parsedData.push({ filename: file.originalname, data });
      } else if (file.mimetype === "application/pdf") {
        const data = parsePdf(file.buffer);
        parsedData.push({ filename: file.originalname, data });
      } else {
        return res.status(400).json({ error: "Unsupported file type" });
      }
    }

    const newListingProperty = new ListingProperty({
      purpose,
      propertyType,
      images,
      propertyDocuments,
      fittingAndContentsForm,
      energyPerformanceCertificate,
      leaseholdInformation,
      propertyInfoForm,
      localAuthoritySearch,
      propertyValuationReport,
      floorplan,
      propertyDescription,
      receptionlength,
      receptionwidth,
      kitchenlength,
      kitchenwidth,
      masterBedroomlength,
      masterBedroomwidth,
      bedroomlength,
      bedroomwidth,
      noOfBedrooms,
      noOfBathrooms,
      noOfToilets,
      parkingCapacity,
      contactDetails,
      specialConditions,
      nearby,
      scheduleDateTime,
      files: parsedData,
    });

    const savedProperty = await newListingProperty.save();

    res.status(201).json(savedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
