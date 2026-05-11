import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulateur de Coût Import Europe",
  description:
    "Calculez le coût complet de l'importation de votre véhicule européen au Luxembourg : prix d'achat, transport, contrôle technique, frais d'immatriculation.",
  keywords: [
    "simulateur import voiture europe",
    "coût importation europe luxembourg",
    "calculer prix import voiture europe",
    "budget achat voiture europe",
  ],
  openGraph: {
    title: "Simulateur Coût Import Europe – MYG Import",
    description:
      "Estimez votre budget pour importer un véhicule européen au Luxembourg.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
