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
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Our Branches | Seven Star Security Services",
  description:
    "Find security guards near you — explore Seven Star Security's Head Office in Kathmandu, S9 Training Academy, and 5 regional branches serving all of Nepal.",
  alternates: {
    canonical: "/branches",
  },
  openGraph: {
    title: "Seven Star Security Branches | Security Guards Across Nepal",
    description:
      "Find security guards near you — Seven Star Security branches in Kathmandu and across Nepal.",
    url: "https://www.sevenstarsecurity.com.np/branches",
    siteName: "Seven Star Security Services",
    images: [
      {
        url: "/images/sevenstarbg.webp",
        width: 895,
        height: 279,
        alt: "Seven Star Security Branches Across Nepal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seven Star Security Branches | Security Guards Across Nepal",
    description:
      "Find security guards near you — Seven Star Security branches in Kathmandu and across Nepal.",
    images: ["/images/sevenstarbg.webp"],
  },
};

export default function BranchesPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-[#0b4226] selection:text-white">
      <BreadcrumbJsonLd
        items={[{ name: "Home", url: "/" }, { name: "Branches", url: "/branches" }]}
      />
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
