"use client";

import { Box, IconButton, Typography } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ReactMarkdown from "react-markdown";

import AppImage from "#/ui/AppImage";
import AppLink from "#/ui/AppLink";

import map from "../../public/assets/maps.png";

const ContactItem = (props: {
  ariaLabel: string;
  link?: string;
  text: string;
  children: any;
  padding?: string;
}) => {
  const { ariaLabel, link, text, children, padding } = props;

  if (!link)
    return (
      <IconButton
        aria-label={ariaLabel}
        disabled
        component="label"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1.6rem",
          bgcolor: "white !important",
          borderRadius: "0.8rem",
          width: "fit-content",
          marginTop: "0.8rem",
          marginRight: "1.2rem",
          path: { fill: "#010101" },
        }}
      >
        {children}
        <Typography>{text}</Typography>
      </IconButton>
    );

  return (
    <AppLink href={link} target={"_blank"} rel="noreferrer">
      <IconButton
        aria-label={ariaLabel}
        component="label"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1.6rem",
          bgcolor: "white",
          borderRadius: "0.8rem",
          width: "fit-content",
          marginTop: "0.8rem",
          marginRight: "1.2rem",
          path: { fill: "#010101" },
        }}
      >
        {children}
        <Typography>{text}</Typography>
      </IconButton>
    </AppLink>
  );
};

export default function Content() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "center",
          gap: "5.6rem",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", lg: "850px" },
            margin: "0 auto",
            h1: {
              marginBottom: "1.6rem",
              textAlign: { xs: "center", lg: "justify" },
            },
            h2: {
              marginBottom: "1.6rem",
              textAlign: { xs: "center", lg: "justify" },
            },
            p: { textAlign: "justify", textJustify: "inter-word" },
          }}
        >
          <ReactMarkdown>
            {"# CONTACT\n" +
              "\n" +
              "## Visitez notre show room\n" +
              "\n" +
              "Architectes, professionnels ou particuliers, nous vous accueillons dans notre show room du lundi au vendredi, de 9 heures à 18 heures, de préférence sur rendez-vous. Loin d'être un catalogue à ciel ouvert, cet espace d'accueil invite à l'échange et à la réflexion autour d'une sélection de produits au sein d'une offre beaucoup plus vaste."}
          </ReactMarkdown>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ContactItem
            ariaLabel="Telephone Siltec"
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
      <Box
        marginTop="12rem"
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          img: { width: { xs: "100%", lg: "80%" }, height: "auto" },
        }}
      >
        <AppImage
          alt=""
          src={map}
          width={600}
          height={400}
          loadMode="lg"
          placeholder="blur"
        />
      </Box>
    </>
  );
}
