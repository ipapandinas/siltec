import Link from "next/link";
import {
  Link as MuiLink,
  LinkProps as MuiLinkProps,
  useTheme,
} from "@mui/material";

interface Props extends MuiLinkProps {
  useComponent?: string;
}

export default function AppLink(props: Props) {
  const theme = useTheme();
  const propsCopy = { ...props };
  delete propsCopy.useComponent;
  return (
    <MuiLink
      {...propsCopy}
      component={props.useComponent ? (props.useComponent as any) : Link}
      sx={{
        textDecoration: "none",
        color: theme.palette.text.primary,
        "& div": { color: theme.palette.text.primary },
        ...propsCopy.sx,
      }}
    >
      {props.children}
    </MuiLink>
  );
}
