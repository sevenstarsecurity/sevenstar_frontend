import { Footer } from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";
import { TopBar } from "@/src/components/layout/TopBar";
import { OurProvenProcess } from "@/src/components/services/OurProvenProcess";
import { ServicesCtaBanner } from "@/src/components/services/ServicesCtaBanner";
import { ServicesGrid } from "@/src/components/services/ServicesGrid";
import { ServicesHeaderCallout } from "@/src/components/services/ServicesHeaderCallout";
import { ServicesHeroBanner } from "@/src/components/services/ServicesHeroBanner";
import { WhyServicesStandOut } from "@/src/components/services/WhyServicesStandOut";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Seven Star Security Services",
  description:
    "Explore comprehensive security solutions tailored to you — static guard services, electronic surveillance, executive protection, risk assessment, and 24/7 command monitoring across Nepal.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-[#0b4226] selection:text-white">
      {/* Top Contact Strip */}
      <TopBar />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Services Page Content */}
      <main className="flex-grow">
        {/* 1. Hero Banner */}
        <ServicesHeroBanner />

        {/* 2. Intro Description & Quote CTA */}
        <ServicesHeaderCallout />

        {/* 3. Category Filters & 26 Services Grid */}
        <ServicesGrid />

        {/* 4. Why Our Services Stand Out */}
        <WhyServicesStandOut />

        {/* 5. Our Proven Process (Animated Step Pipeline) */}
        <OurProvenProcess />

        {/* 6. Consultation CTA Banner */}
        <ServicesCtaBanner />
      </main>

      {/* Newsletter Subscription Bar */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
