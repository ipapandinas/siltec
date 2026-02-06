import { NextApiRequest, NextApiResponse } from "next";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs/promises";

async function readPublicFile(relPath: string) {
  const filePath = path.join(process.cwd(), "public", relPath);
  return await fs.readFile(filePath);
}

const getStringParam = (value: string | string[] | undefined): string =>
    typeof value === "string" ? value.trim() : "";

const isAllowedImageHost = (urlString: string): boolean => {
  try {
    const parsedUrl = new URL(urlString);
    return parsedUrl.hostname === "res.cloudinary.com";
  } catch {
    return false;
  }
};

const isAllowedRequestOrigin = (req: NextApiRequest) => {
  const origin = req.headers.origin;
  const referer = req.headers.referer;

  const allowed = [
    "http://localhost:3000",
    "https://siltec.vercel.app",
    "https://www.siltec-mobilier.com",
    "http://www.siltec-mobilier.com",
  ];

  if (typeof origin === "string") return allowed.some((a) => origin.startsWith(a));
  if (typeof referer === "string") return allowed.some((a) => referer.startsWith(a));
  return false;
};

interface ProductData {
  title: string;
  imageUrl: string;
  imageBuffer: Buffer;
  siltecLogoBuffer: Buffer;
  cLogoBuffer: Buffer;
  pageUrl: string;
  brand: string;
}

function generatePDF(productData: ProductData): PDFKit.PDFDocument {
  const doc = new PDFDocument();

  doc.image(productData.siltecLogoBuffer, { fit: [470, 50], align: "center", valign: "center" });
  doc.moveDown(1);

  doc.image(productData.imageBuffer, { fit: [470, 300], align: "center", valign: "center" });
  doc.moveDown(1);

  doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .fillColor("#0c3e4b")
      .text(productData.title.toUpperCase(), {
        link: `https://siltec.vercel.app${productData.pageUrl}`,
        align: "center",
      });

  doc.font("Helvetica-Bold").fillColor("#0c3e4b").text(productData.brand.toUpperCase(), { align: "center" });

  doc.moveDown(6);

  doc.image(productData.cLogoBuffer, { fit: [470, 50], align: "center", valign: "center" });
  doc.moveDown(0.5);

  doc.font("Helvetica").fontSize(12).fillColor("#0c3e4b").text("51 rue de Miromesnil, 75008 Paris", { align: "center" });
  doc.font("Helvetica").fillColor("#0c3e4b").text("info@siltec-mobilier.com", { align: "center" });
  doc.font("Helvetica").fillColor("#0c3e4b").text("Tel: +33 1 42 66 09 13", { align: "center" });

  doc.end();
  return doc;
}

// helpful: make sure imageUrl is properly encoded on the client
const safeDecode = (s: string) => {
  try { return decodeURIComponent(s); } catch { return s; }
};

async function fetchBuffer(url: string, label: string) {
  const started = Date.now();
  const res = await fetch(url, { redirect: "follow" });
  const ms = Date.now() - started;

  const contentType = res.headers.get("content-type") || "";
  console.log(`[download-pdf] fetched ${label}`, { url, status: res.status, ms, contentType });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`${label} fetch failed: ${res.status} ${res.statusText} body="${body.slice(0, 200)}"`);
  }

  const buf = Buffer.from(await res.arrayBuffer());
  return { buf, contentType };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const reqId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  // log the incoming request (but don’t print huge query strings)
  console.log(`[download-pdf:${reqId}] start`, {
    method: req.method,
    origin: req.headers.origin,
    referer: req.headers.referer,
    queryKeys: Object.keys(req.query),
  });

  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const title = getStringParam(req.query.title);
    const brand = getStringParam(req.query.brand);
    const pageUrl = getStringParam(req.query.pageUrl);

    // imageUrl is special: it can contain encoded characters
    const rawImageUrl = getStringParam(req.query.imageUrl);
    const imageUrl = safeDecode(rawImageUrl);

    if (!title || !brand || !imageUrl || !pageUrl) {
      console.warn(`[download-pdf:${reqId}] missing params`, { title: !!title, brand: !!brand, imageUrl: !!imageUrl, pageUrl: !!pageUrl });
      return res.status(400).json({ error: "Missing required parameters" });
    }

    let parsedImageUrl: URL;
    try {
      parsedImageUrl = new URL(imageUrl);
    } catch {
      console.warn(`[download-pdf:${reqId}] invalid imageUrl`, { imageUrl });
      return res.status(400).json({ error: "Invalid image URL" });
    }

    if (parsedImageUrl.protocol !== "https:") {
      return res.status(400).json({ error: "Only https image URLs are allowed" });
    }

    if (!isAllowedImageHost(imageUrl)) {
      console.warn(`[download-pdf:${reqId}] image host not allowed`, { host: parsedImageUrl.hostname });
      return res.status(403).json({ error: "Image host not allowed" });
    }

    if (!isAllowedRequestOrigin(req)) {
      console.warn(`[download-pdf:${reqId}] forbidden origin`, { origin: req.headers.origin, referer: req.headers.referer });
      return res.status(403).json({ error: "Forbidden" });
    }

    // Fetch assets with logging + status checks
    const image = await fetchBuffer(parsedImageUrl.toString(), "product-image");

    // Validate content type (Cloudinary sometimes returns HTML error pages)
    if (!image.contentType.startsWith("image/")) {
      throw new Error(`product-image is not an image. content-type="${image.contentType}"`);
    }

    // const siltecLogo = await fetchBuffer("https://siltec.vercel.app/siltec.jpg", "siltec-logo");
    // const cLogo = await fetchBuffer("https://siltec.vercel.app/android-chrome-192x192.png", "c-logo");
    const siltecLogoBuffer = await readPublicFile("siltec.jpg");
    const cLogoBuffer = await readPublicFile("android-chrome-192x192.png");

    const productData: ProductData = {
      title,
      brand,
      pageUrl,
      imageUrl,
      imageBuffer: image.buf,
      siltecLogoBuffer,
      cLogoBuffer,
    };

    const pdfStream = generatePDF(productData);

    // Stream error handling (this is a big one for mysterious 500s)
    pdfStream.on("error", (e) => {
      console.error(`[download-pdf:${reqId}] pdf stream error`, e);
      if (!res.headersSent) res.status(500).json({ error: "PDF generation failed" });
      else res.end();
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="product.pdf"');

    pdfStream.pipe(res);

    console.log(`[download-pdf:${reqId}] done`);
  } catch (err: any) {
    console.error(`[download-pdf:${reqId}] 500`, {
      message: err?.message,
      stack: err?.stack,
      name: err?.name,
    });

    // Avoid sending huge internal details to the client; but give something helpful in dev
    return res.status(500).json({
      error: "Internal Server Error",
      detail: process.env.NODE_ENV === "development" ? err?.message : undefined,
      reqId,
    });
  }
}
