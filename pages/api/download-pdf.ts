import { NextApiRequest, NextApiResponse } from "next";
import PDFDocument from "pdfkit";
import fs from "fs";
import fetch from "node-fetch";

interface ProductData {
  title: string;
  imageUrl: string;
  imageBuffer: Buffer;
  siltecLogoBuffer: Buffer;
  cLogoBuffer: Buffer;
  pageUrl: string;
  brand: string;
}

// Function to generate the PDF file
function generatePDF(productData: ProductData): any {
  // Create a new PDF document
  const doc = new PDFDocument();

  // Add dynamic content to the PDF document
  doc.image(productData.siltecLogoBuffer, { width: 100 });
  doc.moveDown(1);
  doc.image(productData.imageBuffer, {
    fit: [470, 300],
    align: "center",
    valign: "center",
  });
  doc.moveDown(1);
  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .fillColor("#0c3e4b")
    .text(productData.title.toUpperCase(), {
      link: `https://siltec.vercel.app${productData.pageUrl}`,
      align: "center",
    });
  doc
    .font("Helvetica-Bold")
    .fillColor("#0c3e4b")
    .text(productData.brand.toUpperCase(), {
      align: "center",
    });
  doc.moveDown(6);

  doc.image(productData.cLogoBuffer, {
    fit: [470, 50],
    align: "center",
    valign: "center",
  });
  doc.moveDown(0.5);
  doc
    .fontSize(12)
    .fillColor("#0c3e4b")
    .text("51 rue de Miromesnil, 75008 Paris", { align: "center" });
  doc
    .fillColor("#0c3e4b")
    .text("contact@siltec-mobilier.com", { align: "center" });
  doc.fillColor("#0c3e4b").text("Tel: +33 1 42 66 09 13", { align: "center" });

  doc.end();

  // Return the PDF document as a stream
  return doc;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Download the image from the URL
  const imageUrl = req.query.imageUrl as string;
  const imageResponse = await fetch(imageUrl);
  const imageBuffer = await imageResponse.buffer();
  const siltecLogoResponse = await fetch(
    "https://siltec.vercel.app/siltec.jpg"
  );
  const cLogoResponse = await fetch(
    "https://siltec.vercel.app/android-chrome-192x192.png"
  );
  const siltecLogoBuffer = await siltecLogoResponse.buffer();
  const cLogoBuffer = await cLogoResponse.buffer();

  const productData: ProductData = {
    title: req.query.title as string,
    brand: req.query.brand as string,
    pageUrl: req.query.pageUrl as string,
    imageUrl,
    imageBuffer,
    siltecLogoBuffer,
    cLogoBuffer,
  };

  // Generate the PDF document
  const pdfStream = generatePDF(productData);

  // Set the response headers for a PDF file
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=product.pdf");

  // Pipe the PDF stream to the response
  pdfStream.pipe(res);
}
