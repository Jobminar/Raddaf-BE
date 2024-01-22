import mongoose from "mongoose";

const Schema = mongoose.Schema;

const billSchema = new Schema({
  month: { type: String, required: true },
  gas: { type: String },
  electric: { type: String },
  water: { type: String },
  councilTax: { type: String },
  rentalInvoice: { type: String },
});

export default mongoose.model("Bill", billSchema);
