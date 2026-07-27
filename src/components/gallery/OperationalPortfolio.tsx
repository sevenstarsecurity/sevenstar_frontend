"use client";

import { Award } from "lucide-react";
import React, { useState } from "react";
import { ImageFallback } from "../ui/ImageFallback";

export const OperationalPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All View");

  const tabs = ["All View", "Field Ops", "Intelligence", "Facilities"];

  return (
    <section className="bg-[#f0f5ea] py-12 md:py-16 border-t border-[#e2ebd9]">
      <div className="max-w-[1152px] mx-auto px-6 md:px-10 lg:px-12">
        {/* Header Bar with Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10 pb-4 border-b border-gray-200/60">
          {/* Section Heading */}
          <div>
            <h2
              className="text-2xl md:text-3xl font-extrabold text-[#004E24] uppercase tracking-wider relative"
              style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
            >
              OPERATIONAL PORTFOLIO
            </h2>
            <div className="w-16 h-[3px] bg-[#004E24] mt-2" />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-6 text-xs font-semibold">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative py-1 transition-colors ${
                  activeTab === tab
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Top Row - Left Large Image (Spans 7 cols on md) */}
          <div className="md:col-span-7 bg-white overflow-hidden border border-gray-200/80 shadow-xs h-[300px] md:h-[380px] group">
            <ImageFallback
              src="/images/meeting.png"
              alt="Security Guard Training Lecture"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              fallbackText="Training Lecture"
            />
          </div>

          {/* Top Row - Right Stack (Spans 5 cols on md) */}
<div className="md:col-span-5 flex flex-col gap-5">
  {/* Top Right Image */}
  <div className="bg-white overflow-hidden border border-gray-200/80 shadow-xs group w-full md:w-[361px] h-[248px]">
    <ImageFallback
      src="/images/hello.png"
      alt="Command Center Operator"
      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
      fallbackText="Command Center"
    />
  </div>

  {/* Bottom Right Image */}
  <div className="bg-white overflow-hidden border border-gray-200/80 shadow-xs group w-full md:w-[361px] h-[248px]">
    <ImageFallback
      src="/images/smoke.png"
      alt="Tactical Smoke Simulation"
      className="w-full h-full object-cover object-center filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
      fallbackText="Tactical Simulation"
    />
  </div>
</div>

          {/* Bottom Row - 3 Columns Layout with Exact Height 530px Left Image */}
          {/* Bottom Left Image: Exact width ~360.67px (col-span-4), Height: 530px */}
          <div className="md:col-span-4 bg-white overflow-hidden border border-gray-200/80 shadow-xs h-[530px] group">
            <ImageFallback
              src="/images/confidence.png"
              alt="Security Guards Field Deployment"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              fallbackText="Field Deployment"
            />
          </div>

          {/* Bottom Center Solid Green Card (Spans 4 cols on md, Height 250px to align with top of right image) */}
          <div className="md:col-span-4 bg-[#004E24] p-6 md:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden text-white h-[250px]">
            <div>
              <h3
                className="text-sm font-bold text-amber-300 uppercase tracking-wide mb-3"
                style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
              >
                Precision Personnel
              </h3>
              <p
                className="text-xs md:text-sm text-emerald-100/90 leading-relaxed"
                style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
              >
                Our operators undergo 1,200 hours of specialized tactical and psychological training annually.
              </p>
            </div>
            {/* Badge Icon at Bottom Right */}
            <div className="self-end mt-4 text-emerald-300/80">
              <Award className="w-8 h-8 stroke-[1.5]" />
            </div>
          </div>

          {/* Bottom Right Image (Spans 4 cols on md, Height 250px) */}
          <div className="md:col-span-4 bg-white overflow-hidden border border-gray-200/80 shadow-xs h-[250px] group">
            <ImageFallback
              src="/images/pose.png"
              alt="VIP Protection Escort Team"
              className="w-full h-full object-cover object-center filter grayscale group-hover:scale-105 transition-transform duration-500"
              fallbackText="VIP Protection"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
