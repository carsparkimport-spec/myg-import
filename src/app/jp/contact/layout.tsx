import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contactez MYG Import – Import Japon Luxembourg",
  description:
    "Vous avez un projet d'importation depuis le Japon ? Contactez l'équipe MYG Import au Luxembourg. Réponse rapide, conseil gratuit, devis personnalisé.",
  openGraph: {
    title: "Contact – MYG Import Japon",
    description:
      "Prenez contact avec l'équipe MYG Import pour votre projet d'importation depuis le Japon.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
