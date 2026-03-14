import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  civilite?: unknown;
  prenom?: unknown;
  nom?: unknown;
  adresse?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  message?: unknown;
  website?: unknown;
};

type ValidContactPayload = {
  civilite: string;
  prenom: string;
  nom: string;
  adresse: string;
  email: string;
  phone: string;
  company: string;
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

const CIVILITE_OPTIONS = ["Monsieur", "Madame"];

function validatePayload(payload: ContactPayload): {
  values: ValidContactPayload;
  isValid: boolean;
} {
  const values: ValidContactPayload = {
    civilite: normalizeString(payload.civilite),
    prenom: normalizeString(payload.prenom),
    nom: normalizeString(payload.nom),
    adresse: normalizeString(payload.adresse),
    email: normalizeString(payload.email),
    phone: normalizeString(payload.phone),
    company: normalizeString(payload.company),
    message: normalizeString(payload.message),
    website: normalizeString(payload.website),
  };

  if (!values.civilite || !CIVILITE_OPTIONS.includes(values.civilite)) {
    return { values, isValid: false };
  }

  if (!values.prenom || values.prenom.length < 2) {
    return { values, isValid: false };
  }

  if (!values.nom || values.nom.length < 2) {
    return { values, isValid: false };
  }

  if (!values.adresse || values.adresse.length < 5) {
    return { values, isValid: false };
  }

  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return { values, isValid: false };
  }

  if (values.phone && !/^[+()\d\s-]{6,}$/.test(values.phone)) {
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
  const safeIdentity = sanitizeHeaderValue(
    `${values.civilite} ${values.prenom} ${values.nom}`
  );

  return {
    subject: safeIdentity
      ? `Nouveau message contact: ${safeIdentity}`
      : "Nouveau message contact",
    text: [
      "Nouveau message depuis le formulaire de contact Siltec.",
      "",
      `Civilité: ${values.civilite}`,
      `Prénom: ${values.prenom}`,
      `Nom: ${values.nom}`,
      `Adresse: ${values.adresse}`,
      `Email: ${values.email}`,
      `Téléphone: ${values.phone || "Non renseigné"}`,
      `Société: ${values.company || "Non renseignée"}`,
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
