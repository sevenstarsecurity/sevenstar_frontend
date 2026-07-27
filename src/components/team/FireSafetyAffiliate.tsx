"use client";

import { Flame, ShieldCheck, Video, Wrench } from "lucide-react";
import React from "react";

const services = [
  { icon: Flame, title: "Fire Audits" },
  { icon: ShieldCheck, title: "Rescue Drill" },
  { icon: Video, title: "CCTV Sync" },
  { icon: Wrench, title: "AMC Support" },
];

export const FireSafetyAffiliate: React.FC = () => {
  return (
    <section className="py-12 bg-[#f7faf3]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-12">
<div
  className="bg-[#FFDF964D] border-2 border-[#FFDF96] rounded-2xl w-[1152px] h-[273px] mx-auto p-[48px] flex flex-row items-center justify-between gap-[48px] shadow-xs relative overflow-hidden"
>
          {/* Subtle watermark icon in background */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block">
            <Flame className="w-64 h-64 text-[#deb853]" />
          </div>

          {/* Left Text Box */}
          <div className="space-y-3 text-center lg:text-left max-w-xl z-10">
            <span className="bg-[#0b4226] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-xs inline-block">
              PREMIUM AFFILIATE
            </span>
<h3
  className="
    font-['Public_Sans']
    font-normal
    text-[32px]
    leading-[38.4px]
    tracking-[0px]
    text-[#004E24]
  "
>
  Seven Star Fire &amp; Safety
</h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              Our specialized sister concern dedicated to <br></br>fire prevention, suppression systems, and <br></br>disaster management.
            </p>
          </div>

          {/* Right 4 Service Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full lg:w-auto z-10">
            {services.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white/80 border border-[#eddba9]/60 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-2xs hover:shadow-md hover:bg-white transition-all duration-200 min-w-[110px]"
                >
                  <div className="w-8 h-8 rounded-full bg-[#f7eed4] flex items-center justify-center mb-2 text-[#0b4226]">
                    <Icon className="w-4 h-4 text-[#0b4226]" />
                  </div>
                  <span className="text-xs font-extrabold text-gray-900 tracking-wide">
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
