import { TopBar } from "@/src/components/layout/TopBar";
import { Navbar } from "@/src/components/layout/Navbar";
import { HeroSection } from "@/src/components/home/HeroSection";
import { LogoCarousel } from "@/src/components/home/LogoCarousel";
import { IndustriesSection } from "@/src/components/home/IndustriesSection";
import { PresenceSection } from "@/src/components/home/PresenceSection";
import { StatsSection } from "@/src/components/home/StatsSection";
import { VigilanceSection } from "@/src/components/home/VigilanceSection";
import { CtaSection } from "@/src/components/home/CtaSection";
import { Newsletter } from "@/src/components/layout/Newsletter";
import { Footer } from "@/src/components/layout/Footer";

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