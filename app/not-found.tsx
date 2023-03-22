"use client";

import AppLink from "#/ui/AppLink";

export default function NotFound() {
  return (
    <div style={{ marginTop: "8rem" }}>
      <div className="space-y-4 text-vercel-pink">
        <h2>La page recherche est introuvable</h2>

        <AppLink
          href="/"
          title="Page d'accueil"
          sx={{ textDecoration: "underline" }}
        >
          Retour à la page d&apos;accueil
        </AppLink>
      </div>
    </div>
  );
}
