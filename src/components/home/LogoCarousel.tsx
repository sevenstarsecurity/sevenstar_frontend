"use client";

import React from "react";
import { companyLogos } from "../../data/companyLogos";
import { ImageFallback } from "../ui/ImageFallback";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const LogoCarousel: React.FC = () => {
  // Multiply items to ensure seamless infinite scroll across full screen width
  const marqueeLogos = [
    ...companyLogos,
    ...companyLogos,
    ...companyLogos,
    ...companyLogos,
  ];

  return (
    <div className="bg-white py-6 border-b border-gray-100 relative overflow-hidden w-full">
      {/* Full width container touching complete left to right edge */}
      <div className="w-full relative">
        {/* Left Arrow Icon Indicator */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 text-gray-400">
          <ChevronLeft className="w-5 h-5" />
        </div>

        {/* Right Arrow Icon Indicator */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 text-gray-400">
          <ChevronRight className="w-5 h-5" />
        </div>

        {/* Infinite Scroll Container Touching Complete Left to Right */}
        <div className="flex overflow-hidden select-none w-full">
          <div className="flex items-center space-x-12 md:space-x-16 animate-slow-marquee hover:[animation-play-state:paused] py-2">
            {marqueeLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex items-center justify-center flex-shrink-0 h-14 w-40 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105"
              >
                <ImageFallback
                  src={logo.src}
                  alt={logo.alt}
                  fallbackText={logo.src.split("/").pop()}
                  className="max-h-12 max-w-[140px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
