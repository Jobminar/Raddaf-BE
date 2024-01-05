// routes.js
import express from "express";
import * as listingPropertyController from "../controllers/listingPropertyController.js";
import {
  validateListingProperty,
  validateGetListingByUserEmail,
  validateGetListingByAddress,
} from "../middleware/listingValidationMiddleware.js";

const router = express.Router();

// Route for creating a new property listing
router.post(
  "/create",
  validateListingProperty,
  listingPropertyController.createListingProperty
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
  "/get-listings/address",
  validateGetListingByAddress,
  listingPropertyController.getListingByAddress
);

export default router;
