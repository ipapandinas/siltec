"use client";

import {
  Box,
  Divider as MUIDivider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";

import AppImage from "./AppImage";
import AppLink from "./AppLink";

const SocialButton = (props: {
  ariaLabel: string;
  link: string;
  children: any;
  padding?: string;
}) => {
  const { ariaLabel, link, children, padding } = props;
  return (
    <AppLink href={link} target={"_blank"} rel="noreferrer">
      <IconButton
        aria-label={ariaLabel}
        component="label"
        sx={{
          bgcolor: "white",
          borderRadius: "0.8rem",
          height: "5.4rem",
          width: "5.4rem",
          marginTop: "0.8rem",
          marginRight: "1.2rem",
          padding,
          path: { fill: "#010101" },
        }}
      >
        {children}
      </IconButton>
    </AppLink>
  );
};

const Divider = () => {
  return (
    <MUIDivider
      sx={{
        margin: "auto",
        width: "85%",
        borderColor: "#010101",
        paddingTop: "40px",
        marginBottom: "20px",
        opacity: "50%",
      }}
    />
  );
};

const SiteMap = () => {
  return (
    <Box sx={{ paddingTop: "20px", textAlign: "center", width: "300px" }}>
      <SiteMapItem text="Collections" link="/collections" />
      <SiteMapItem text="Réalisations" link="/projects" />
      <SiteMapItem text="Qui sommes-nous?" link="/about" />
      <SiteMapItem text="Actualités" link="/news" />
      <SiteMapItem text="Contact" link="/contact" />
      <SiteMapItem text="Nos marques" link="/brands" />
    </Box>
  );
};

const SiteMapItem = (props: { text: string; link: string }) => {
  const { link, text } = props;
  return (
    <AppLink href={link}>
      <Typography
        marginBottom={"16px"}
        sx={{ cursor: "pointer", ":hover": { fontWeight: "bold" } }}
      >
        {text}
      </Typography>
    </AppLink>
  );
};

export default function Footer() {
  const theme = useTheme();
  return (
    <Box component="footer" bgcolor={theme.palette.background.default}>
      <Box
        color={theme.palette.primary.main}
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          position: "relative",
          maxWidth: "1440px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "85%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              flexDirection: "column",
              paddingTop: "20px",
            }}
          >
            <Typography
              component={"div"}
              variant={"h6"}
              sx={{ marginY: "8px", fontWeight: "bold" }}
            >
              Nos contacts
            </Typography>
            <Box>
              <SocialButton
                ariaLabel="Pinterest Siltec"
                link="https://www.pinterest.com/siltec/"
              >
                <PinterestIcon />
              </SocialButton>
              <SocialButton
                ariaLabel="Instagram Siltec"
                link="https://www.instagram.com/siltecmobilier"
              >
                <InstagramIcon />
              </SocialButton>
              <SocialButton
                ariaLabel="Mail Siltec"
                link="mailto:info@siltec-mobilier.com"
              >
                <MailIcon />
              </SocialButton>
              <SocialButton
                ariaLabel="Telephone Siltec"
                link="tel:+33142660913"
              >
                <PhoneIcon />
              </SocialButton>
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "flex-start" },
              justifyContent: "space-around",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                paddingTop: "2.4rem",
                marginBottom: { xs: "1.6rem", sm: 0 },
              }}
            >
              <AppLink href="/" title="Page d'accueil">
                <AppImage
                  alt="Siltec logo"
                  src="/siltec.svg"
                  width={90}
                  height={45}
                />
              </AppLink>
              <Typography variant="body1" maxWidth="24rem" marginTop="1.6rem">
                {
                  "Spécialiste de l'ameublement, hotellerie, residentiel, bureaux."
                }
              </Typography>
            </Box>
            <SiteMap />
          </Box>
          <Divider />
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "2.4rem",
              marginBottom: "2.4rem",
              flexWrap: "wrap",
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontSize: "1.2rem", marginY: "1.2rem" }}>
              © {new Date().getFullYear().toString()} - Siltec
            </Typography>
            <AppLink
              aria-label="Mentions légales"
              href="/misc/tos"
              title="Mentions légales"
            >
              <Typography sx={{ fontSize: "1.2rem", cursor: "pointer" }}>
                Mentions légales
              </Typography>
            </AppLink>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
