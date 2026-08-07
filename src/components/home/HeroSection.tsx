"use client";

import { motion } from "framer-motion";
import React from "react";
import { ImageFallback } from "../ui/ImageFallback";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#f7faf6] min-h-[300px] xs:min-h-[360px] sm:min-h-[460px] lg:min-h-[580px] overflow-hidden flex items-center border-b border-gray-100">
      {/* Green Diagonal Background */}
      <div className="absolute right-0 top-0 bottom-0 w-[52%] lg:w-[48%] bg-[#0F6835] z-0 [clip-path:polygon(16%_0,100%_0,100%_100%,0_100%)]" />

      {/* Guard Image */}
      <div
        className="absolute bottom-0 z-[1] right-[2%] w-[52%] top-[70px] xs:top-[80px] xs:right-[3%] xs:w-[54%] sm:right-[10%] sm:w-[60%] sm:top-[105px]"
      >
        <ImageFallback
          src="/images/nobgguard.webp"
          alt="Seven Star Security Guard Lineup"
          className="w-full h-full object-contain object-bottom sm:object-center"
          style={{
            transform: "scale(1.1)",
            transformOrigin: "bottom center",
          }}
          fallbackText="nobgguard.webp"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-3 xs:px-4 md:px-10 lg:px-12 w-full py-6 xs:py-8 sm:py-12 lg:py-20 relative z-10">
        <div className="w-[44%] xs:w-[45%] sm:w-1/2 lg:max-w-2xl lg:w-auto space-y-2 xs:space-y-2.5 sm:space-y-4 lg:space-y-6">
          {/* Subtitle */}
          <div>
            <span className="text-[8px] xs:text-[9px] sm:text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#0F6835]">
              WELCOME TO SEVEN STAR SECURITY
            </span>
          </div>

          {/* Title */}
          <motion.h1
            className="font-black text-[#0F6835] tracking-normal leading-[1.05] lg:leading-none"
            style={{
              fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.35rem, 6vw, 4.5rem)",
              letterSpacing: "0px",
            }}
          >
            <motion.span
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="block"
            >
              PROFESSIONAL
            </motion.span>

            <motion.span
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="block"
            >
              SECURITY &amp;
            </motion.span>

            <motion.span
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="block"
            >
              PROTECTION
            </motion.span>
          </motion.h1>

          {/* Description */}
          <p className="text-gray-600 text-[7px] xs:text-[9px] sm:text-sm md:text-base leading-snug xs:leading-relaxed max-w-md">
            Uncompromising security solutions for corporations,
            <br className="hidden lg:block" />
            events, and critical infrastructure in Nepal. Your safety, our
            <br className="hidden lg:block" />
            mission.
          </p>

          {/* CTA */}
          <div className="pt-1 sm:pt-2 flex items-center gap-1.5 xs:gap-2 sm:gap-4">
            <a
              href="/about"
              className="bg-[#0b4226] hover:bg-[#072c19] text-white font-extrabold text-[6.5px] xs:text-[8px] sm:text-xs uppercase px-2 xs:px-3 sm:px-7 py-1.5 xs:py-2 sm:py-4 rounded-xs shadow-md transition-all tracking-wider inline-block whitespace-nowrap"
            >
              DISCOVER MORE
            </a>

            <div className="w-5 h-5 xs:w-7 xs:h-7 sm:w-16 sm:h-16 flex items-center justify-center flex-shrink-0 ml-2 mt-3 translate-x-1 -translate-y-5">
              <ImageFallback
                src="/images/arrow.webp"
                alt="Green Arrow Vector"
                className="w-full h-full object-contain"
                fallbackText="arrow.webp"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="absolute bottom-2 xs:bottom-4 sm:bottom-10 lg:bottom-14 left-[52%] lg:left-[48%] z-20 flex items-center gap-1 xs:gap-1.5 sm:gap-2">
        <div className="h-5 xs:h-8 sm:h-16 md:h-24 flex items-center drop-shadow-2xl flex-shrink-0">
          <ImageFallback
            src="/images/Trusted By Badge.webp"
            alt="Trusted By 435+ Clients Badge"
            className="h-full w-auto object-contain"
            fallbackText="Trusted By Badge.webp"
          />
        </div>

        <div className="w-7 h-7 xs:w-10 xs:h-10 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center flex-shrink-0 drop-shadow-2xl">
          <ImageFallback
            src="/images/ISO Seal Badge.webp"
            alt="ISO Seal Badge"
            className="w-full h-full object-contain"
            fallbackText="ISO Seal Badge.webp"
          />
        </div>
      </div>
    </section>
  );
};