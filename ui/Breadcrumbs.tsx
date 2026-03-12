"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import AppLink from "./AppLink";


interface Props {
  list: {
    href: string;
    name?: string;
  }[];
  pageName: string;
}

export default function BasicBreadcrumbs({ list, pageName }: Props) {
  return (
    <div role="presentation">
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          ".MuiBreadcrumbs-separator": {
            opacity: 0.5,
          },
        }}
      >
        {list.map(({ href, name }, idx) => {
          if (!name) return;
          return (
            <AppLink
              key={idx}
              href={href}
              underline="hover"
              color="inherit"
              sx={{
                opacity: 0.6,
                fontWeight: 300,
              }}
            >
              {name}
            </AppLink>
          );
        })}
        <Typography color="text.primary" fontWeight={700}>
          {pageName}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
