import Image from "next/image";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

interface IProps {
  color: string;
  href: string;
  imageAlt: string;
  imageHref: string;
  imageHeight: number;
  imageWidth: number;
  label: string;
  minimize: boolean;
  title: string;
}

export default function NavItem({
  color,
  href,
  imageAlt,
  imageHref,
  imageHeight,
  imageWidth,
  label,
  minimize,
  title,
}: IProps) {
  return (
    <Link href={href} title={title}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.6rem",
          width: "12rem",
        }}
      >
        <Box
          className={minimize ? "minimize" : ""}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: minimize ? "4rem" : "12rem",
            width: minimize ? "4rem" : "12rem",
            background: color,
            borderRadius: "50%",
            position: "relative",
            padding: "2.4rem",
            transition: "all 0.5s ease 0s",

            img: {
              width: minimize ? 0 : "initial",
              opacity: minimize ? 0 : 1,
              transition: "opacity 0.5s ease 0.5s, width 0s ease 0s",
            },

            ".minimize": {
              WebkitTransform: "scale(0.1)",
              msTransform: "scale(0.1)",
              transform: "scale(0.1)",
            },
          }}
        >
          {
            <Image
              className={minimize ? "minimize" : ""}
              alt={imageAlt}
              src={imageHref}
              width={imageWidth}
              height={imageHeight}
            />
          }
        </Box>
        <Typography
          fontWeight="bold"
          textTransform="uppercase"
          variant="body1"
          sx={{ whiteSpace: "nowrap" }}
        >
          {label}
        </Typography>
      </Box>
    </Link>
  );
}
