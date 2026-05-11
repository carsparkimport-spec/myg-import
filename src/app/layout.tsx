import type { Metadata } from "next";
import { Inter, Roboto_Mono, Oswald, Antonio } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/i18n/I18nProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "MYG Import – Importation de Véhicules Japon & Europe Luxembourg",
    template: "%s | MYG Import",
  },
  description:
    "MYG Import, votre spécialiste en importation de véhicules du Japon et d'Europe au Luxembourg. Sélection premium, prix transparents, accompagnement complet de l'achat à la livraison.",
  keywords: [
    "import voiture japon luxembourg",
    "importation véhicule japon",
    "achat voiture japon",
    "voiture occasion japon",
    "enchères auto japon",
    "importation europe luxembourg",
    "MYG Import",
    "véhicule import luxembourg",
  ],
  authors: [{ name: "MYG Import" }],
  creator: "MYG Import",
  publisher: "MYG Import",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_LU",
    siteName: "MYG Import",
    title: "MYG Import – Importation de Véhicules Japon & Europe Luxembourg",
    description:
      "Votre spécialiste en importation de véhicules du Japon et d'Europe au Luxembourg. Sélection premium, prix transparents, accompagnement complet.",
    images: [
      {
        url: "/images/backgrounds/Logo MYG.png",
        width: 1200,
        height: 630,
        alt: "MYG Import",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MYG Import – Importation de Véhicules Japon & Europe Luxembourg",
    description:
      "Votre spécialiste en importation de véhicules du Japon et d'Europe au Luxembourg.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${robotoMono.variable} ${oswald.variable} ${antonio.variable} antialiased`}
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
