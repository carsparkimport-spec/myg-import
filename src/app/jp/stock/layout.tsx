import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stock Véhicules Japon – Nos Annonces Import JP",
  description:
    "Découvrez notre sélection de véhicules importés directement du Japon. Voitures japonaises disponibles et vendues, avec feuille de cote, inspection et traçabilité complète.",
  keywords: [
    "stock voitures japon luxembourg",
    "annonces import japon",
    "voitures japonaises disponibles",
    "acheter voiture japon luxembourg",
    "JDM occasion luxembourg",
  ],
  openGraph: {
    title: "Stock Véhicules Japon – MYG Import",
    description:
      "Parcourez notre stock de véhicules importés du Japon. Disponibles et vendus, avec traçabilité complète.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
