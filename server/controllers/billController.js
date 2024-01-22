import crypto from "crypto";
import multer from "multer";
import Bill from "../models/billSchema.js";
import { uploadToS3 } from "./fileUpload.js";

const storage = multer.memoryStorage();
const fileUpload = multer({ storage: storage });

export const uploadBills = async (req, res) => {
  try {
    const uuid = crypto.randomUUID();
    let uploadFiles = req.files;

    // Your existing file upload logic
    let gasResult,
      electricResult,
      waterResult,
      councilTaxResult,
      rentalInvoiceResult;

    if (uploadFiles) {
      gasResult = await uploadToS3(uuid, uploadFiles.gas);
      electricResult = await uploadToS3(uuid, uploadFiles.electric);
      waterResult = await uploadToS3(uuid, uploadFiles.water);
      councilTaxResult = await uploadToS3(uuid, uploadFiles.councilTax);
      rentalInvoiceResult = await uploadToS3(uuid, uploadFiles.rentalInvoice);
    }

    // Your existing code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export the function directly, without using multer middleware
