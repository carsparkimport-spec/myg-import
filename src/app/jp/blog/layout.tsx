import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog – Conseils Import Auto Japon",
  description:
    "Guides et conseils pour réussir l'importation de votre véhicule depuis le Japon : lecture des feuilles de cote, inspection SS, Shaken, enchères USS, TAA.",
  keywords: [
    "blog import auto japon",
    "guide importation japon",
    "feuille de cote japon explications",
    "inspection SS japon",
    "shaken japon contrôle technique",
    "enchères USS TAA JU",
  ],
  openGraph: {
    title: "Blog Import Auto Japon – MYG Import",
    description:
      "Tous les conseils pour importer votre voiture depuis le Japon. Feuilles de cote, inspection, enchères expliqués simplement.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
