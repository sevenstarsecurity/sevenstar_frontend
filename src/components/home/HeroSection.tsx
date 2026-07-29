"use client";

import React from "react";
import { ImageFallback } from "../ui/ImageFallback";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#f7faf6] min-h-[340px] xs:min-h-[400px] sm:min-h-[460px] lg:min-h-[580px] overflow-hidden flex items-center border-b border-gray-100">
      {/* Green Diagonal Background — behind the image, always visible, same proportions on every screen */}
      <div className="absolute right-0 top-0 bottom-0 w-[52%] lg:w-[48%] bg-[#0F6835] z-0 [clip-path:polygon(16%_0,100%_0,100%_100%,0_100%)]" />

      {/* Guard Image — in front of green bg, full visibility, same position on every screen */}
      <div
        className="absolute bottom-0 z-[1]"
        style={{ right: "10%", width: "60%", top: "32px" }}
      >
        <ImageFallback
          src="/images/nobgguard.png"
          alt="Seven Star Security Guard Lineup"
          className="w-full h-full object-contain object-center"
          style={{ transform: "scale(1.05)", transformOrigin: "center center" }}
          fallbackText="police.jpg"
        />
      </div>

      {/* Main Content Container */}
      <div className="max-w-[1600px] mx-auto px-3 xs:px-4 md:px-10 lg:px-12 w-full py-6 xs:py-8 sm:py-12 lg:py-20 relative z-10">
        <div className="w-[46%] sm:w-1/2 lg:max-w-2xl lg:w-auto space-y-1.5 xs:space-y-2 sm:space-y-4 lg:space-y-6">
          {/* Top Subtitle Text */}
          <div>
            <span className="text-[7px] xs:text-[9px] sm:text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#0F6835]">
              WELCOME TO SEVEN STAR SECURITY
            </span>
          </div>

          {/* Main Title */}
          <h1
            className="font-black text-[#0F6835] tracking-normal leading-[1.02] lg:leading-none align-middle"
            style={{
              fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.15rem, 5.5vw, 4.5rem)",
              letterSpacing: "0px",
              verticalAlign: "middle",
            }}
          >
            PROFESSIONAL <br />
            SECURITY &amp; <br />
            PROTECTION
          </h1>

          {/* Description Paragraph */}
          <p className="text-gray-600 text-[8px] xs:text-[10px] sm:text-sm md:text-base leading-relaxed max-w-md">
            Uncompromising security solutions for corporations,{" "}
            <br className="hidden lg:block" />
            events, and critical infrastructure in Nepal. Your safety, our{" "}
            <br className="hidden lg:block" />
            mission.
          </p>

          {/* CTA Button & Vector Green Arrow */}
          <div className="pt-1 sm:pt-2 flex items-center gap-1.5 xs:gap-2 sm:gap-4">
            {/* Discover More Button */}
            <a
              href="#about"
              className="bg-[#0b4226] hover:bg-[#072c19] text-white font-extrabold text-[7px] xs:text-[9px] sm:text-xs uppercase px-2.5 xs:px-3.5 sm:px-7 py-1.5 xs:py-2 sm:py-4 rounded-xs shadow-md transition-all tracking-wider inline-block"
            >
              DISCOVER MORE
            </a>

            {/* Vector Green Arrow Graphic */}
            <div className="w-3 h-3 xs:w-4 xs:h-4 sm:w-8 sm:h-8 flex items-center justify-center flex-shrink-0">
              <ImageFallback
                src="/images/arrow.png"
                alt="Green Arrow Vector"
                className="w-full h-full object-contain"
                fallbackText="arrow.png"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Badges Overlapping the Green Diagonal Seam — same position on every screen */}
      <div className="absolute bottom-2 xs:bottom-4 sm:bottom-10 lg:bottom-14 left-[52%] lg:left-[48%] z-20 flex items-center gap-1 xs:gap-1.5 sm:gap-2">
        {/* Trusted By Badge Image */}
        <div className="h-6 xs:h-9 sm:h-16 md:h-24 flex items-center drop-shadow-2xl flex-shrink-0">
          <ImageFallback
            src="/images/Trusted By Badge.png"
            alt="Trusted By 435+ Clients Badge"
            className="h-full w-auto object-contain"
            fallbackText="Trusted By Badge.png"
          />
        </div>

        {/* ISO Seal Badge Image */}
        <div className="w-8 h-8 xs:w-11 xs:h-11 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center flex-shrink-0 drop-shadow-2xl">
          <ImageFallback
            src="/images/ISO Seal Badge.png"
            alt="ISO Seal Badge"
            className="w-full h-full object-contain"
            fallbackText="ISO Seal Badge.png"
          />
        </div>
      </div>
    </section>
  );
};