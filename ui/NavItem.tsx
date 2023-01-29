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
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "12rem",
            width: "12rem",
            background: color,
            borderRadius: "50%",
            position: "relative",
            padding: "2.4rem",
          }}
        >
          <Image
            alt={imageAlt}
            src={imageHref}
            width={imageWidth}
            height={imageHeight}
          />
        </Box>
        <Typography fontWeight="bold" textTransform="uppercase" variant="body1">
          {label}
        </Typography>
      </Box>
    </Link>
  );
}
