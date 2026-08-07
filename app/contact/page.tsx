import dynamic from "next/dynamic";
import { ContactHeroBanner } from "@/src/components/contact/ContactHeroBanner";
import { Footer } from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";
import { TopBar } from "@/src/components/layout/TopBar";
import type { Metadata } from "next";

// Dynamic imports for below-the-fold sections
const InitiateInquiry = dynamic(
  () => import("@/src/components/contact/InitiateInquiry").then((m) => ({ default: m.InitiateInquiry })),
  { loading: () => <div className="h-96 bg-white animate-shimmer" /> }
);
const RegionalOperations = dynamic(
  () => import("@/src/components/contact/RegionalOperations").then((m) => ({ default: m.RegionalOperations })),
  { loading: () => <div className="h-48 bg-[#f0f5ea] animate-shimmer" /> }
);
const CommonInquiries = dynamic(
  () => import("@/src/components/contact/CommonInquiries").then((m) => ({ default: m.CommonInquiries })),
  { loading: () => <div className="h-64 bg-white animate-shimmer" /> }
);

export const metadata: Metadata = {
  title: "Contact Us | Seven Star Security Services",
  description:
    "Operational correspondence and inquiry dispatch for Seven Star Security — connect with our command center, submit intelligence inquiries, and explore regional operations.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f0f5ea] text-gray-900 selection:bg-[#004E24] selection:text-white">
      {/* Top Bar Strip */}
      <TopBar />

      {/* Main Header / Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* 1. Hero Banner + 3 Floating Contact Cards — loaded eagerly */}
        <ContactHeroBanner />

        {/* 2. Initiate Inquiry Form + Map & ISO Badges */}
        <InitiateInquiry />

        {/* 3. Regional Operations Outlined Pills */}
        <RegionalOperations />

        {/* 4. Common Inquiries FAQ Accordion */}
        <CommonInquiries />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

