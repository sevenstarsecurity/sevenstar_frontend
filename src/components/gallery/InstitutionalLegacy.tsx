"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

export const InstitutionalLegacy: React.FC = () => {
  return (
    <section className="bg-[#F1F5ED] py-16 md:py-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Column: Text */}
        <div className="max-w-xl">
          {/* Tag */}
          <span
            className="block text-xs font-bold tracking-[0.2em] text-[#B89C53] uppercase mb-4"
            style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
          >
            INSTITUTIONAL LEGACY
          </span>

          {/* Heading */}
          <h2
            className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#004E24] leading-tight uppercase mb-5"
            style={{
              fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            THE ARCHIVE OF VIGILANCE
          </h2>

          {/* Description */}
          <p
            className="text-[#3F4940] text-sm md:text-base leading-relaxed"
            style={{
              fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
            }}
          >
            A visual testament to our commitment to global security standards, institutional excellence, and the quiet precision of elite protection.
          </p>
        </div>

        {/* Right Column: Gold Double Bordered Crest Box */}
        <div className="flex-shrink-0">
          <div className="w-52 h-44 md:w-60 md:h-48 bg-[#f0f5ea] p-2 border border-[#D4C28D] rounded-xs shadow-xs">
            <div className="w-full h-full border-2 border-[#C6A455] rounded-xs flex flex-col items-center justify-center p-4 bg-[#f0f5ea]">
              <div className="relative flex flex-col items-center justify-center text-[#C6A455]">
                <ShieldCheck className="w-12 h-12 stroke-[1.5]" />
                <span
                  className="mt-2 text-[10px] font-bold tracking-widest text-[#B89C53] uppercase"
                  style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                >
                  EST. 2012
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
