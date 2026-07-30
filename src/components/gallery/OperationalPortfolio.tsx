"use client";

import { Award } from "lucide-react";
import React, { useState } from "react";
import { ImageFallback } from "../ui/ImageFallback";

export const OperationalPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All View");

  const tabs = ["All View", "Field Ops", "Intelligence", "Facilities"];

  return (
    <section className="bg-[#f1f1f1] py-12 md:py-16 border-t border-[#e2ebd9]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
        {/* Header Bar with Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10 pb-4 border-b border-gray-200/60">
          {/* Section Heading */}
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#004E24] uppercase tracking-wider relative"
              style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
            >
              OPERATIONAL PORTFOLIO
            </h2>
            <div className="w-16 h-[3px] bg-[#c8102e] mt-2" />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-6 text-xs font-semibold">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative py-1 transition-colors ${activeTab === tab
                  ? "text-[#004E24] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#004E24]"
                  : "text-gray-500 hover:text-[#004E24]"
                  }`}
                style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="flex flex-col gap-4 md:gap-5">
          {/* Top Row Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {/* Main Large Image (Classroom Training) - Spans 2 Columns */}
            <div className="md:col-span-2 relative w-full h-[320px] sm:h-[440px] md:h-[560px] overflow-hidden bg-white group">
              <ImageFallback
                src="/images/meeting.png"
                alt="Training Lecture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                fallbackText="Training Lecture"
              />
            </div>

            {/* Top Right Stacked Images - 1 Column */}
            <div className="md:col-span-1 flex flex-col gap-4 md:gap-5">
              {/* Top Right 1: Desk Officer (hello.png) */}
              <div className="relative w-full h-[200px] sm:h-[250px] md:h-[270px] overflow-hidden bg-white group">
                <ImageFallback
                  src="/images/hello.png"
                  alt="Command Center"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  fallbackText="Command Center"
                />
              </div>

              {/* Top Right 2: Smoke / Fire Extinguisher Training (smoke.png) */}
              <div className="relative w-full h-[200px] sm:h-[250px] md:h-[270px] overflow-hidden bg-white group">
                <ImageFallback
                  src="/images/smoke.png"
                  alt="Smoke Training"
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-500"
                  fallbackText="Tactical Simulation"
                />
              </div>
            </div>
          </div>

          {/* Bottom Row Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-start">
            {/* Bottom Left: Marching Guards (Tall Vertical Image) */}
            <div className="md:col-span-1 relative w-full h-[320px] sm:h-[420px] md:h-[480px] overflow-hidden bg-white group">
              <ImageFallback
                src="/images/confidence.png"
                alt="Field Deployment"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                fallbackText="Field Deployment"
              />
            </div>

            {/* Bottom Center: Precision Personnel Green Card */}
            <div className="md:col-span-1 relative w-full h-[200px] sm:h-[250px] md:h-[270px] bg-[#074724] p-6 sm:p-8 flex flex-col justify-between text-white overflow-hidden">
              <div>
                <h3
                  className="text-xs sm:text-sm font-bold text-[#cba242] uppercase tracking-wider mb-3"
                  style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                >
                  Precision Personnel
                </h3>
                <p className="text-xs sm:text-sm text-green-100/90 leading-relaxed">
                  Our operators undergo 1,200 hours of specialized tactical and psychological training annually.
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <Award className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-300/50 stroke-[1.5]" />
              </div>
            </div>

            {/* Bottom Right: 3 Bouncers (pose.png - Grayscale Image) */}
            <div className="md:col-span-1 relative w-full h-[200px] sm:h-[250px] md:h-[270px] overflow-hidden bg-white group">
              <ImageFallback
                src="/images/pose.png"
                alt="VIP Protection"
                className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-500"
                fallbackText="VIP Protection"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
