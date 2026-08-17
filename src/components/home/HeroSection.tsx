"use client";

import { motion } from "framer-motion";
import React from "react";
import { ImageFallback } from "../ui/ImageFallback";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#f7faf6] min-h-[300px] sm:min-h-[460px] lg:min-h-[580px] overflow-hidden flex items-center border-b border-gray-100">
      {/* Green Diagonal Background - same clip-path/position ratio at every size */}
      <div className="absolute right-0 top-0 bottom-0 w-[52%] lg:w-[48%] bg-[#0F6835] z-0 [clip-path:polygon(16%_0,100%_0,100%_100%,0_100%)]" />

      {/* Guard Image - fixed position so it doesn't shift on page reload */}
      <div className="absolute bottom-0 z-[1] right-0 w-[78%] sm:w-[60%] top-0 sm:top-[60px]">
        <ImageFallback
          src="/images/singguard.webp"
          alt="Seven Star Security Guard"
          className="w-full h-full object-contain object-[88%_center] sm:hidden"
          priority={true}
          style={{
            transform: "scale(1.04)",
            transformOrigin: "center center",
          }}
          fallbackText="singguard.webp"
        />
        <ImageFallback
          src="/images/groupguard.webp"
          alt="Seven Star Security Guard Lineup"
          className="w-full h-full object-contain object-center hidden sm:block"
          priority={true}
          style={{
            transform: "scale(1.04)",
            transformOrigin: "center center",
          }}
          fallbackText="groupguard.webp"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-10 lg:px-12 w-full py-6 sm:py-12 lg:py-20 relative z-10">
        <div className="w-1/2 lg:max-w-2xl lg:w-auto space-y-1.5 sm:space-y-4 lg:space-y-6">
          {/* Subtitle */}
          <div>
            <span
              className="font-extrabold uppercase tracking-widest text-[#0F6835]"
              style={{ fontSize: "clamp(7px, 2.1vw, 14px)" }}
            >
              WELCOME TO SEVEN STAR SECURITY
            </span>
          </div>

          {/* Title */}
          <motion.h1
            className="font-black text-[#0F6835] tracking-normal leading-[1.02] lg:leading-none"
            style={{
              fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.15rem, 5.5vw, 4.5rem)",
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

          {/* Description — MOBILE only (< sm): 4 explicit lines */}
          <p
            className="sm:hidden text-gray-600 leading-relaxed max-w-[44vw]"
            style={{ fontSize: "clamp(9px, 1.9vw, 16px)" }}
          >
            Uncompromising security solutions
            <br />
            for corporations, events, and
            <br />
            critical infrastructure in Nepal.
            <br />
            Your safety, our mission.
          </p>

          {/* Description — DESKTOP (sm+): original layout, untouched */}
          <p
            className="hidden sm:block text-gray-600 leading-relaxed max-w-md"
            style={{ fontSize: "clamp(7px, 1.9vw, 16px)" }}
          >
            Uncompromising security solutions for corporations,
            <br className="hidden lg:block" />
            events, and critical infrastructure in Nepal. Your safety, our
            <br className="hidden lg:block" />
            mission.
          </p>


          {/* CTA */}
          <div className="pt-1 sm:pt-2 flex items-center gap-1.5 sm:gap-4">
            <a
              href="/about"
              className="bg-[#0b4226] hover:bg-[#072c19] text-white font-extrabold uppercase rounded-xs shadow-md transition-all tracking-wider inline-block whitespace-nowrap"
              style={{
                fontSize: "clamp(6.5px, 1.7vw, 12px)",
                padding: "clamp(6px, 1.6vw, 16px) clamp(10px, 3vw, 28px)",
              }}
            >
              DISCOVER MORE
            </a>

            <div
              className="flex items-center justify-center flex-shrink-0 ml-2 translate-x-1 -translate-y-5"
              style={{ width: "clamp(32px, 8vw, 64px)", height: "clamp(32px, 8vw, 64px)" }}
            >
              <ImageFallback
                src="/images/arrow.webp"
                alt="Green Arrow Vector"
                className="w-full h-full object-contain"
                fallbackText="arrow.webp"
              />
            </div>

            {/* Badges inline — mobile only; hidden on sm+ where they use absolute positioning */}
            <div className="sm:hidden flex items-center -space-x-3 ml-auto">
              <div className="flex items-center drop-shadow-xl flex-shrink-0" style={{ height: "clamp(24px, 7vw, 40px)" }}>
                <ImageFallback
                  src="/images/Trusted By Badge.webp"
                  alt="Trusted By 435+ Clients Badge"
                  className="h-full w-auto object-contain"
                  fallbackText="Trusted By Badge.webp"
                />
              </div>
              <div className="flex items-center justify-center flex-shrink-0 drop-shadow-xl" style={{ width: "clamp(24px, 7vw, 40px)", height: "clamp(24px, 7vw, 40px)" }}>
                <ImageFallback
                  src="/images/ISO Seal Badge.webp"
                  alt="ISO Seal Badge"
                  className="w-full h-full object-contain"
                  fallbackText="ISO Seal Badge.webp"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges absolute — desktop/tablet only; mobile uses inline badges in the CTA row */}
      <div className="hidden sm:flex absolute bottom-2 sm:bottom-10 lg:bottom-14 left-[62%] lg:left-[58%] z-20 items-center -space-x-4 sm:-space-x-6">
        <div
          className="flex items-center drop-shadow-2xl flex-shrink-0"
          style={{ height: "clamp(24px, 7vw, 96px)" }}
        >
          <ImageFallback
            src="/images/Trusted By Badge.webp"
            alt="Trusted By 435+ Clients Badge"
            className="h-full w-auto object-contain"
            fallbackText="Trusted By Badge.webp"
          />
        </div>

        <div
          className="flex items-center justify-center flex-shrink-0 drop-shadow-2xl"
          style={{ width: "clamp(32px, 8vw, 112px)", height: "clamp(32px, 8vw, 112px)" }}
        >
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