"use client";

import React from "react";
import { ImageFallback } from "../ui/ImageFallback";
import { MapPin, ArrowRight } from "lucide-react";
import { Barlow_Condensed, Public_Sans } from "next/font/google";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500"],
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export const PresenceSection: React.FC = () => {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
        <div className="relative rounded overflow-hidden shadow-2xl min-h-[320px] sm:min-h-[500px] flex items-center">

          {/* Background Photo */}
          <div className="absolute inset-0">
            <ImageFallback
              src="/images/Security Operations Background.webp"
              alt="Seven Star Security Personnel Lineup Across Nepal"
              className="w-full h-full object-cover object-center"
              containerClassName="w-full h-full min-h-[320px]"
              fallbackText="Security Operations Background.webp"
            />

            {/* Green Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#004E24]/90 via-[#004E24]/75 to-transparent pointer-events-none" />
          </div>


          {/* Left Text Card Overlay */}
          <div className="relative z-10 p-8 sm:p-12 max-w-xl text-white">

            {/* Heading */}
            <h3
              className={`${barlowCondensed.className} font-medium text-[32px] leading-[38.4px] tracking-[0px] w-[234.59px] h-[39px] mb-4 flex items-center`}
            >
              Nationwide Presence
            </h3>


            {/* Description */}
            <p
              className={`${publicSans.className} font-normal text-base md:text-lg leading-relaxed max-w-md mb-6`}
            >
              From the heart of Kathmandu to the far-western industrial
              zones, we are the trusted shield for Nepal's growing
              economy.
            </p>


            {/* Link */}
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFDF96]">
              <MapPin className="w-4 h-4 text-[#FFDF96]" />

              <span className="text-[#FFDF96]">
                GUARANTEED VIGILANCE
              </span>

              {/* <ArrowRight className="w-4 h-4" /> */}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};