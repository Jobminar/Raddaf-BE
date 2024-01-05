import { PDFDocument } from "pdf-lib"; // Import from pdf-lib
import fs from "fs";
import path from "path";

export const parsePdf = async (filePath) => {
  try {
    const absoluteFilePath = path.join(
      __dirname,
      "..",
      "test",
      "data",
      filePath
    );

    const buffer = await fs.promises.readFile(absoluteFilePath);

    const pdfDoc = await PDFDocument.load(buffer);
    const text = await pdfDoc.getTextContent(); // Get text content

    return text.items.map((item) => item.str).join(""); // Extract text
  } catch (err) {
    console.error("Error parsing PDF:", err);
    throw err; // Re-throw for further handling
  }
};
