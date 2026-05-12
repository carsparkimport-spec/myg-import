import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enchères auto Japon — Comment ça marche",
  description:
    "Tout savoir sur les enchères automobiles japonaises : USS, TAA, JU, niveaux d'inspection (3, 3.5, 4, 4.5, 5), feuilles de cote, offres d'achat. MYG Import vous guide.",
  keywords: ["enchères auto japon", "USS TAA JU enchères japon", "feuille de cote japon", "inspection voiture japon", "acheter voiture enchères japon"],
  openGraph: {
    title: "Enchères auto Japon — MYG Import",
    description: "Participez aux enchères japonaises en sécurité. Feuilles de cote, niveaux d'inspection, achat accompagné.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
