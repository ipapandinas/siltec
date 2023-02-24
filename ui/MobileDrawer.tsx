import {
  Box,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import { useEffect } from "react";
import AppLink from "./AppLink";

const SocialIcon = (props: {
  ariaLabel?: string;
  children: any;
  link: string;
  size?: string;
}) => {
  const { ariaLabel, children, link, size } = props;
  return (
    <a href={link} target="_blank" rel="noreferrer" title={ariaLabel}>
      <IconButton
        aria-label={ariaLabel}
        sx={{
          width: size,
          height: size,
          path: { fill: "#010101" },
        }}
      >
        {children}
      </IconButton>
    </a>
  );
};

const MobileDrawerItem = (props: {
  link: string;
  children?: any;
  onClose: any;
  text?: string;
}) => {
  const { children, link, onClose, text } = props;

  return (
    <AppLink href={link}>
      <ListItem disablePadding>
        <ListItemButton
          onClick={onClose}
          sx={{
            paddingY: 0,
            height: "8rem",
            paddingX: "2.4rem",
          }}
        >
          {children && (
            <ListItemIcon sx={{ mr: "1.6rem" }}>{children}</ListItemIcon>
          )}
          {text && (
            <ListItemText>
              <Typography
                fontWeight="bold"
                textTransform="uppercase"
                variant="body1"
                sx={{ whiteSpace: "nowrap" }}
              >
                {text}
              </Typography>
            </ListItemText>
          )}
        </ListItemButton>
      </ListItem>
    </AppLink>
  );
};

export default function MobileDrawer(props: { open: boolean; onClose: any }) {
  const { open, onClose } = props;
  const theme = useTheme();

  useEffect(() => {
    const body = document.querySelector("html");
    if (body) {
      if (open) body.style.overflowY = "hidden";
      else body.style.overflowY = "auto";
    }
  }, [open]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ zIndex: theme.zIndex.appBar - 2 }}
      PaperProps={{
        sx: {
          width: "100% !important",
          display: "flex",
          justifyContent: "space-between",
        },
      }}
    >
      <Box
        sx={{
          marginTop: { xs: "12rem", sm: "18rem" },
          paddingBottom: "4rem",
        }}
      >
        <MobileDrawerItem
          onClose={onClose}
          text="Collections"
          link={`/collections`}
        >
          <Box
            sx={{
              height: "4rem",
              width: "4rem",
              background: theme.palette.primary.main,
              borderRadius: "50%",
            }}
          />
        </MobileDrawerItem>
        <MobileDrawerItem
          onClose={onClose}
          text="Réalisations"
          link={`/projects`}
        >
          <Box
            sx={{
              height: "4rem",
              width: "4rem",
              background: theme.palette.secondary.main,
              borderRadius: "50%",
            }}
          />
        </MobileDrawerItem>
        <MobileDrawerItem
          onClose={onClose}
          text="Qui sommes-nous?"
          link={`/about`}
        >
          <Box
            sx={{
              height: "4rem",
              width: "4rem",
              background: theme.palette.warning.main,
              borderRadius: "50%",
            }}
          />
        </MobileDrawerItem>
        <MobileDrawerItem onClose={onClose} text="Actualités" link={`/news`}>
          <Box
            sx={{
              height: "4rem",
              width: "4rem",
              background: theme.palette.secondary.light,
              borderRadius: "50%",
            }}
          />
        </MobileDrawerItem>
        <MobileDrawerItem onClose={onClose} text="Contact" link={`/contact`}>
          <Box
            sx={{
              height: "4rem",
              width: "4rem",
              background: theme.palette.primary.light,
              borderRadius: "50%",
            }}
          />
        </MobileDrawerItem>
      </Box>
      <Box
        sx={{
          borderTop: `${theme.palette.secondary.main} 8px solid`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: "6.4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "300px",
            width: "100%",
            margin: 0,
          }}
        >
          <SocialIcon
            ariaLabel="Pinterest Siltec"
            link="https://www.pinterest.com/siltec/"
          >
            <PinterestIcon />
          </SocialIcon>
          <SocialIcon
            ariaLabel="Instagram Siltec"
            link="https://www.instagram.com/siltecmobilier"
          >
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon
            ariaLabel="Mail Siltec"
            link="mailto:info@siltec-mobilier.com"
          >
            <MailIcon />
          </SocialIcon>
          <SocialIcon ariaLabel="Telephone Siltec" link="tel:+33142660913">
            <PhoneIcon />
          </SocialIcon>
        </Box>
      </Box>
    </Drawer>
  );
}
