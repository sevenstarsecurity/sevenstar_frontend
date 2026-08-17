import { Footer } from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";
import { TopBar } from "@/src/components/layout/TopBar";

import { GalleryHeroBanner } from "@/src/components/gallery/GalleryHeroBanner";
import { InstitutionalLegacy } from "@/src/components/gallery/InstitutionalLegacy";
import { InstitutionalReadiness } from "@/src/components/gallery/InstitutionalReadiness";
import { OperationalPortfolio } from "@/src/components/gallery/OperationalPortfolio";
import { ProtectionProtocolCta } from "@/src/components/gallery/ProtectionProtocolCta";

import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Gallery | Seven Star Security Services",
  description:
    "A look inside Seven Star Security — exploring our institutional legacy, operational portfolio, and institutional readiness across Nepal.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Gallery | Seven Star Security Services",
    description:
      "A look inside Nepal's trusted security guard company — our operational portfolio and institutional readiness.",
    url: "https://www.sevenstarsecurity.com.np/gallery",
    siteName: "Seven Star Security Services",
    images: [
      {
        url: "/images/sevenstarbg.webp",
        width: 895,
        height: 279,
        alt: "Seven Star Security Gallery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Seven Star Security Services",
    description:
      "A look inside Nepal's trusted security guard company — our operational portfolio.",
    images: ["/images/sevenstarbg.webp"],
  },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f0f5ea] text-gray-900 selection:bg-[#004E24] selection:text-white">
      <BreadcrumbJsonLd
        items={[{ name: "Home", url: "/" }, { name: "Gallery", url: "/gallery" }]}
      />
      {/* Top Bar Strip */}
      <TopBar />

      {/* Main Header / Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* 1. Hero Banner */}
        <GalleryHeroBanner />

        {/* 2. Institutional Legacy Section */}
        <InstitutionalLegacy />

        {/* 3. Operational Portfolio Grid with Tabs */}
        <OperationalPortfolio />

        {/* 4. Institutional Readiness Video & Stats */}
        <InstitutionalReadiness />

        {/* 5. Protection Protocol CTA Banner */}
        <ProtectionProtocolCta />
      </main>

      {/* Newsletter Bar */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
