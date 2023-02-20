"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import AppLink from "./AppLink";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

interface Props {
  list: {
    href: string;
    name?: string;
  }[];
  pageName: string;
}

export default function BasicBreadcrumbs({ list, pageName }: Props) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {list.map(({ href, name }, idx) => {
          if (!name) return;
          return (
            <AppLink key={idx} href={href} underline="hover" color="inherit">
              {name}
            </AppLink>
          );
        })}
        <Typography color="text.primary">{pageName}</Typography>
      </Breadcrumbs>
    </div>
  );
}
