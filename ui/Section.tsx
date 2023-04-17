"use client";

import {
  Box,
  BoxProps as MuiBoxProps,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import AppLink from "./AppLink";

import Container from "./Container";

interface Props extends MuiBoxProps {
  containerId?: string;
  title?: string;
  description?: string;
  href?: string;
  children: any;
}

export default function Section(props: Props) {
  const { children, containerId, description, href, title } = props;
  const propsCopy = { ...props };
  const theme = useTheme();

  return (
    <Container
      id={containerId}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...propsCopy.sx,
      }}
    >
      {(title || description) && (
        <Box
          mb="8rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="1.6rem"
        >
          {title && (
            <Typography
              textAlign="center"
              textTransform="uppercase"
              variant="h2"
            >
              {title}
            </Typography>
          )}
          {description && (
            <Typography
              m="0 auto"
              maxWidth="66%"
              textAlign="center"
              variant="body1"
            >
              {description}
            </Typography>
          )}
        </Box>
      )}
      {children}
      {href !== undefined && (
        <AppLink aria-label={title} href={href} title={title}>
          <Button
            disableElevation
            color="secondary"
            size="large"
            variant="contained"
            sx={{
              marginTop: "4rem",
              backgroundColor: "#A2B39B",
              color: "#010101",
              "&:hover": {
                backgroundColor: "#717e6c",
                color: "#fff",
              },
            }}
          >
            Voir plus
          </Button>
        </AppLink>
      )}
    </Container>
  );
}
