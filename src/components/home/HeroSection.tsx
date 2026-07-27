"use client";

import React from "react";
import { ImageFallback } from "../ui/ImageFallback";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#f7faf6] min-h-[500px] lg:min-h-[580px] overflow-hidden flex items-center border-b border-gray-100">
      {/* Right Side Angled Green Diagonal Background / Guard Photo */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[48%] bg-[#0a522c] z-0 [clip-path:polygon(16%_0,_100%_0,_100%_100%,_0_100%)] hidden lg:block">
        <ImageFallback
          src="/images/police.jpg"
          alt="Seven Star Security Guard Lineup"
          className="w-full h-full object-cover object-center opacity-90"
          fallbackText="police.jpg"
        />
        {/* Dark green overlay tint */}
        <div className="absolute inset-0 bg-[#0a522c]/40" />
      </div>

      {/* Main Content Container */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12 w-full py-12 lg:py-20 relative z-10">
        <div className="max-w-2xl space-y-6">
          {/* Top Subtitle Text */}
          <div>
            <span className="text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#0F6835]">
              WELCOME TO SEVEN STAR SECURITY
            </span>
          </div>

          {/* Main Title */}
          <h1
            className="font-black text-[#0F6835] tracking-normal leading-none align-middle"
            style={{
              fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
              fontWeight: 800,
              fontSize: "72px",
              lineHeight: "72px",
              letterSpacing: "0px",
              verticalAlign: "middle",
            }}
          >
            PROFESSIONAL <br />
            SECURITY &amp; <br />
            PROTECTION
          </h1>

          {/* Description Paragraph */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-md">
            Uncompromising security solutions for corporations, <br />
            events, and critical infrastructure in Nepal. Your safety, our <br />
            mission.
          </p>

          {/* CTA Button & Vector Green Arrow */}
          <div className="pt-2 flex items-center gap-4">
            {/* Discover More Button */}
            <a
              href="#about"
              className="bg-[#0b4226] hover:bg-[#072c19] text-white font-extrabold text-xs uppercase px-7 py-4 rounded-xs shadow-md transition-all tracking-wider inline-block"
            >
              DISCOVER MORE
            </a>

            {/* Vector Green Arrow Graphic */}
            <div className="w-8 h-8 flex items-center justify-center">
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

      {/* Badges Overlapping the Green Diagonal Seam (5% on white side, rest on green side) */}
      <div className="relative lg:absolute bottom-8 lg:bottom-14 left-6 lg:left-[48%] z-20 flex items-center gap-1.5 sm:gap-2 px-6 lg:px-0 pt-4 lg:pt-0">
        {/* Trusted By Badge Image */}
        <div className="h-16 md:h-24 flex items-center drop-shadow-2xl flex-shrink-0">
          <ImageFallback
            src="/images/Trusted By Badge.png"
            alt="Trusted By 435+ Clients Badge"
            className="h-16 md:h-24 w-auto object-contain"
            fallbackText="Trusted By Badge.png"
          />
        </div>

        {/* ISO Seal Badge Image (Increased Size, Tight Gap) */}
        <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center flex-shrink-0 drop-shadow-2xl">
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
