"use client";

import {
  Box,
  BoxProps as MuiBoxProps,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { darken } from "@mui/material/styles";
import AppLink from "./AppLink";

import Container from "./Container";

interface Props extends MuiBoxProps {
  buttonColor?: string;
  containerId?: string;
  title?: string;
  description?: string;
  href?: string;
  children: any;
}

export default function Section(props: Props) {
  const { buttonColor, children, containerId, description, href, title } = props;
  const propsCopy = { ...props };
  const theme = useTheme();

  const resolvedButtonColor = buttonColor || "#A2B39B";
  const resolvedButtonHoverColor = buttonColor
    ? darken(resolvedButtonColor, 0.2)
    : "#717e6c";
  const resolvedButtonTextColor = theme.palette.getContrastText(resolvedButtonColor);
  const resolvedButtonHoverTextColor = theme.palette.getContrastText(
    resolvedButtonHoverColor
  );

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
              backgroundColor: resolvedButtonColor,
              color: resolvedButtonTextColor,
              "&:hover": {
                backgroundColor: resolvedButtonHoverColor,
                color: resolvedButtonHoverTextColor,
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
