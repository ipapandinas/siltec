"use client";

import { Grid, List, ListItemText, Typography } from "@mui/material";

import { IBrand } from "#/interfaces/IBrand";

interface Props {
  brands: IBrand[];
}

export default function Content({ brands }: Props) {
  const handleSort = () => {
    const sortedList = brands
      .sort((a, b) => a.attributes.nom.localeCompare(b.attributes.nom))
      .map(({ attributes }) => attributes.nom);

    const brandNamesByFirstLetter: { [key: string]: string[] } = {};
    for (let i = 38; i <= 90; i++) {
      // ASCII codes for A to Z
      const letter = String.fromCharCode(i);
      brandNamesByFirstLetter[letter] = [];
    }

    sortedList.forEach((name) => {
      const firstLetter = name.charAt(0).toUpperCase();
      brandNamesByFirstLetter[firstLetter].push(name);
    });

    return brandNamesByFirstLetter;
  };

  return (
    <Grid container rowSpacing={12} columnSpacing={4}>
      {Object.entries(handleSort()).map(([key, value]) => {
        if (value.length === 0) return;

        return (
          <Grid
            key={key}
            item
            xs={12}
            sm={6}
            md={3}
            sx={{ display: "flex", gap: "4rem" }}
          >
            <Typography
              variant="h3"
              sx={{
                width: "4.8rem",
              }}
            >
              {key}
            </Typography>
            <List sx={{ paddingTop: "2.4rem" }}>
              {value.map((name: string, idx: number) => (
                <ListItemText key={idx}>
                  <Typography
                    variant="h6"
                    sx={{
                      ":first-letter": {
                        textTransform: "capitalize",
                      },
                    }}
                  >
                    {name}
                  </Typography>
                </ListItemText>
              ))}
            </List>
          </Grid>
        );
      })}
    </Grid>
  );
}
