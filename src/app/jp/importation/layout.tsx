import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comment Importer une Voiture du Japon",
  description:
    "Guide complet du processus d'importation d'un véhicule depuis le Japon : enchères, inspection technique, transport maritime, dédouanement, homologation au Luxembourg.",
  keywords: [
    "comment importer voiture japon",
    "processus importation japon luxembourg",
    "enchères auto japon fonctionnement",
    "transport voiture japon luxembourg",
    "dédouanement véhicule japonais",
    "homologation voiture japon luxembourg",
  ],
  openGraph: {
    title: "Comment Importer une Voiture du Japon – MYG Import",
    description:
      "Découvrez toutes les étapes : enchères, inspection, transport, dédouanement et homologation de votre véhicule japonais.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
