import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contactez MYG Import — Devis gratuit import Japon Luxembourg",
  description:
    "Un projet d'importation depuis le Japon ? Contactez MYG Import au Luxembourg. Conseil gratuit, réponse sous 24h, devis personnalisé sans engagement.",
  openGraph: {
    title: "Contact — MYG Import Japon Luxembourg",
    description: "Contactez MYG Import pour votre projet d'importation depuis le Japon. Devis gratuit sous 24h.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
