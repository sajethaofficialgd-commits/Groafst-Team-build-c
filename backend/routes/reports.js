import express from "express";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.get("/export", authRequired, async (req, res) => {
  const format = (req.query.format || "csv").toLowerCase();
  const data = [
    ["Report", "Value"],
    ["Active Members", "38"],
    ["Inactive Members", "4"],
    ["Ongoing Projects", "7"],
    ["Tasks Due", "12"]
  ];

  if (format === "pdf") {
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");
    res.setHeader("Content-Type", "application/pdf");
    const doc = new PDFDocument({ margin: 40 });
    doc.pipe(res);
    doc.fontSize(18).text("GROFAST DIGITAL Report", { align: "left" });
    doc.moveDown();
    data.slice(1).forEach(([label, value]) => {
      doc.fontSize(12).text(`${label}: ${value}`);
    });
    doc.end();
    return;
  }

  if (format === "excel") {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Report");
    sheet.addRows(data);
    res.setHeader("Content-Disposition", "attachment; filename=report.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    await workbook.xlsx.write(res);
    return res.end();
  }

  const csv = data.map((row) => row.join(",")).join("\n");
  res.setHeader("Content-Disposition", "attachment; filename=report.csv");
  res.setHeader("Content-Type", "text/csv");
  return res.send(csv);
});

export default router;
