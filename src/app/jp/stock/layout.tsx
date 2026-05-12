import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stock voitures Japon — Nos annonces import JDM",
  description:
    "Parcourez notre stock de véhicules importés directement du Japon. Voitures JDM disponibles et vendues, feuille de cote, inspection et traçabilité complète. Luxembourg.",
  keywords: ["stock voitures japon luxembourg", "annonces JDM luxembourg", "voitures japonaises disponibles", "acheter voiture japon luxembourg"],
  openGraph: {
    title: "Stock voitures Japon — MYG Import Luxembourg",
    description: "Notre sélection de véhicules importés du Japon. JDM disponibles et vendus, avec traçabilité complète.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
