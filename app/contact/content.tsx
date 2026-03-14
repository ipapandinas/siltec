"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

import { darken } from "@mui/material/styles";

import AppLink from "#/ui/AppLink";

type FormValues = {
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

type FormErrors = Partial<Record<keyof FormValues, string>>;

type VisibleFieldName = Exclude<keyof FormValues, "website">;

type FieldConfig = {
  name: VisibleFieldName;
  placeholder: string;
  required?: boolean;
  type?: "text" | "email" | "tel";
  multiline?: boolean;
  rows?: number;
  width?: "full" | "half";
};

type Props = {
  buttonColor?: string | null;
};

const INITIAL_VALUES: FormValues = {
  civilite: "",
  prenom: "",
  nom: "",
  adresse: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  website: "",
};

const CIVILITE_OPTIONS: FormValues["civilite"][] = ["Monsieur", "Madame"];

const FORM_FIELDS: FieldConfig[] = [
  { name: "prenom", placeholder: "prénom*", required: true, width: "half" },
  { name: "nom", placeholder: "nom*", required: true, width: "half" },
  { name: "email", placeholder: "email*", required: true, type: "email", width: "full" },
  { name: "adresse", placeholder: "adresse*", required: true, width: "full" },
  { name: "phone", placeholder: "téléphone", type: "tel", width: "half" },
  { name: "company", placeholder: "société", width: "half" },
  {
    name: "message",
    placeholder: "message*",
    required: true,
    multiline: true,
    rows: 6,
    width: "full",
  },
];

const ContactItem = (props: {
  ariaLabel: string;
  link?: string;
  text: string;
  children: React.ReactNode;
}) => {
  const { ariaLabel, link, text, children } = props;

  if (!link) {
    return (
      <IconButton
        aria-label={ariaLabel}
        disabled
        component="label"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "1.2rem",
          bgcolor: "white !important",
          borderRadius: "0.8rem",
          width: "fit-content",
          maxWidth: "100%",
          mt: "0.8rem",
          mr: "1.2rem",
          p: "1rem 1.2rem",
          path: { fill: "#010101" },
        }}
      >
        {children}
        <Typography>{text}</Typography>
      </IconButton>
    );
  }

  return (
    <AppLink href={link} target={"_blank"} rel="noreferrer">
      <IconButton
        aria-label={ariaLabel}
        component="label"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "1.2rem",
          bgcolor: "white",
          borderRadius: "0.8rem",
          width: "fit-content",
          maxWidth: "100%",
          mt: "0.8rem",
          mr: "1.2rem",
          p: "1rem 1.2rem",
          path: { fill: "#010101" },
        }}
      >
        {children}
        <Typography>{text}</Typography>
      </IconButton>
    </AppLink>
  );
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.civilite.trim()) {
    errors.civilite = "La civilité est requise.";
  } else if (!CIVILITE_OPTIONS.includes(values.civilite)) {
    errors.civilite = "Merci de sélectionner Monsieur ou Madame.";
  }

  if (!values.prenom.trim()) {
    errors.prenom = "Le prénom est requis.";
  } else if (values.prenom.trim().length < 2) {
    errors.prenom = "Le prénom doit contenir au moins 2 caractères.";
  }

  if (!values.nom.trim()) {
    errors.nom = "Le nom est requis.";
  } else if (values.nom.trim().length < 2) {
    errors.nom = "Le nom doit contenir au moins 2 caractères.";
  }

  if (!values.adresse.trim()) {
    errors.adresse = "L’adresse est requise.";
  } else if (values.adresse.trim().length < 5) {
    errors.adresse = "L’adresse doit contenir au moins 5 caractères.";
  }

  const email = values.email.trim();

  if (!email) {
    errors.email = "L’email est requis.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Merci d’indiquer un email valide.";
  }

  if (values.phone.trim() && !/^[+()\d\s-]{6,}$/.test(values.phone.trim())) {
    errors.phone = "Merci d’indiquer un numéro valide.";
  }

  if (!values.message.trim()) {
    errors.message = "Le message est requis.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Le message doit contenir au moins 10 caractères.";
  }

  return errors;
}

