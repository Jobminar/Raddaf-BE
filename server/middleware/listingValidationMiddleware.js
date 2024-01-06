// // listingValidationMiddleware.js
// import { body } from "express-validator";

// export const validateListingProperty = [
//   body("purpose").optional().isString(),
//   body("propertyType").optional().isArray().notEmpty(),
//   body("propertyType.*").optional().isString(), // Validate each element in the propertyType array
//   body("images.*")
//     .optional()
//     .custom((value, { req }) => {
//       // Checking if the value is a valid file extension or a URL
//       const isFileExtension = /\.(png|jpg)$/.test(value);
//       const isUrl = /^https?:\/\/\S+$/.test(value);

//       if (!isFileExtension && !isUrl) {
//         throw new Error("Invalid image format or URL");
//       }

//       return true;
//     }),

//   body("propertyDocuments.*.title").optional().isString(),
//   body("propertyDocuments.*.files.*")
//     .optional()
//     .isString()
//     .matches(/\.(docx|csv|xlsx|pdf)$/),
//   body("fittingAndContentsForm").optional().isString(),
//   body("energyPerformanceCertificate").optional().isString(),
//   body("leaseholdInformation.*")
//     .optional()
//     .isString()
//     .matches(/\.(docx|csv|xlsx|pdf)$/),
//   body("propertyInfoForm").optional().isString(),
//   body("localAuthoritySearch").optional().isString(),
//   body("propertyValuationReport.*")
//     .optional()
//     .isString()
//     .matches(/\.(docx|csv|xlsx|pdf)$/),
//   body("floorplan").optional().isString(),
//   body("propertyDescription").optional().isString(),
//   body("receptionlength").optional().isInt({ min: 0 }),
//   body("receptionwidth").optional().isInt({ min: 0 }),
//   body("kitchenlength").optional().isInt({ min: 0 }),
//   body("kitchenwidth").optional().isInt({ min: 0 }),
//   body("masterBedroomlength").optional().isInt({ min: 0 }),
//   body("masterBedroomwidth").optional().isInt({ min: 0 }),
//   body("bedroomlength").optional().isInt({ min: 0 }),
//   body("bedroomwidth").optional().isInt({ min: 0 }),
//   body("noOfBedrooms").optional().isInt({ min: 0 }),
//   body("noOfBathrooms").optional().isInt({ min: 0 }),
//   body("noOfToilets").optional().isInt({ min: 0 }),
//   body("parkingCapacity").optional().isInt({ min: 0 }),
//   body("contactDetails.Fullname").optional().isString(),
//   body("contactDetails.email").optional().isEmail(),
//   body("contactDetails.phoneNumber").optional().isString(),
//   body("contactDetails.Subject").optional().isString(),
//   body("specialConditions").optional().isString(),
//   body("nearby.hospital.distance").optional().isInt({ min: 0 }),
//   body("nearby.hospital.name").optional().isString(),
//   body("nearby.school.distance").optional().isInt({ min: 0 }),
//   body("nearby.school.name").optional().isString(),
//   body("nearby.busStation.distance").optional().isInt({ min: 0 }),
//   body("nearby.busStation.name").optional().isString(),
//   body("scheduleDateTime").optional().isISO8601(),
// ];

// export const validateGetListingByUserEmail = [
//   body("email").isEmail().notEmpty(),
//   // Add more validation rules as needed
// ];

// export const validateGetListingByAddress = [
//   body("address").isString().notEmpty(),
//   // Add more validation rules as needed
// ];
