import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Import Voiture Japon Luxembourg – MYG Import",
    template: "%s | MYG Import Japon",
  },
  description:
    "Importez votre véhicule depuis le Japon au Luxembourg avec MYG Import. Enchères japonaises, inspection technique, transport maritime, dédouanement. Transparence totale sur les coûts.",
  keywords: [
    "import voiture japon luxembourg",
    "importation véhicule japon",
    "enchères auto japon",
    "achat voiture japon",
    "voiture japonaise occasion",
    "JDM luxembourg",
    "import JDM",
    "MYG Import japon",
  ],
  openGraph: {
    type: "website",
    locale: "fr_LU",
    siteName: "MYG Import",
    title: "Import Voiture Japon Luxembourg – MYG Import",
    description:
      "Importez votre véhicule depuis le Japon au Luxembourg. Enchères japonaises, inspection, transport, dédouanement. Accompagnement complet.",
  },
};

export default function JpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
