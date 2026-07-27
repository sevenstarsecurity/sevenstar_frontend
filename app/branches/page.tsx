import { BranchesHeroBanner } from "@/src/components/branches/BranchesHeroBanner";
import { BranchesStats } from "@/src/components/branches/BranchesStats";
import { FeaturedBranches } from "@/src/components/branches/FeaturedBranches";
import { RegionalBranches } from "@/src/components/branches/RegionalBranches";
import { SecureAssetsCta } from "@/src/components/branches/SecureAssetsCta";
import { StrategicOperationsNetwork } from "@/src/components/branches/StrategicOperationsNetwork";
import { Footer } from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";
import { TopBar } from "@/src/components/layout/TopBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Branches | Seven Star Security Services",
  description:
    "Protecting communities across Nepal — explore Seven Star Security's Head Office, S9 Training Academy, and 5 regional branch locations across the country.",
};

export default function BranchesPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-[#0b4226] selection:text-white">
      {/* Top Bar Strip */}
      <TopBar />

      {/* Main Header / Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* 1. Hero Banner */}
        <BranchesHeroBanner />

        {/* 2. Animated Stats Bar */}
        <BranchesStats />

        {/* 3. Strategic Operations Network + Nepal Map */}
        <StrategicOperationsNetwork />

        {/* 4. Featured: Kathmandu Head Office + S9 Training Academy */}
        <FeaturedBranches />

        {/* 5. Regional Branches Grid (5 branches) */}
        <RegionalBranches />

        {/* 6. Secure Your Assets CTA Banner */}
        <SecureAssetsCta />
      </main>

      {/* Newsletter Bar */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
