import { Footer } from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";
import { TopBar } from "@/src/components/layout/TopBar";
import { ExecutiveCommittee } from "@/src/components/team/ExecutiveCommittee";
import { TeamStaffSection } from "@/src/components/team/TeamStaffSection";
import { FireSafetyAffiliate } from "@/src/components/team/FireSafetyAffiliate";
import { OperationsDivisions } from "@/src/components/team/OperationsDivisions";
import { StrategicAdvisors } from "@/src/components/team/StrategicAdvisors";
import { TeamHeroBanner } from "@/src/components/team/TeamHeroBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team | Seven Star Security Services",
  description:
    "Meet the team behind your safety — executive leadership, staff members, strategic advisors, operations divisions, and national command hubs of Seven Star Security Services.",
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

        {/* 3. Our Staff */}
        <TeamStaffSection />

        {/* 4. Strategic Advisors */}
        <StrategicAdvisors />

        {/* 5. Tabbed Operations Divisions */}
        <OperationsDivisions />

        {/* 6. Fire & Safety Premium Affiliate */}
        <FireSafetyAffiliate />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
