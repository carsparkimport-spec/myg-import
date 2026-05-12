import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comment importer une voiture du Japon au Luxembourg",
  description:
    "Guide complet d'importation depuis le Japon : enchères USS/TAA, inspection technique, transport maritime, dédouanement, homologation. Toutes les étapes expliquées.",
  keywords: ["comment importer voiture japon", "processus importation japon luxembourg", "enchères auto japon fonctionnement", "dédouanement véhicule japonais"],
  openGraph: {
    title: "Comment importer une voiture du Japon — MYG Import",
    description: "Toutes les étapes : enchères, inspection, transport, dédouanement, homologation de votre véhicule japonais.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
