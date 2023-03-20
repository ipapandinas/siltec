import { NextApiRequest, NextApiResponse } from "next";
import PDFDocument from "pdfkit";
import fs from "fs";
import fetch from "node-fetch";

interface ProductData {
  title: string;
  imageUrl: string;
  imageBuffer: Buffer;
  siltecLogoBuffer: Buffer;
  pageUrl: string;
  brand: string;
}

// Function to generate the PDF file
function generatePDF(productData: ProductData): any {
  // Create a new PDF document
  const doc = new PDFDocument();
  doc.pipe(
    fs.createWriteStream(`${productData.title.split(" ").join("_")}.pdf`)
  );

  // Add dynamic content to the PDF document
  doc.font("Helvetica-Bold").fontSize(20).text("Siltec mobilier", {
    align: "center",
  });
  doc
    .font("Helvetica")
    .fontSize(12)
    .text("Spécialiste de l'ameublement hotellerie, residentiel, bureaux.", {
      align: "center",
    });
  doc.moveDown(2);
  doc.image(productData.imageBuffer, {
    width: 300,
    align: "center",
  });
  doc.moveDown(2);
  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text(productData.title.toUpperCase(), {
      link: `https://siltec.vercel.app${productData.pageUrl}`,
    });
  doc.font("Helvetica").text(productData.brand.toUpperCase());
  doc.moveDown(2);
  doc.image(productData.siltecLogoBuffer, { width: 50 });
  doc
    .fontSize(12)
    .text("51 rue de Miromesnil, 75008 Paris", { align: "right" });
  doc.text("Mail: contact@siltec-mobilier.com", { align: "right" });
  doc.text("Tel: +33 1 42 66 09 13", { align: "right" });

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
  const siltecLogoBuffer = await siltecLogoResponse.buffer();

  const productData: ProductData = {
    title: req.query.title as string,
    brand: req.query.brand as string,
    pageUrl: req.query.pageUrl as string,
    imageUrl,
    imageBuffer,
    siltecLogoBuffer,
  };

  // Generate the PDF document
  const pdfStream = generatePDF(productData);

  // Set the response headers for a PDF file
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=product.pdf");

  // Pipe the PDF stream to the response
  pdfStream.pipe(res);
}