const DEFAULT_SEND_BUTTON_COLOR = "#A2B39B";

function isHexColor(value: string): boolean {
  return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value);
}

export default function Content({ buttonColor }: Props) {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const isSubmitting = status === "submitting";
  const theme = useTheme();
  const normalizedButtonColor = (buttonColor ?? "").trim();
  const sendButtonColor = isHexColor(normalizedButtonColor)
    ? normalizedButtonColor
    : DEFAULT_SEND_BUTTON_COLOR;
  const sendButtonHoverColor = darken(sendButtonColor, 0.2);
  const sendButtonTextColor = theme.palette.getContrastText(sendButtonColor);
  const sendButtonHoverTextColor = theme.palette.getContrastText(
    sendButtonHoverColor
  );

  const onChange = (name: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });

    if (status === "success" || status === "error") {
      setStatus("idle");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setErrors({});
      setValues(INITIAL_VALUES);
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) minmax(0, 2fr)" },
          gap: { xs: "3.2rem", lg: "12rem" },
          alignItems: { xs: "start", lg: "stretch" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            pt: { xs: 0, lg: "10rem" },
          }}
        >
          <Typography sx={{ textAlign: "justify", textJustify: "inter-word" }}>
            Pour une demande générale, veuillez utiliser le formulaire ci-joint.
            Nous y répondrons dans les plus brefs délais.
          </Typography>

          <Typography sx={{ mt: "2.4rem", textAlign: "justify", textJustify: "inter-word" }}>
            Nous vous accueillons dans notre showroom du lundi au vendredi,
            de 9h à 18h, de préférence sur rendez-vous, pour découvrir une
            sélection de mobilier et échanger sur votre projet.
          </Typography>

          <Box
            sx={{
              mt: { xs: "4rem" },
              pt: { xs: 0, lg: "1rem" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ContactItem
              ariaLabel="Adresse Siltec"
              text="51 rue de Miromesnil, 75008 Paris"
            >
              <FmdGoodIcon />
            </ContactItem>
            <ContactItem
              ariaLabel="Mail Siltec"
              text="info@siltec-mobilier.com"
              link="mailto:info@siltec-mobilier.com"
            >
              <MailIcon />
            </ContactItem>
            <ContactItem
              ariaLabel="Telephone Siltec"
              text="+ 33 1 42 66 09 13"
              link="tel:+33142660913"
            >
              <PhoneIcon />
            </ContactItem>
          </Box>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Typography
            variant="h4"
            sx={{
              mb: "2.4rem",
              textAlign: { xs: "center", lg: "left" },
              fontWeight: 100,
              fontStretch: "normal",
              fontStyle: "normal",
              letterSpacing: "0.58px",
            }}
          >
            Envoyez-nous un message
          </Typography>

          <Box
            sx={{
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              border: 0,
            }}
            aria-hidden="true"
          >
            <Box
              component="input"
              tabIndex={-1}
              autoComplete="off"
              placeholder="site web"
              value={values.website}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onChange("website", event.target.value)
              }
              name="website"
            />
          </Box>

          <FormControl error={Boolean(errors.civilite)} sx={{ mb: "1.6rem" }}>
            <FormLabel
              sx={{
                color: "#546360",
                fontSize: "1.4rem",
                letterSpacing: "0.56px",
                "&.Mui-focused": { color: "#010101" },
              }}
            >
              civilité*
            </FormLabel>
            <RadioGroup
              row
              name="civilite"
              value={values.civilite}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onChange("civilite", event.target.value)
              }
              sx={{ mt: "0.4rem", gap: "0.8rem" }}
            >
              {CIVILITE_OPTIONS.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio size="small" />}
                  label={option}
                  sx={{ mr: "2rem" }}
                />
              ))}
            </RadioGroup>
            {errors.civilite && (
              <Typography
                variant="body2"
                sx={{ color: "error.main", mt: "0.4rem", fontSize: "1.2rem" }}
              >
                {errors.civilite}
              </Typography>
            )}
          </FormControl>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
              gap: "1.6rem",
            }}
          >
            {FORM_FIELDS.map((field) => {
              const isTextarea = Boolean(field.multiline);

              return (
                <Box
                  key={field.name}
                  sx={{
                    gridColumn:
                      field.width === "full" ? "1 / -1" : { xs: "1 / -1", md: "auto" },
                  }}
                >
                  <Box
                    component={isTextarea ? "textarea" : "input"}
                    name={field.name}
                    type={isTextarea ? undefined : field.type ?? "text"}
                    value={values[field.name]}
                    placeholder={field.placeholder}
                    rows={isTextarea ? field.rows : undefined}
                    onChange={
                      isTextarea
                        ? (event: React.ChangeEvent<HTMLTextAreaElement>) =>
                            onChange(field.name, event.target.value)
                        : (event: React.ChangeEvent<HTMLInputElement>) =>
                            onChange(field.name, event.target.value)
                    }
                    sx={{
                      fontFamily: '"Helvetica Neue LT W05 45 Light", sans-serif',
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      boxShadow: "none",
                      border: "none",
                      borderRadius: 0,
                      borderBottom: `2px solid ${errors[field.name] ? "#d32f2f" : "#546360"}`,
                      outline: "none",
                      width: "100%",
                      height: isTextarea ? "auto" : "40px",
                      minHeight: isTextarea ? "140px" : "40px",
                      backgroundColor: "#f0edeb",
                      padding: isTextarea ? "10px" : "0 10px 20px",
                      fontSize: "14px",
                      letterSpacing: "0.56px",
                      lineHeight: "1.4",
                      resize: isTextarea ? "vertical" : "none",
                      "&:focus": {
                        borderBottomColor: "#010101",
                      },
                      "&::placeholder": {
                        color: "#546360",
                        opacity: 1,
                      },
                    }}
                    aria-label={field.placeholder}
                    required={field.required}
                  />

                  {errors[field.name] && (
                    <Typography
                      variant="body2"
                      sx={{ color: "error.main", mt: "0.4rem", fontSize: "1.2rem" }}
                    >
                      {errors[field.name]}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>

          {status === "success" && (
            <Alert severity="success" sx={{ mt: "1.6rem" }}>
              Merci, votre message a bien été envoyé. Nous vous répondrons rapidement.
            </Alert>
          )}

          {status === "error" && (
            <Alert severity="error" sx={{ mt: "1.6rem" }}>
              Une erreur est survenue lors de l’envoi. Merci de réessayer dans un instant.
            </Alert>
          )}

          <Button
            disableElevation
            color="secondary"
            size="large"
            variant="contained"
            type="submit"
            disabled={isSubmitting}
            sx={{
              mt: "3.2rem",
              backgroundColor: sendButtonColor,
              color: sendButtonTextColor,
              "&:hover": {
                backgroundColor: sendButtonHoverColor,
                color: sendButtonHoverTextColor,
              },
            }}
          >
            {isSubmitting ? "Envoi..." : "Envoyer"}
          </Button>
        </Box>
      </Box>

      <Box marginTop="12rem" sx={{ maxWidth: "1000px", marginInline: "auto" }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            borderRadius: "0.8rem",
            overflow: "hidden",
            aspectRatio: "16 / 9",
            boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
          }}
        >
          <Box
            component="iframe"
            title="Plan Google Maps - Siltec"
            src="https://www.google.com/maps?q=51+rue+de+Miromesnil,+75008+Paris&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            allowFullScreen
          />
        </Box>
      </Box>
    </>
  );
}
