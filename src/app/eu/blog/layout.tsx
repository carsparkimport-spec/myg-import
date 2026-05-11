import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog – Conseils Achat Véhicule Europe",
  description:
    "Conseils et guides pour acheter et importer un véhicule européen au Luxembourg. Contrôle technique, historique, points de vigilance.",
  openGraph: {
    title: "Blog Achat Véhicule Europe – MYG Import",
    description:
      "Nos conseils pour bien choisir et importer un véhicule européen au Luxembourg.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
