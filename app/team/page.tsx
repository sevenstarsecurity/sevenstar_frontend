import { Footer } from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";
import { TopBar } from "@/src/components/layout/TopBar";
import { ExecutiveCommittee } from "@/src/components/team/ExecutiveCommittee";
import { FireSafetyAffiliate } from "@/src/components/team/FireSafetyAffiliate";
import { NationalScale } from "@/src/components/team/NationalScale";
import { OperationsDivisions } from "@/src/components/team/OperationsDivisions";
import { StrategicAdvisors } from "@/src/components/team/StrategicAdvisors";
import { TeamHeroBanner } from "@/src/components/team/TeamHeroBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team | Seven Star Security Services",
  description:
    "Meet the team behind your safety — executive leadership, strategic advisors, operations divisions, and national command hubs of Seven Star Security Services.",
};

export default function TeamPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-[#0b4226] selection:text-white">
      {/* Top Bar Strip */}
      <TopBar />

      {/* Main Header / Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* 1. Hero Banner */}
        <TeamHeroBanner />

        {/* 2. Executive Committee */}
        <ExecutiveCommittee />

        {/* 3. Strategic Advisors */}
        <StrategicAdvisors />

        {/* 4. Tabbed Operations Divisions */}
        <OperationsDivisions />

        {/* 5. National Scale Hubs */}
        <NationalScale />

        {/* 6. Fire & Safety Premium Affiliate */}
        <FireSafetyAffiliate />
      </main>

      {/* Newsletter Bar */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
