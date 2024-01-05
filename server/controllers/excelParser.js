import xlsx from "xlsx";

export const parseExcel = (buffer) => {
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const data = [];

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convert the sheet data to an array of objects
  const rows = xlsx.utils.sheet_to_json(sheet);
  rows.forEach((row) => {
    data.push(row);
  });

  return data;
};
