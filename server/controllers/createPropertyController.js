import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import crypto from "crypto";
import ListingProperty from "../models/listingPropertySchema.js";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

async function uploadToS3Image(id, files) {
  console.log("in file upload function", files);

  let resultArr = [];
  for (const file of files) {
    const originalFileName = file.originalname;
    console.log("file name", originalFileName);
    // Upload file to S3
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${id}/Images/${originalFileName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    let result = await s3.upload(params).promise();
    resultArr.push({
      Key: result.Key,
      Value: result.Location,
    });
  }

  return resultArr;
}

async function uploadToS3(id, files) {
  console.log("in file upload function", files);

  let resultArr = [];
  for (const file of files) {
    const originalFileName = file.originalname;
    console.log("file name", originalFileName);
    // Upload file to S3
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${id}/Files/${file.fieldname}/${originalFileName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    let result = await s3.upload(params).promise();
    console.log(result);
    resultArr.push({
      Key: result.Key,
      Value: result.Location,
    });
  }

  return resultArr;
}

export const createListingProperty = async (req, res) => {
  try {
    //  const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    //   }
    const uuid = crypto.randomUUID();
    let uploadFiles = req.files;
    console.log("upload files", uploadFiles);
    let imageResult,
      propertyTitleDealsResult,
      fittingContentFormResult,
      energyPerformanceCertificateResult,
      leaseHoldInformationResult,
      localAuthoritySearchResult,
      floorPlanResult,
      propertyValuationReportResult,
      propertyInfoFormResult;
    if (
      uploadFiles &&
      uploadFiles.images &&
      uploadFiles.images.length > 0 &&
      uploadFiles.images.length < 7
    ) {
      const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
      const areAllMimeTypesValid = uploadFiles.images.every((obj) =>
        allowedMimeTypes.includes(obj.mimetype)
      );
      if (areAllMimeTypesValid) {
        imageResult = await uploadToS3Image(uuid, uploadFiles.images);
      } else {
        res.status(400).json({
          msg: `Invalid file type ${allowedMimeTypes} images allowed`,
        });
      }
    } else if (
      uploadFiles &&
      uploadFiles.images &&
      uploadFiles.images.length > 6
    ) {
      res
        .status(400)
        .json({ msg: "File Upload more than 7 Files are Disallowed" });
    }

    const allowedFileTypes = ["application/pdf"];
    if (
      uploadFiles &&
      uploadFiles.propertyTitleDeals &&
      uploadFiles.propertyTitleDeals.length > 0
    ) {
      const areAllMimeTypesValid = uploadFiles.propertyTitleDeals.every((obj) =>
        allowedFileTypes.includes(obj.mimetype)
      );
      if (areAllMimeTypesValid) {
        propertyTitleDealsResult = await uploadToS3(
          uuid,
          uploadFiles.propertyTitleDeals
        );
      } else {
        res.status(400).json({
          msg: `Invalid file type only ${allowedFileTypes} files allowed`,
        });
      }
    }

    if (
      uploadFiles &&
      uploadFiles.fittingContentForm &&
      uploadFiles.fittingContentForm.length > 0
    ) {
      const areAllMimeTypesValid = uploadFiles.fittingContentForm.every((obj) =>
        allowedFileTypes.includes(obj.mimetype)
      );
      if (areAllMimeTypesValid) {
        fittingContentFormResult = await uploadToS3(
          uuid,
          uploadFiles.fittingContentForm
        );
      } else {
        res.status(400).json({
          msg: `Invalid file type only ${allowedFileTypes} files allowed`,
        });
      }
    }

    if (
      uploadFiles &&
      uploadFiles.energyPerformanceCertificate &&
      uploadFiles.energyPerformanceCertificate.length > 0
    ) {
      const areAllMimeTypesValid =
        uploadFiles.energyPerformanceCertificate.every((obj) =>
          allowedFileTypes.includes(obj.mimetype)
        );
      if (areAllMimeTypesValid) {
        energyPerformanceCertificateResult = await uploadToS3(
          uuid,
          uploadFiles.energyPerformanceCertificate
        );
      } else {
        res.status(400).json({
          msg: `Invalid file type only ${allowedFileTypes} files allowed`,
        });
      }
    }

    if (
      uploadFiles &&
      uploadFiles.leaseHoldInformation &&
      uploadFiles.leaseHoldInformation.length > 0
    ) {
      const areAllMimeTypesValid = uploadFiles.leaseHoldInformation.every(
        (obj) => allowedFileTypes.includes(obj.mimetype)
      );
      if (areAllMimeTypesValid) {
        leaseHoldInformationResult = await uploadToS3(
          uuid,
          uploadFiles.leaseHoldInformation
        );
      } else {
        res.status(400).json({
          msg: `Invalid file type only ${allowedFileTypes} files allowed`,
        });
      }
    }

    if (
      uploadFiles &&
      uploadFiles.localAuthoritySearch &&
      uploadFiles.localAuthoritySearch.length > 0
    ) {
      const areAllMimeTypesValid = uploadFiles.localAuthoritySearch.every(
        (obj) => allowedFileTypes.includes(obj.mimetype)
      );
      if (areAllMimeTypesValid) {
        localAuthoritySearchResult = await uploadToS3(
          uuid,
          uploadFiles.localAuthoritySearch
        );
      } else {
        res.status(400).json({
          msg: `Invalid file type only ${allowedFileTypes} files allowed`,
        });
      }
    }

    if (
      uploadFiles &&
      uploadFiles.propertyValuationReport &&
      uploadFiles.propertyValuationReport.length > 0
    ) {
      const areAllMimeTypesValid = uploadFiles.propertyValuationReport.every(
        (obj) => allowedFileTypes.includes(obj.mimetype)
      );
      if (areAllMimeTypesValid) {
        propertyValuationReportResult = await uploadToS3(
          uuid,
          uploadFiles.propertyValuationReport
        );
      } else {
        res.status(400).json({
          msg: `Invalid file type only ${allowedFileTypes} files allowed`,
        });
      }
    }

    if (
      uploadFiles &&
      uploadFiles.floorPlan &&
      uploadFiles.floorPlan.length > 0
    ) {
      const areAllMimeTypesValid = uploadFiles.floorPlan.every((obj) =>
        allowedFileTypes.includes(obj.mimetype)
      );
      if (areAllMimeTypesValid) {
        floorPlanResult = await uploadToS3(uuid, uploadFiles.floorPlan);
      } else {
        res.status(400).json({
          msg: `Invalid file type only ${allowedFileTypes} files allowed`,
        });
      }
    }

    if (
      uploadFiles &&
      uploadFiles.propertyInfoForm &&
      uploadFiles.propertyInfoForm.length > 0
    ) {
      const areAllMimeTypesValid = uploadFiles.propertyInfoForm.every((obj) =>
        allowedFileTypes.includes(obj.mimetype)
      );
      if (areAllMimeTypesValid) {
        propertyInfoFormResult = await uploadToS3(
          uuid,
          uploadFiles.propertyInfoForm
        );
      } else {
        res.status(400).json({
          msg: `Invalid file type only ${allowedFileTypes} files allowed`,
        });
      }
    }

    const {
      userType,
      purpose,
      propertyType,
      propertyDescription,
      propertyDimensions,
      nearby,
      noOfBedrooms,
      noOfBathrooms,
      noOfToilets,
      parkingCapacity,
      contactDetails,
      specialConditions,
      price,
      place,
      streetParking,
      rearGarden,
      gasCentralheating,
      doubleGlazed,
      Epc,
      pinCode,
      ScheduleDateTime,
      deleteFlag,
    } = req.body;

    console.log("the request body 418", req.body);
    let newProp = {
      propertyId: uuid,
      userType: userType ? userType : "User",
      purpose: purpose ? purpose : "Sale",
      propertyType: propertyType,
      isVerified: userType == "Agent" ? true : false,
      propertyDescription: propertyDescription,
      images: imageResult,
      deleteFlag: false,
      specialConditions: specialConditions,
      place: req.body.place ? req.body.place : "United Kingdom",
      price: req.body.price ? req.body.price : 0,
      streetParking: req.body.streetParking || false,
      rearGarden: req.body.rearGarden || false,
      gasCentralheating: req.body.gasCentralheating || false,
      doubleGlazed: req.body.doubleGlazed || false,
      Epc: req.body.Epc || false,
      pinCode: pinCode,
      propertyDimensions: {
        reception: {
          length: propertyDimensions?.reception?.length
            ? parseFloat(propertyDimensions?.reception?.length)
            : "",
          width: propertyDimensions?.reception?.width
            ? parseFloat(propertyDimensions?.reception?.width)
            : "",
        },
        kitchen: {
          length: propertyDimensions?.kitchen?.length
            ? parseFloat(propertyDimensions?.kitchen?.length)
            : "",
          width: propertyDimensions?.kitchen?.width
            ? parseFloat(propertyDimensions?.kitchen?.width)
            : "",
        },
        masterBedroom: {
          length: propertyDimensions?.masterBedroom?.length
            ? parseFloat(propertyDimensions?.masterBedroom?.length)
            : "",
          width: propertyDimensions?.masterBedroom?.width
            ? parseFloat(propertyDimensions?.masterBedroom?.width)
            : "",
        },
        bedroom: {
          length: propertyDimensions?.bedroom?.length
            ? parseFloat(propertyDimensions?.bedroom?.length)
            : "",
          width: propertyDimensions?.bedroom?.width
            ? parseFloat(propertyDimensions?.bedroom?.width)
            : "",
        },
      },
      nearby: {
        hospital: {
          distance: Number(nearby?.hospital?.distance)
            ? Number(nearby?.hospital?.distance)
            : 0,
          name: nearby?.hospital?.name,
        },
        school: {
          distance: Number(nearby?.school?.distance)
            ? Number(nearby?.school?.distance)
            : 0,
          name: nearby?.school?.name,
        },
        busStation: {
          distance: Number(nearby?.busStation?.distance)
            ? Number(nearby?.busStation?.distance)
            : 0,
          name: nearby?.busStation?.name,
        },
      },
      noOfBedrooms: Number(noOfBedrooms),
      noOfBathrooms: Number(noOfBathrooms),
      noOfToilets: Number(noOfToilets),
      parkingCapacity: Number(parkingCapacity),
      contactDetails: {
        fullname:
          contactDetails && contactDetails.fullname
            ? contactDetails.fullname
            : "",
        email:
          contactDetails && contactDetails.email ? contactDetails.email : "",
        phoneNumber:
          contactDetails && contactDetails.phoneNumber
            ? contactDetails.phoneNumber
            : "",
        subject:
          contactDetails && contactDetails.subject
            ? contactDetails.subject
            : "",
      },
      propertyDocuments: propertyTitleDealsResult,
      fittingAndContentsForm: fittingContentFormResult,
      energyPerformanceCertificate: energyPerformanceCertificateResult,
      leaseholdInformation: leaseHoldInformationResult,
      propertyInfoForm: propertyInfoFormResult,
      localAuthoritySearch: localAuthoritySearchResult,
      floorplan: floorPlanResult,
      propertyValuationReport: propertyValuationReportResult,
      streetParking: streetParking || false,
      rearGarden: rearGarden || false,
      gasCentralheating: gasCentralheating || false,
      doubleGlazed: doubleGlazed || false,
      Epc: Epc || false,
      pinCode: pinCode,
      scheduleDateTime: ScheduleDateTime
        ? new Date(ScheduleDateTime).toISOString()
        : "",
      deleteFlag: deleteFlag || false,
    };

    // Create a new property listing with the uploaded file details
    const newListingProperty = new ListingProperty(newProp);

    // Save the new property listing to the database
    const savedProperty = await newListingProperty.save();

    // Respond with the saved property data
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
