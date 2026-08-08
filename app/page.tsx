import dynamic from "next/dynamic";
import { TopBar } from "@/src/components/layout/TopBar";
import { Navbar } from "@/src/components/layout/Navbar";
import { HeroSection } from "@/src/components/home/HeroSection";
import { LogoCarousel } from "@/src/components/home/LogoCarousel";
import { IndustriesSection } from "@/src/components/home/IndustriesSection";

// Below-the-fold components loaded dynamically for reduced initial JS payload
const PresenceSection = dynamic(
  () => import("@/src/components/home/PresenceSection").then((m) => m.PresenceSection)
);
const StatsSection = dynamic(
  () => import("@/src/components/home/StatsSection").then((m) => m.StatsSection)
);
const VigilanceSection = dynamic(
  () => import("@/src/components/home/VigilanceSection").then((m) => m.VigilanceSection)
);
const CtaSection = dynamic(
  () => import("@/src/components/home/CtaSection").then((m) => m.CtaSection)
);
const Newsletter = dynamic(
  () => import("@/src/components/layout/Newsletter").then((m) => m.Newsletter)
);
const Footer = dynamic(
  () => import("@/src/components/layout/Footer").then((m) => m.Footer)
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-[#0b4226] selection:text-white">
      {/* Top Bar Contact Strip */}
      <TopBar />

      {/* Main Header / Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Slow Moving Inline Company Logos Carousel */}
        <LogoCarousel />

        {/* Industries We Serve */}
        <IndustriesSection />

        {/* Nationwide Presence Banner */}
        <PresenceSection />

        {/* Animated Counter Statistics (12+, 950+, 435+, 5) */}
        <StatsSection />

        {/* Vigilance in Action Grid */}
        <VigilanceSection />

        {/* Call To Action Banner */}
        <CtaSection />
      </main>

      {/* Newsletter Subscription Bar */}
      <Newsletter />

      {/* Footer Component */}
      <Footer />
    </div>
  );
}