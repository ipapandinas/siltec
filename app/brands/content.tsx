"use client";

import { Grid, List, ListItemText, Typography } from "@mui/material";

import { IBrand } from "#/interfaces/IBrand";
import AppLink from "#/ui/AppLink";

interface Props {
  brands: IBrand[];
}

export default function Content({ brands }: Props) {
  const handleSort = () => {
    const sortedList = [...brands].sort((a, b) => a.nom.localeCompare(b.nom));

    const brandNamesByFirstLetter: { [key: string]: IBrand[] } = {};
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      brandNamesByFirstLetter[letter] = [];
    }

    sortedList.forEach((brand) => {
      const firstLetter = brand.nom.charAt(0).toUpperCase();
      if (!brandNamesByFirstLetter[firstLetter]) brandNamesByFirstLetter[firstLetter] = [];
      brandNamesByFirstLetter[firstLetter].push(brand);
    });

    return brandNamesByFirstLetter;
  };

  const groupedBrands = handleSort();

  return (
    <Grid container rowSpacing={12} columnSpacing={8}>
      {Object.entries(groupedBrands).map(([key, value]) => {
        if (value.length === 0) return null;

        return (
          <Grid
            key={key}
            size={{ xs: 6, md: 3 }}
            sx={{ display: "flex", gap: { xs: "1.6rem", lg: "4rem" } }}
          >
            <Typography variant="h3" sx={{ width: "4.8rem" }}>
              {key}
            </Typography>

            <List sx={{ paddingTop: "2.4rem" }}>
              {value.map((brand) => (
                <ListItemText key={brand.documentId}>
                  {brand.slug ? (
                    <AppLink href={`/b/${brand.slug}`}>
                      <Typography
                        variant="h6"
                        sx={{
                          ":first-letter": { textTransform: "capitalize" },
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {brand.nom}
                      </Typography>
                    </AppLink>
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{ ":first-letter": { textTransform: "capitalize" } }}
                    >
                      {brand.nom}
                    </Typography>
                  )}
                </ListItemText>
              ))}
            </List>
          </Grid>
        );
      })}
    </Grid>
  );
}
