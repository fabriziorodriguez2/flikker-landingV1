import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import Script from "next/script";

import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://flikker.uy";
const SITE_NAME = "Flikker";
const TITLE = "Flikker｜Más reseñas de Google para tu negocio, automático";
const DESCRIPTION =
  "Flikker pide reseñas por WhatsApp después de cada compra, visita o servicio. Las buenas llegan a Google. Las malas te avisan primero a vos.";

const PLAUSIBLE_DOMAIN =
  process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "flikker.uy";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Flikker",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Flikker" }],
  keywords: [
    "reseñas Google",
    "reputación online",
    "WhatsApp automation",
    "SEO local",
    "Google Business Profile",
    "negocios locales",
    "reseñas para negocios",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "es_UY",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/brand/flikker-isotype.svg", type: "image/svg+xml" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  description: DESCRIPTION,
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "es-UY",
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      priceCurrency: "USD",
      price: "69",
    },
    {
      "@type": "Offer",
      name: "Pro",
      priceCurrency: "USD",
      price: "129",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${syne.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-mist font-body text-midnight">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.outbound-links.tagged-events.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
