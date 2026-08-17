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
    "Hire security guards in Nepal - contact Seven Star Security Services for 24/7 guard services, security consultation, and regional branch contact in Kathmandu and across Nepal.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Seven Star Security | Security Guard Company Nepal",
    description:
      "Hire security guards in Nepal - contact Seven Star Security Services for 24/7 guard services, security consultation, and regional branches.",
    url: "https://www.sevenstarsecurity.com.np/contact",
    siteName: "Seven Star Security Services",
    images: [
      {
        url: "/images/sevenstarbg.webp",
        width: 895,
        height: 279,
        alt: "Contact Seven Star Security - Security Guard Company Nepal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Seven Star Security | Security Guard Company Nepal",
    description:
      "Hire security guards in Nepal - contact Seven Star Security Services for 24/7 guard services and security consultation.",
    images: ["/images/sevenstarbg.webp"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "HOW QUICKLY CAN YOU DEPLOY SECURITY PERSONNEL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our rapid response units can deploy emergency security personnel within 15 minutes across major urban corridors, and standard corporate guard placements are fully operational within 24 hours.",
      },
    },
    {
      "@type": "Question",
      name: "ARE YOUR FIELD AGENTS EX-MILITARY?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, a significant percentage of our senior operatives and tactical team leads are honorably discharged ex-military and armed forces veterans, trained extensively in threat mitigation and physical defense.",
      },
    },
    {
      "@type": "Question",
      name: "DO YOU OFFER INTERNATIONAL EXECUTIVE PROTECTION?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We provide seamless cross-border VIP escort, international event security, and diplomatic protection across South Asia and global partner networks.",
      },
    },
  ],
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

