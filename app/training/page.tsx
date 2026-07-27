import { Footer } from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";
import { TopBar } from "@/src/components/layout/TopBar";
import { AcademicDepth } from "@/src/components/training/AcademicDepth";
import { DefiningExcellence } from "@/src/components/training/DefiningExcellence";
import { JoinEliteForce } from "@/src/components/training/JoinEliteForce";
import { TrainingArena } from "@/src/components/training/TrainingArena";
import { TrainingHeroBanner } from "@/src/components/training/TrainingHeroBanner";
import type { Metadata } from "next";

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
        {/* 1. Hero Banner */}
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

      {/* Newsletter Bar */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
