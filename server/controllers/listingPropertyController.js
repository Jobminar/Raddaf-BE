// Import the ListingProperty model and required libraries
import ListingProperty from "../models/ListingProperty.js";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import { connectToDatabase } from "../config/mongodb";
import { body, validationResult } from "express-validator";
import { parseExcel } from "./excelParser.js";
import { parsePdf } from "./pdfParser.js";

// Connect to MongoDB GridFS
const storage = new GridFsStorage({
  url: connectToDatabase(), // Use your database connection string
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "property-files", // Use a meaningful bucket name
    };
  },
});

// Multer configuration for handling file uploads
const upload = multer({ storage });

// Validation middleware
export const validateListingProperty = [
  body("userId").isMongoId(), // Validate userId as a MongoDB ObjectId
  body("username").isString().notEmpty(),
  body("purpose").isIn(["Sale", "Tolet"]),
  body("propertyType").isIn(["Commercial", "Residential"]),
  // Add more validation rules as needed
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Controller for creating a new property listing
export const createListingProperty = async (req, res) => {
  try {
    const {
      userId,
      username,
      purpose,
      propertyType,
      images,
      propertyDocuments,
      fittingAndContentsForm,
      energyPerformanceCertificate,
      leaseholdInformation,
      propertyInfoForm,
      localAuthoritySearch,
      floorplan,
      propertyValuationReport,
      propertyDescription,
      noOfBedrooms,
      noOfBathrooms,
      noOfToilets,
      parkingCapacity,
      contactDetails,
      specialConditions,
      nearby,
      scheduleDateTime,
    } = req.body;

    // Use multer middleware to handle file uploads
    upload.single("files")(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to upload files" });
      }

      // Retrieve the uploaded file details
      const file = req.file;
      const fileUrl = file.url;

      // Check the file type and parse it accordingly
      if (
        file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        // The file is an Excel file
        // Use the parseExcel function to parse it
        const data = parseExcel(fileUrl);
        // Do something with the data
      } else if (file.mimetype === "application/pdf") {
        // The file is a PDF file
        // Use the parsePdf function to parse it
        const data = parsePdf(fileUrl);
        // Do something with the data
      } else {
        // The file is not supported
        // Handle the error
        return res.status(400).json({ error: "Unsupported file type" });
      }

      // Create a new property listing with the uploaded file URL
      // and the parsed data
      const newListingProperty = new ListingProperty({
        userId,
        username,
        purpose,
        propertyType,
        images,
        propertyDocuments,
        fittingAndContentsForm,
        energyPerformanceCertificate,
        leaseholdInformation,
        propertyInfoForm,
        localAuthoritySearch,
        floorplan,
        propertyValuationReport,
        propertyDescription,
        noOfBedrooms,
        noOfBathrooms,
        noOfToilets,
        parkingCapacity,
        contactDetails,
        specialConditions,
        nearby,
        scheduleDateTime,
        files: [fileUrl],
        data: data, // add the parsed data to the property listing
      });

      // Save the new property listing to the database
      const savedProperty = await newListingProperty.save();

      // Respond with the saved property data
      res.status(201).json(savedProperty);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
