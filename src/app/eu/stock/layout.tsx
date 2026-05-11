import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stock Véhicules Europe – Nos Annonces",
  description:
    "Parcourez notre sélection de véhicules européens disponibles à l'achat au Luxembourg. Voitures récentes, vérifiées, avec historique d'entretien.",
  keywords: [
    "stock voitures europe luxembourg",
    "annonces voiture occasion europe",
    "acheter voiture europe luxembourg",
    "véhicule occasion premium luxembourg",
  ],
  openGraph: {
    title: "Stock Véhicules Europe – MYG Import",
    description:
      "Sélection de véhicules européens vérifiés, disponibles au Luxembourg. Filtrez par disponibilité.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
