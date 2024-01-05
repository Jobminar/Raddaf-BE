// listingValidationMiddleware.js
import { body } from "express-validator";

export const validateListingProperty = [
  body("userId").isMongoId(),
  body("username").isString().notEmpty(),
  body("purpose").isIn(["Sale", "Tolet"]),
  body("propertyType").isIn(["Commercial", "Residential"]),
];

export const validateGetListingByUserEmail = [
  body("userEmail").isEmail().notEmpty(),
  // Add more validation rules as needed
];

export const validateGetListingByAddress = [
  body("address").isString().notEmpty(),
  // Add more validation rules as needed
];
