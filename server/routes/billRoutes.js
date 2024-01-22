import express from "express";
import multer from "multer";
import { uploadBills } from "../controllers/billController.js";

const storage = multer.memoryStorage();
const fileUpload = multer({ storage: storage });

const router = express.Router();

const upload = fileUpload.fields([
  { name: "gas", maxCount: 1 },
  { name: "electric", maxCount: 1 },
  { name: "water", maxCount: 1 },
  { name: "councilTax", maxCount: 1 },
  { name: "rentalInvoice", maxCount: 1 },
]);

router.post("/uploadBills", upload, uploadBills);

export default router;
