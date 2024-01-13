// routes.js
import express from "express";
import * as listingPropertyController from "../controllers/listingPropertyController.js";
import { createListingProperty } from "../controllers/createPropertyController.js";
import {
  validateGetListingByUserEmail,
  validateGetListingByAddress,
} from "../middleware/listingValidationMiddleware.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Route for creating a new property listing
router.post(
  "/create",

  upload.fields([
    { name: "images", maxCount: 7 },
    { name: "propertyTitleDeals", maxCount: 1 },
    { name: "fittingContentForm", maxCount: 1 },
    { name: "propertyInfoForm", maxCount: 1 },
    { name: "energyPerformanceCertificate", maxCount: 1 },
    { name: "leaseHoldInformation", maxCount: 1 },
    { name: "localAuthoritySearch", maxCount: 1 },
    { name: "propertyValuationReport", maxCount: 1 },
    { name: "floorPlan", maxCount: 1 },
  ]),
  createListingProperty
);

// Route for getting all listing properties
router.get("/get-listings", listingPropertyController.getListings);

// Route for getting a listing property by user email
router.post(
  "/get-listings/user-email",
  validateGetListingByUserEmail,
  listingPropertyController.getListingByUserEmail
);

// Route for getting a listing property by address

router.post(
  "/get-properties/by-place",
  listingPropertyController.getPropertiesByPlace
);

// Route for getting properties by price range
router.post(
  "/get-properties/by-price",
  listingPropertyController.getPropertiesByPrice
);

router.use("/approvelist", listingPropertyController.approveListing);
export default router;
