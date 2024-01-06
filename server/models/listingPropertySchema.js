// listingPropertySchema.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const listingPropertySchema = new Schema({
  purpose: { type: String, required: false },
  propertyType: {
    type: [String],
    required: true,
  },
  images: [
    {
      type: String,
      validate: {
        validator: function (value) {
          return /\.(png|jpg)$/.test(value) || /^https?:\/\/\S+$/.test(value);
        },
        message: "Invalid image format or URL",
      },
    },
  ],
  propertyDocuments: [
    {
      title: String,
      files: [{ type: String, match: /\.(docx|csv|xlsx|pdf)$/ }],
    },
    // Add more document types as needed
  ],
  fittingAndContentsForm: String,
  energyPerformanceCertificate: String,
  leaseholdInformation: [
    { type: String, match: /\.(docx|csv|xlsx|pdf)$/ },
    // Add more document types as needed
  ],
  propertyInfoForm: String,
  localAuthoritySearch: String,
  floorplan: String,
  propertyValuationReport: [
    { type: String, match: /\.(docx|csv|xlsx|pdf)$/ },
    // Add more document types as needed
  ],
  propertyDescription: String,
  receptionlength: { type: Number },
  receptionwidth: { type: Number },
  kitchenlength: { type: Number },
  kitchenwidth: { type: Number },
  masterBedroomlength: { type: Number },
  masterBedroomwidth: { type: Number },
  bedroomlength: { type: Number },
  bedroomwidth: { type: Number },
  noOfBedrooms: Number,
  noOfBathrooms: Number,
  noOfToilets: Number,
  parkingCapacity: Number,
  contactDetails: {
    Fullname: String,
    email: String,
    phoneNumber: String,
    Subject: String,
  },
  specialConditions: String,
  nearby: {
    hospital: { distance: Number, name: String },
    school: { distance: Number, name: String },
    busStation: { distance: Number, name: String },
  },
  scheduleDateTime: Date,
});

export default mongoose.model("ListingProperty", listingPropertySchema);
