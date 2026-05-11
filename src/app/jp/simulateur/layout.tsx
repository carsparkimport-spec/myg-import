import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulateur de Coût Import Japon",
  description:
    "Estimez le coût total de votre importation depuis le Japon : prix d'achat aux enchères, transport maritime, taxes douanières, TVA, frais de mise en conformité.",
  keywords: [
    "simulateur import voiture japon",
    "coût importation japon luxembourg",
    "calculer prix import japon",
    "taxes importation véhicule japon",
    "budget import voiture japon",
  ],
  openGraph: {
    title: "Simulateur Coût Import Japon – MYG Import",
    description:
      "Calculez votre budget d'importation depuis le Japon : enchères, transport, douanes, TVA, homologation.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
