import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos de MYG Import",
  description:
    "Découvrez MYG Import, votre spécialiste en importation de véhicules depuis le Japon au Luxembourg. Notre équipe, notre philosophie, notre engagement pour la transparence.",
  openGraph: {
    title: "À Propos – MYG Import",
    description:
      "MYG Import, l'équipe luxembourgeoise passionnée d'automobiles japonaises. Notre histoire et nos valeurs.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
