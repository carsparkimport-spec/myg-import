import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos de MYG Import",
  description:
    "MYG Import, votre partenaire pour l'achat de véhicules européens au Luxembourg. Qualité, transparence et accompagnement personnalisé.",
  openGraph: {
    title: "À Propos – MYG Import",
    description:
      "L'équipe MYG Import à votre service pour l'importation de véhicules européens de qualité.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
