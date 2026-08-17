import dynamic from "next/dynamic";
import { TrainingHeroBanner } from "@/src/components/training/TrainingHeroBanner";
import { Footer } from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";
import { TopBar } from "@/src/components/layout/TopBar";
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";

// Dynamic imports for below-the-fold sections
const DefiningExcellence = dynamic(
  () => import("@/src/components/training/DefiningExcellence").then((m) => ({ default: m.DefiningExcellence })),
  { loading: () => <div className="h-64 bg-white animate-shimmer" /> }
);
const AcademicDepth = dynamic(
  () => import("@/src/components/training/AcademicDepth").then((m) => ({ default: m.AcademicDepth })),
  { loading: () => <div className="h-80 bg-[#f0f5ea] animate-shimmer" /> }
);
const TrainingArena = dynamic(
  () => import("@/src/components/training/TrainingArena").then((m) => ({ default: m.TrainingArena })),
  { loading: () => <div className="h-96 bg-white animate-shimmer" /> }
);
const JoinEliteForce = dynamic(
  () => import("@/src/components/training/JoinEliteForce").then((m) => ({ default: m.JoinEliteForce })),
  { loading: () => <div className="h-40 bg-[#004E24] animate-shimmer" /> }
);

export const metadata: Metadata = {
  title: "Security Guard Training | Seven Star Security Services",
  description:
    "Trained to protect, equipped to excel — explore Seven Star Security's elite security guard training program, curriculum modules, and purpose-built training arena in Nepal.",
  alternates: {
    canonical: "/training",
  },
  openGraph: {
    title: "Security Guard Training | Seven Star Security Services",
    description:
      "Explore Seven Star Security's elite security guard training program and training arena in Nepal.",
    url: "https://www.sevenstarsecurity.com.np/training",
    siteName: "Seven Star Security Services",
    images: [
      {
        url: "/images/sevenstarbg.webp",
        width: 895,
        height: 279,
        alt: "Security Guard Training - Seven Star Security",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Security Guard Training | Seven Star Security Services",
    description:
      "Explore Seven Star Security's elite security guard training program in Nepal.",
    images: ["/images/sevenstarbg.webp"],
  },
};

export default function TrainingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-[#0b4226] selection:text-white">
      <BreadcrumbJsonLd
        items={[{ name: "Home", url: "/" }, { name: "Training", url: "/training" }]}
      />
      {/* Top Bar Strip */}
      <TopBar />

      {/* Main Header / Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* 1. Hero Banner — loaded eagerly */}
        <TrainingHeroBanner />

        {/* 2. Defining Excellence Pillars */}
        <DefiningExcellence />

        {/* 3. Academic Depth Curriculum Modules */}
        <AcademicDepth />

        {/* 4. Our Training Arena Facility */}
        <TrainingArena />

        {/* 5. Join The Elite Force Recruitment CTA */}
        <JoinEliteForce />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

