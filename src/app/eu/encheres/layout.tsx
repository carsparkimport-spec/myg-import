import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enchères Véhicules Europe",
  description:
    "Accédez aux enchères de véhicules européens avec MYG Import. Sélection rigoureuse, inspection vérifiée, livraison au Luxembourg.",
  openGraph: {
    title: "Enchères Véhicules Europe – MYG Import",
    description:
      "Enchères de véhicules européens sélectionnés par MYG Import. Qualité et transparence garanties.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
