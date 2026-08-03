"use client";

import React from "react";
import Link from "next/link";
import { ImageFallback } from "./ImageFallback";

export const NotFoundUI: React.FC = () => {
  return (
    <main className="min-h-screen w-full bg-[#060913] text-white flex flex-col items-center justify-between p-6 relative overflow-hidden font-sans select-none">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/20 via-[#060913] to-[#060913] pointer-events-none" />

      {/* Top Spacer / Balance */}
      <div className="w-full" />

      {/* Main Centered Card Container */}
      <div className="relative z-10 max-w-2xl w-full mx-auto text-center flex flex-col items-center py-8">

        {/* Company Logo Badge */}
        <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-xl mb-8 flex items-center justify-center">
          <ImageFallback
            src="/images/sevenstarlogo.png"
            alt="Seven Star Security Logo"
            className="h-10 sm:h-12 w-auto object-contain"
            fallbackText="Seven Star Security"
          />
        </div>

        {/* Checkpoint Status Badge */}
        <div className="inline-flex items-center gap-2 mb-4 text-xs sm:text-sm font-mono tracking-widest uppercase text-emerald-400 font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-sm shadow-red-500/50" />
          <span>CHECKPOINT LOG &mdash; NO SIGNAL FOUND</span>
        </div>

        {/* Giant Gradient 404 Text */}
        <h1 className="text-8xl sm:text-9xl md:text-[150px] font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-orange-400 via-red-500 to-red-600 my-1 drop-shadow-2xl">
          404
        </h1>

        {/* Main Subheading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#f83b3b] tracking-wider uppercase mb-5">
          THIS PAGE ISN&apos;T ON OUR BEAT
        </h2>

        {/* Explanation Paragraph */}
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-lg mx-auto font-normal leading-relaxed mb-3">
          Our guards swept every checkpoint but couldn&apos;t locate this location. It may have been moved, renamed, or stood down from duty.
        </p>

        {/* Nepali / English Sub-tagline */}
        <p className="text-emerald-400 font-medium text-sm sm:text-base mb-10 tracking-wide">
          पृष्ठ फेला परेन &mdash; page not found
        </p>

        {/* Return to Base CTA Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-lg shadow-red-950/60 hover:shadow-red-600/40 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
        >
          RETURN TO BASE &rarr;
        </Link>
      </div>

      {/* Footer Status Incident ID */}
      <footer className="relative z-10 w-full text-center pb-4">
        <p className="text-[11px] sm:text-xs font-mono uppercase text-gray-500 tracking-widest">
          INCIDENT #404 &middot; STATUS: UNRESOLVED
        </p>
      </footer>
    </main>
  );
};
