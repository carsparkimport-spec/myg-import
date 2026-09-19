import type { Metadata } from "next";
import { Inter, Roboto_Mono, Oswald, Antonio } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/i18n/I18nProvider";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const robotoMono = Roboto_Mono({ variable: "--font-roboto-mono", subsets: ["latin"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const antonio = Antonio({ variable: "--font-antonio", subsets: ["latin"], weight: ["400", "600", "700"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://myg-import.com";
const OG_IMAGE = `${SITE_URL}/images/og/og-default.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Import voiture Luxembourg & Japon — MYG Import | Devis gratuit",
    template: "%s — MYG Import",
  },
  description:
    "Importateur automobile au Luxembourg. Stock Europe & JDM japonais, simulateur en ligne, accompagnement clé en main. Devis gratuit sous 24h.",
  keywords: [
    "import voiture luxembourg",
    "importation véhicule japon luxembourg",
    "voiture JDM luxembourg",
    "importateur automobile luxembourg",
    "achat voiture japon",
    "MYG Import",
    "simulateur import voiture",
    "voiture occasion luxembourg",
  ],
  authors: [{ name: "MYG Import" }],
  creator: "MYG Import",
  publisher: "MYG Import",
  verification: {
    google: "ZVKm5Z6YyJf5qEwEf8Xz7aObfDzF9Fx0XQrvBVComS4",
    other: { "msvalidate.01": "3A4DB76306E1EA5CB050E2D9764F8817" },
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    locale: "fr_LU",
    siteName: "MYG Import",
    url: SITE_URL,
    title: "Import voiture Luxembourg & Japon — MYG Import | Devis gratuit",
    description:
      "Importateur automobile au Luxembourg. Stock Europe & JDM japonais, simulateur en ligne, accompagnement clé en main.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "MYG Import – Importation automobile Luxembourg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Import voiture Luxembourg & Japon — MYG Import",
    description: "Importateur automobile au Luxembourg. Stock Europe & JDM japonais, simulateur en ligne.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${robotoMono.variable} ${oswald.variable} ${antonio.variable} antialiased`}
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
