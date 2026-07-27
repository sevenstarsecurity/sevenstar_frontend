import { Footer } from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";
import { TopBar } from "@/src/components/layout/TopBar";

import { GalleryHeroBanner } from "@/src/components/gallery/GalleryHeroBanner";
import { InstitutionalLegacy } from "@/src/components/gallery/InstitutionalLegacy";
import { InstitutionalReadiness } from "@/src/components/gallery/InstitutionalReadiness";
import { OperationalPortfolio } from "@/src/components/gallery/OperationalPortfolio";
import { ProtectionProtocolCta } from "@/src/components/gallery/ProtectionProtocolCta";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Seven Star Security Services",
  description:
    "A look inside Seven Star Security — exploring our institutional legacy, operational portfolio, and institutional readiness across Nepal.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f0f5ea] text-gray-900 selection:bg-[#004E24] selection:text-white">
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
