import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulateur de coût import Japon — Estimez votre budget",
  description:
    "Calculez le coût total de votre importation depuis le Japon : prix d'achat aux enchères, transport maritime, taxes douanières, TVA, homologation. Gratuit et instantané.",
  keywords: ["simulateur import voiture japon", "coût importation japon luxembourg", "calculer prix import japon", "budget import JDM"],
  openGraph: {
    title: "Simulateur coût import Japon — MYG Import",
    description: "Estimez votre budget d'importation depuis le Japon en quelques clics. Enchères, transport, douanes, TVA.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
