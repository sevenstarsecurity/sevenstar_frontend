"use client";

import { Flame, Radio, Video, Wrench, Shield } from "lucide-react";
import React from "react";

const services = [
  { icon: Flame, title: "Fire Audits" },
  { icon: Radio, title: "Rescue Drill" },
  { icon: Video, title: "CCTV Sync" },
  { icon: Wrench, title: "AMC Support" },
];

export const FireSafetyAffiliate: React.FC = () => {
  return (
    <section className="py-12 bg-[#f7faf3]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
        <div className="bg-[#FAF2DF] border border-[#E8D9B5] rounded-xs w-full min-h-[220px] p-8 md:p-12 lg:px-14 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 shadow-2xs relative overflow-hidden">
          
          {/* Subtle Watermark Icon in Top Right */}
          <div className="absolute -right-4 -top-6 opacity-15 pointer-events-none hidden lg:block text-[#C5B487]">
            <Shield className="w-72 h-72 stroke-[1]" />
          </div>

          {/* Left Text Box */}
          <div className="space-y-3.5 text-center lg:text-left max-w-[420px] z-10">
            <span className="bg-[#004E24] text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-xs inline-block">
              PREMIUM AFFILIATE
            </span>
            <h3
              className="font-['Public_Sans'] font-semibold text-2xl md:text-[34px] leading-tight text-[#004E24]"
            >
              Seven Star Fire &amp; Safety
            </h3>
            <p className="text-[#556358] text-xs md:text-[14px] leading-relaxed">
              Our specialized sister concern dedicated to <br className="hidden sm:inline" />
              fire prevention, suppression systems, and <br className="hidden sm:inline" />
              disaster management.
            </p>
          </div>

          {/* Right 4 Equal Cards in a Single Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5 z-10 flex-shrink-0 w-full lg:w-auto">
            {services.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-[#FAF7F0]/90 border border-[#EFE5D0] rounded-xs p-5 flex flex-col items-center justify-center text-center shadow-2xs hover:shadow-md hover:bg-white transition-all duration-200 w-full sm:w-[140px] md:w-[155px] h-[120px] md:h-[130px]"
                >
                  <Icon className="w-7 h-7 text-[#004E24] mb-3 stroke-[1.75]" />
                  <span className="text-xs md:text-[13px] font-bold text-[#181D18] tracking-tight whitespace-nowrap">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
