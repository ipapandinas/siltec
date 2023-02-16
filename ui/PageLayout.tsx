import { Typography } from "@mui/material";

import Container from "./Container";

export default function PageLayout(props: {
  title?: string;
  children: any;
  large?: boolean;
  width?: string;
}) {
  const { children, title, large, width } = props;
  return (
    <Container width={width}>
      {title && (
        <Typography
          fontSize="4rem"
          component={"h1"}
          fontWeight={"bold"}
          mb="1.6rem"
          position="relative"
        >
          {title}
        </Typography>
      )}
      {children}
    </Container>
  );
}
