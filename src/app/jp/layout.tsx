import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Import voiture Japon Luxembourg — MYG Import | Devis gratuit",
    template: "%s — MYG Import Japon",
  },
  description:
    "Importez votre véhicule JDM depuis le Japon au Luxembourg. Enchères japonaises, inspection, transport maritime, dédouanement. Accompagnement clé en main, devis gratuit sous 24h.",
  keywords: [
    "import voiture japon luxembourg",
    "voiture JDM luxembourg",
    "enchères auto japon",
    "importation JDM",
    "achat voiture japon",
    "MYG Import japon",
    "simulateur import japon",
  ],
  openGraph: {
    type: "website",
    locale: "fr_LU",
    siteName: "MYG Import",
    title: "Import voiture Japon Luxembourg — MYG Import | Devis gratuit",
    description:
      "Importez votre véhicule JDM depuis le Japon. Enchères, inspection, transport, dédouanement. Devis gratuit.",
    images: [{ url: "/images/og/og-japon.jpg", width: 1200, height: 630, alt: "Import voiture Japon – MYG Import" }],
  },
};

export default function JpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
