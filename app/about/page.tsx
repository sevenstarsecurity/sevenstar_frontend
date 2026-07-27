import { AboutCtaBanner } from "@/src/components/about/AboutCtaBanner";
import { AboutHeroBanner } from "@/src/components/about/AboutHeroBanner";
import { CertificationsSection } from "@/src/components/about/CertificationsSection";
import { DistinguishedAdvisors } from "@/src/components/about/DistinguishedAdvisors";
import { LeadershipSection } from "@/src/components/about/LeadershipSection";
import { MissionVisionValues } from "@/src/components/about/MissionVisionValues";
import { OurStorySection } from "@/src/components/about/OurStorySection";
import { WhyChooseSection } from "@/src/components/about/WhyChooseSection";
import { Footer } from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";
import { TopBar } from "@/src/components/layout/TopBar";
import type { Metadata } from "next";

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
        {/* 1. Page Hero Banner */}
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

        {/* 7. CTA Banner */}
        <AboutCtaBanner />
      </main>

      {/* Newsletter */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
