// listingPropertySchema.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const listingPropertySchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  purpose: { type: String, enum: ["Sale", "Tolet"], required: true },
  propertyType: {
    type: [String],
    required: true,
  },
  images: [{ type: String, match: /\.(png|jpg)$/ }],
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
  noOfBedrooms: Number,
  noOfBathrooms: Number,
  noOfToilets: Number,
  parkingCapacity: Number,
  contactDetails: {
    email: String,
    phoneNumber: String,
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
