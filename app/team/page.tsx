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
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Our Team | Seven Star Security Services",
  description:
    "Meet the team behind Nepal's trusted security guard company — executive leadership, staff members, strategic advisors, operations divisions, and national command hubs of Seven Star Security Services.",
  alternates: {
    canonical: "/team",
  },
  openGraph: {
    title: "Our Team | Seven Star Security Services",
    description:
      "Meet the leadership and operations team of Nepal's trusted security guard company.",
    url: "https://www.sevenstarsecurity.com.np/team",
    siteName: "Seven Star Security Services",
    images: [
      {
        url: "/images/sevenstarbg.webp",
        width: 895,
        height: 279,
        alt: "Seven Star Security Team",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team | Seven Star Security Services",
    description:
      "Meet the leadership and operations team of Nepal's trusted security guard company.",
    images: ["/images/sevenstarbg.webp"],
  },
};

export default function TeamPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-[#0b4226] selection:text-white">
      <BreadcrumbJsonLd
        items={[{ name: "Home", url: "/" }, { name: "Our Team", url: "/team" }]}
      />
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
