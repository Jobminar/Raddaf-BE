// listingValidationMiddleware.js
import { body } from "express-validator";

export const validateListingProperty = [
  body("email").isString().notEmpty(),
  body("username").isString().notEmpty(),
  body("purpose").isIn(["Sale", "Tolet"]),
  body("propertyType").isArray().notEmpty(),
  body("propertyType.*").isString(), // Validate each element in the propertyType array
  body("images.*")
    .isString()
    .matches(/\.(png|jpg)$/),
  body("propertyDocuments.*.title").isString(),
  body("propertyDocuments.*.files.*")
    .isString()
    .matches(/\.(docx|csv|xlsx)$/),
  body("fittingAndContentsForm").isString(),
  body("energyPerformanceCertificate").isString(),
  body("leaseholdInformation.*")
    .isString()
    .matches(/\.(docx|csv|xlsx)$/),
  body("propertyInfoForm").isString(),
  body("localAuthoritySearch").isString(),
  body("floorplan").isString(),
  body("propertyValuationReport.*")
    .isString()
    .matches(/\.(docx|csv|xlsx)$/),
  body("propertyDescription").isString(),
  body("noOfBedrooms").isInt({ min: 0 }),
  body("noOfBathrooms").isInt({ min: 0 }),
  body("noOfToilets").isInt({ min: 0 }),
  body("parkingCapacity").isInt({ min: 0 }),
  body("contactDetails.email").isEmail(),
  body("contactDetails.phoneNumber").isString(),
  body("specialConditions").isString(),
  body("nearby.hospital.distance").isInt({ min: 0 }),
  body("nearby.hospital.name").isString(),
  body("nearby.school.distance").isInt({ min: 0 }),
  body("nearby.school.name").isString(),
  body("nearby.busStation.distance").isInt({ min: 0 }),
  body("nearby.busStation.name").isString(),
  body("scheduleDateTime").isISO8601(),
];

export const validateGetListingByUserEmail = [
  body("email").isEmail().notEmpty(),
  // Add more validation rules as needed
];

export const validateGetListingByAddress = [
  body("address").isString().notEmpty(),
  // Add more validation rules as needed
];
