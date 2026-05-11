import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Véhicules Européens Premium Luxembourg – MYG Import",
    template: "%s | MYG Import Europe",
  },
  description:
    "MYG Import propose une sélection de véhicules européens d'exception au Luxembourg. Qualité vérifiée, historique complet, livraison soignée.",
  keywords: [
    "voiture européenne occasion luxembourg",
    "import voiture europe luxembourg",
    "véhicule premium occasion luxembourg",
    "achat voiture europe",
    "MYG Import europe",
    "voiture importée luxembourg",
  ],
  openGraph: {
    type: "website",
    locale: "fr_LU",
    siteName: "MYG Import",
    title: "Véhicules Européens Premium Luxembourg – MYG Import",
    description:
      "Sélection de véhicules européens d'exception au Luxembourg. Qualité premium, historique vérifiable, accompagnement personnalisé.",
  },
};

export default function EuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
