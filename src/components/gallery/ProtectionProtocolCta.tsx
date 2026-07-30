"use client";

import React from "react";
import Link from "next/link";

export const ProtectionProtocolCta: React.FC = () => {
  return (
    <section className="bg-[#004E24] py-16 md:py-24 text-white">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12 text-center flex flex-col items-center justify-center">
        {/* Title */}
        <h2
          className="text-2xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight mb-4"
          style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
        >
          BEGIN YOUR PROTECTION PROTOCOL
        </h2>

        {/* Description */}
        <p
          className="text-emerald-100/90 text-sm md:text-base max-w-2xl mb-10 leading-relaxed"
          style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
        >
          Request an institutional audit or a confidential briefing with our executive specialists.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Red Solid Button */}
          <Link
            href="#contact"
            className="w-full sm:w-auto bg-[#c8102e] hover:bg-[#a60d25] text-white font-bold text-xs uppercase px-8 py-4 rounded-xs shadow-md transition-all duration-200 tracking-wider text-center"
            style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
          >
            SECURE BRIEFING REQUEST
          </Link>

          {/* Outlined Green/Dark Button */}
          <a
            href="#download"
            className="w-full sm:w-auto bg-[#003d1c] hover:bg-[#002e15] border border-[#00662f] text-white font-bold text-xs uppercase px-8 py-4 rounded-xs shadow-md transition-all duration-200 tracking-wider text-center"
            style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
          >
            DOWNLOAD PORTFOLIO
          </a>
        </div>
      </div>
    </section>
  );
};
