// routes.js
import express from "express";
import * as listingPropertyController from "../controllers/listingPropertyController.js";
import { validateListingProperty } from "../middleware/validationMiddleware.js";

const router = express.Router();

// Route for creating a new property listing
router.post(
  "/create",
  validateListingProperty,
  listingPropertyController.createListingProperty
);

// Add more routes as needed

export default router;
