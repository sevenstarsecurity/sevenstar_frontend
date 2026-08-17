import dynamic from "next/dynamic";
import { ServicesHeroBanner } from "@/src/components/services/ServicesHeroBanner";
import { Footer } from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";
import { TopBar } from "@/src/components/layout/TopBar";
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";

// Dynamic imports for below-the-fold sections
const ServicesHeaderCallout = dynamic(
  () => import("@/src/components/services/ServicesHeaderCallout").then((m) => ({ default: m.ServicesHeaderCallout })),
  { loading: () => <div className="h-40 bg-white animate-shimmer" /> }
);
const ServicesGrid = dynamic(
  () => import("@/src/components/services/ServicesGrid").then((m) => ({ default: m.ServicesGrid })),
  { loading: () => <div className="h-96 bg-[#f0f5ea] animate-shimmer" /> }
);
const WhyServicesStandOut = dynamic(
  () => import("@/src/components/services/WhyServicesStandOut").then((m) => ({ default: m.WhyServicesStandOut })),
  { loading: () => <div className="h-64 bg-white animate-shimmer" /> }
);
const OurProvenProcess = dynamic(
  () => import("@/src/components/services/OurProvenProcess").then((m) => ({ default: m.OurProvenProcess })),
  { loading: () => <div className="h-72 bg-[#f0f5ea] animate-shimmer" /> }
);
const ServicesCtaBanner = dynamic(
  () => import("@/src/components/services/ServicesCtaBanner").then((m) => ({ default: m.ServicesCtaBanner })),
  { loading: () => <div className="h-40 bg-[#004E24] animate-shimmer" /> }
);

export const metadata: Metadata = {
  title: "Security Guard Services in Nepal | Seven Star Security",
  description:
    "Hire trained security guards in Nepal — static guard services, mobile patrol, event security, CCTV surveillance, executive protection, bank security, and 24/7 command monitoring across Kathmandu and Nepal.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Security Guard Services in Nepal | Seven Star Security",
    description:
      "Hire trained security guards in Nepal — static guards, mobile patrol, event security, CCTV, VIP protection, and bank security across Kathmandu and Nepal.",
    url: "https://www.sevenstarsecurity.com.np/services",
    siteName: "Seven Star Security Services",
    images: [
      {
        url: "/images/sevenstarbg.webp",
        width: 895,
        height: 279,
        alt: "Security Guard Services in Nepal - Seven Star Security",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Security Guard Services in Nepal | Seven Star Security",
    description:
      "Hire trained security guards in Nepal — static guards, event security, CCTV, VIP protection, and bank security.",
    images: ["/images/sevenstarbg.webp"],
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-[#0b4226] selection:text-white">
      <BreadcrumbJsonLd
        items={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }]}
      />
      {/* Top Contact Strip */}
      <TopBar />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Services Page Content */}
      <main className="flex-grow">
        {/* 1. Hero Banner — loaded eagerly */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

