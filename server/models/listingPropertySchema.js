// listingPropertySchema.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const listingPropertySchema = new Schema({
  propertyId : String , 
  userType : {type: String, enum: ["User", "Agent"], required: true },
  purpose: { type: String, enum: ["Sale", "Tolet"], required: true },
  propertyType: {
    type: [String],
    required: true,
  },
  isVerified : { type: Boolean , default : false},
  images: [{ Key: String , Value : String }],
  propertyDescription: String,
  propertyDimensions: {
    reception : { rlength: String , Width : String },
    kitchen : { rlength: String , Width : String },
    masterBedroom: { rlength: String , Width : String },
    bedroom : { rlength: String , Width : String }
  },
  nearby: {
    hospital: { distance: Number, name: String },
    school: { distance: Number, name: String },
    busStation: { distance: Number, name: String },
  },
  noOfBedrooms: Number,
  noOfBathrooms: Number,
  noOfToilets: Number,
  parkingCapacity: Number,
  contactDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    subject: { type: String, required: true }
  },
  specialConditions: String, 
  propertyDocuments: [{ Key: String , Value : String }],
  fittingAndContentsForm: [{ Key: String , Value : String }],
  energyPerformanceCertificate: [{ Key: String , Value : String }],
  leaseholdInformation: [{ Key: String , Value : String }],
  propertyInfoForm: [{ Key: String , Value : String }],
  localAuthoritySearch: [{ Key: String , Value : String }],
  floorplan: [{ Key: String , Value : String }],
  propertyValuationReport: [{ Key: String , Value : String }],
  deleteFlag : {type: Boolean, default: false},
  scheduleDateTime: { type : Date },
  createdOn : { type : Date , default : Date.now() }
});

export default mongoose.model("ListingProperty", listingPropertySchema);
