import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

type ValidContactPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  website: string;
};

function logWarn(message: string, meta?: unknown) {
  if (meta !== undefined) {
    console.warn(`[contact] ${message}`, meta);
    return;
  }

  console.warn(`[contact] ${message}`);
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validatePayload(payload: ContactPayload): {
  values: ValidContactPayload;
  isValid: boolean;
} {
  const values: ValidContactPayload = {
    name: normalizeString(payload.name),
    email: normalizeString(payload.email),
    phone: normalizeString(payload.phone),
    company: normalizeString(payload.company),
    subject: normalizeString(payload.subject),
    message: normalizeString(payload.message),
    website: normalizeString(payload.website),
  };

  if (!values.name || values.name.length < 2) {
    return { values, isValid: false };
  }

  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return { values, isValid: false };
  }

  if (values.phone && !/^[+()\d\s-]{6,}$/.test(values.phone)) {
    return { values, isValid: false };
  }

  if (!values.subject || values.subject.length < 2) {
    return { values, isValid: false };
  }

  if (!values.message || values.message.length < 10) {
    return { values, isValid: false };
  }

  return { values, isValid: true };
}

function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function buildEmail(values: ValidContactPayload): { subject: string; text: string } {
  const safeSubject = sanitizeHeaderValue(values.subject);

  return {
    subject: `Nouveau message contact: ${safeSubject}`,
    text: [
      "Nouveau message depuis le formulaire de contact Siltec.",
      "",
      `Nom: ${values.name}`,
      `Email: ${values.email}`,
      `Téléphone: ${values.phone || "Non renseigné"}`,
      `Société: ${values.company || "Non renseignée"}`,
      `Objet: ${values.subject}`,
      "",
      "Message:",
      values.message,
    ].join("\n"),
  };
}

export async function POST(request: NextRequest) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !contactToEmail || !contactFromEmail) {
    logWarn("Contact email env vars are not fully configured");
    return NextResponse.json(
      { success: false, message: "Service indisponible." },
      { status: 500 }
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Requête invalide." },
      { status: 400 }
    );
  }

  const { values, isValid } = validatePayload(payload);

  if (!isValid) {
    return NextResponse.json(
      { success: false, message: "Requête invalide." },
      { status: 400 }
    );
  }

  if (values.website) {
    logWarn("Honeypot triggered");
    return NextResponse.json({ success: true }, { status: 200 });
  }

  try {
    const resend = new Resend(resendApiKey);
    const email = buildEmail(values);

    await resend.emails.send({
      from: contactFromEmail,
      to: contactToEmail,
      subject: email.subject,
      text: email.text,
      replyTo: values.email,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    logWarn("Failed to send contact email");
    return NextResponse.json(
      {
        success: false,
        message: "Impossible d’envoyer votre message pour le moment.",
      },
      { status: 500 }
    );
  }
}
