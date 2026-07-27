import { Footer } from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";
import { TopBar } from "@/src/components/layout/TopBar";

import { CommonInquiries } from "@/src/components/contact/CommonInquiries";
import { ContactHeroBanner } from "@/src/components/contact/ContactHeroBanner";
import { InitiateInquiry } from "@/src/components/contact/InitiateInquiry";
import { RegionalOperations } from "@/src/components/contact/RegionalOperations";

import type { Metadata } from "next";

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
        {/* 1. Hero Banner + 3 Floating Contact Cards */}
        <ContactHeroBanner />

        {/* 2. Initiate Inquiry Form + Map & ISO Badges */}
        <InitiateInquiry />

        {/* 3. Regional Operations Outlined Pills */}
        <RegionalOperations />

        {/* 4. Common Inquiries FAQ Accordion */}
        <CommonInquiries />
      </main>

      {/* Newsletter Bar */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
