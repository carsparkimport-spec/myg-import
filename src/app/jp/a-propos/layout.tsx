import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos de MYG Import — Importateur auto Luxembourg",
  description:
    "MYG Import, votre spécialiste en importation automobile au Luxembourg. Passionnés d'automobiles japonaises, transparence totale, accompagnement personnalisé.",
  openGraph: {
    title: "À propos — MYG Import Luxembourg",
    description: "L'équipe MYG Import, passionnée d'automobiles japonaises. Notre histoire, nos valeurs, notre engagement.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
