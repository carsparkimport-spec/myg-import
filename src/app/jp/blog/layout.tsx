import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog import auto Japon — Guides & conseils MYG Import",
  description:
    "Guides pratiques pour importer votre voiture depuis le Japon : lire une feuille de cote, comprendre le Shaken, décrypter les enchères USS. Conseils d'experts.",
  keywords: ["blog import auto japon", "guide feuille de cote japon", "shaken contrôle technique japon", "enchères USS TAA explications"],
  openGraph: {
    title: "Blog import auto Japon — MYG Import",
    description: "Tous les conseils pour importer votre voiture depuis le Japon. Feuilles de cote, enchères, inspection expliqués.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
