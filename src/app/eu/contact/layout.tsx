import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contactez MYG Import – Véhicules Europe Luxembourg",
  description:
    "Intéressé par un véhicule européen ? Contactez MYG Import au Luxembourg. Conseil gratuit, accompagnement personnalisé de l'achat à la livraison.",
  openGraph: {
    title: "Contact – MYG Import Europe",
    description:
      "Contactez MYG Import pour l'achat ou l'importation d'un véhicule européen au Luxembourg.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
