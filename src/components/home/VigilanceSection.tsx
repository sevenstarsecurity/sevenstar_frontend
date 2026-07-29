"use client";

import React from "react";
import { ImageFallback } from "../ui/ImageFallback";

export const VigilanceSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#0F6835] text-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12 text-center">
        {/* Title */}
        <h2 className="text-40px md:text-[40px] font-semibold uppercase tracking-wider mb-3">
          VIGILANCE IN ACTION
        </h2>

        {/* Gold Accent Bar */}
        <div className="w-27 h-1 bg-[#FFDF96] mx-auto mb-16" />

        {/* 3 Image Cards Container - Aligned with Navbar Sevenstar logo & Get A Quote button */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 pb-12 w-full items-start">
          {/* Card 1: Left (Aligned with Sevenstar Logo) */}
          <div className="flex flex-col bg-[#FFDF96] p-[6px] shadow-2xl transition-transform duration-300 hover:-translate-y-1 w-full h-[460px]">
            <div className="w-full h-full overflow-hidden bg-[#08331d]">
              <ImageFallback
                src="/images/salam.png"
                alt="Seven Star Guard Saluting"
                fallbackText="salam.png"
                className="w-full h-full object-cover object-center"
                containerClassName="w-full h-full"
              />
            </div>
          </div>

          {/* Card 2: Center (Staggered offset) */}
          <div className="flex flex-col bg-[#FFDF96] p-[6px] shadow-2xl transition-transform duration-300 hover:translate-y-11 w-full h-[460px] md:mt-12">
            <div className="w-full h-full overflow-hidden bg-[#08331d]">
              <ImageFallback
                src="/images/stand.png"
                alt="Seven Star Security Team Formation"
                fallbackText="stand.png"
                className="w-full h-full object-cover object-center"
                containerClassName="w-full h-full"
              />
            </div>
          </div>

          {/* Card 3: Right (Aligned with Get a Quote Button) */}
          <div className="flex flex-col bg-[#FFDF96] p-[6px] shadow-2xl transition-transform duration-300 hover:-translate-y-1 w-full h-[460px]">
            <div className="w-full h-full overflow-hidden bg-[#08331d]">
              <ImageFallback
                src="/images/mic123.png"
                alt="Seven Star Tactical Radio Officer"
                fallbackText="mic123.png"
                className="w-full h-full object-cover object-center"
                containerClassName="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
