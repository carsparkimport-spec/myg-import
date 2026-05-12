import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos de MYG Import — Votre partenaire automobile Luxembourg",
  description:
    "MYG Import, votre partenaire pour l'achat de véhicules européens au Luxembourg. Qualité, transparence et accompagnement sur mesure.",
  openGraph: {
    title: "À propos — MYG Import Europe Luxembourg",
    description: "L'équipe MYG Import à votre service pour des véhicules européens de qualité au Luxembourg.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
