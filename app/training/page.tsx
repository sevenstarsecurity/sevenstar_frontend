import dynamic from "next/dynamic";
import { TrainingHeroBanner } from "@/src/components/training/TrainingHeroBanner";
import { Footer } from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";
import { TopBar } from "@/src/components/layout/TopBar";
import type { Metadata } from "next";

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
  title: "Training | Seven Star Security Services",
  description:
    "Trained to protect, equipped to excel — explore Seven Star Security's elite training program, curriculum modules, and purpose-built training arena in Nepal.",
};

export default function TrainingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-[#0b4226] selection:text-white">
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

