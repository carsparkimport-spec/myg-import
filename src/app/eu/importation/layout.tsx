import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comment Importer une Voiture d'Europe",
  description:
    "Processus d'importation de véhicules européens expliqué étape par étape : sélection, contrôle technique, transport et immatriculation au Luxembourg.",
  keywords: [
    "importer voiture europe luxembourg",
    "processus importation europe",
    "contrôle technique importation",
    "immatriculation voiture europe luxembourg",
    "achat véhicule europe livraison luxembourg",
  ],
  openGraph: {
    title: "Comment Importer une Voiture d'Europe – MYG Import",
    description:
      "Guide étape par étape pour importer votre véhicule européen au Luxembourg. Sélection, contrôle, transport, immatriculation.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
