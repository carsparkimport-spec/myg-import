import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stock véhicules Europe — Nos annonces premium",
  description:
    "Parcourez notre sélection de véhicules européens disponibles au Luxembourg. Voitures récentes, vérifiées, avec historique d'entretien complet.",
  keywords: ["voiture européenne occasion luxembourg", "annonces voiture premium luxembourg", "stock véhicules europe"],
  openGraph: {
    title: "Stock véhicules Europe — MYG Import Luxembourg",
    description: "Véhicules européens vérifiés, disponibles au Luxembourg. Filtrez par disponibilité.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
