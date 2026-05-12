import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Véhicules européens premium Luxembourg — MYG Import",
    template: "%s — MYG Import Europe",
  },
  description:
    "Sélection de véhicules européens d'exception au Luxembourg. Qualité vérifiée, historique complet, accompagnement personnalisé de l'achat à la livraison.",
  keywords: [
    "voiture européenne occasion luxembourg",
    "import voiture europe luxembourg",
    "véhicule premium occasion luxembourg",
    "MYG Import europe",
  ],
  openGraph: {
    type: "website",
    locale: "fr_LU",
    siteName: "MYG Import",
    title: "Véhicules européens premium Luxembourg — MYG Import",
    description:
      "Sélection de véhicules européens premium au Luxembourg. Qualité vérifiée, accompagnement personnalisé.",
    images: [{ url: "/images/og/og-europe.jpg", width: 1200, height: 630, alt: "Véhicules Europe – MYG Import" }],
  },
};

export default function EuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
