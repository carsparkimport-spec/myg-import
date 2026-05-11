import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enchères Auto Japon – Comment Ça Marche",
  description:
    "Tout savoir sur les enchères automobiles japonaises avec MYG Import : feuilles de cote (USS, TAA, JU), niveaux d'inspection, offres d'achat et sécurité.",
  keywords: [
    "enchères auto japon",
    "enchères USS JAP",
    "feuille de cote japon",
    "inspection voiture japon",
    "acheter voiture enchères japon",
    "TAA JU USS enchères",
  ],
  openGraph: {
    title: "Enchères Auto Japon – MYG Import",
    description:
      "Participez aux enchères japonaises en toute sécurité. Feuilles de cote, inspection, achat accompagné depuis le Japon.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
