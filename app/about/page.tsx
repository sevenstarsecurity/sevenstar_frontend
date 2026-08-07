import dynamic from "next/dynamic";
import { AboutHeroBanner } from "@/src/components/about/AboutHeroBanner";
import { Footer } from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";
import { TopBar } from "@/src/components/layout/TopBar";
import type { Metadata } from "next";

// Dynamic imports for below-the-fold sections
const OurStorySection = dynamic(
  () => import("@/src/components/about/OurStorySection").then((m) => ({ default: m.OurStorySection })),
  { loading: () => <div className="h-80 bg-white animate-shimmer" /> }
);
const MissionVisionValues = dynamic(
  () => import("@/src/components/about/MissionVisionValues").then((m) => ({ default: m.MissionVisionValues })),
  { loading: () => <div className="h-64 bg-[#f0f5ea] animate-shimmer" /> }
);
const WhyChooseSection = dynamic(
  () => import("@/src/components/about/WhyChooseSection").then((m) => ({ default: m.WhyChooseSection })),
  { loading: () => <div className="h-72 bg-white animate-shimmer" /> }
);
const LeadershipSection = dynamic(
  () => import("@/src/components/about/LeadershipSection").then((m) => ({ default: m.LeadershipSection })),
  { loading: () => <div className="h-96 bg-white animate-shimmer" /> }
);
const DistinguishedAdvisors = dynamic(
  () => import("@/src/components/about/DistinguishedAdvisors").then((m) => ({ default: m.DistinguishedAdvisors })),
  { loading: () => <div className="h-64 bg-white animate-shimmer" /> }
);
const CertificationsSection = dynamic(
  () => import("@/src/components/about/CertificationsSection").then((m) => ({ default: m.CertificationsSection })),
  { loading: () => <div className="h-48 bg-[#f0f5ea] animate-shimmer" /> }
);
const AboutCtaBanner = dynamic(
  () => import("@/src/components/about/AboutCtaBanner").then((m) => ({ default: m.AboutCtaBanner })),
  { loading: () => <div className="h-40 bg-[#004E24] animate-shimmer" /> }
);

export const metadata: Metadata = {
  title: "About Us | Seven Star Security Services",
  description:
    "Learn about Seven Star Security Services — a trusted security company founded in 2071 B.S., serving corporations, events, and institutions across Nepal.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-[#0b4226] selection:text-white">
      {/* Top Bar */}
      <TopBar />

      {/* Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* 1. Page Hero Banner — above the fold, loaded eagerly */}
        <AboutHeroBanner />

        {/* 2. Our Story */}
        <OurStorySection />

        {/* 3. Mission / Vision / Values */}
        <MissionVisionValues />

        {/* 4. Why Choose Seven Star */}
        <WhyChooseSection />

        {/* 5. Our Leadership */}
        <LeadershipSection />

        {/* 6. Distinguished Advisors */}
        <DistinguishedAdvisors />

        {/* 7. Certifications */}
        <CertificationsSection />

        {/* 8. CTA Banner */}
        <AboutCtaBanner />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

