"use client";

import React from "react";
import { Barlow_Condensed } from "next/font/google";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const SecureAssetsCta: React.FC = () => {
  return (
    <section className="w-full bg-white border-y border-gray-300">
      {/* Top Dark Green Strip */}
      <div className="w-full bg-[#004e24] py-3.5 px-4 text-center">
        <p className="text-white text-xs md:text-sm font-semibold uppercase tracking-[0.16em]">
          DON&apos;T SEE YOUR CITY? OUR MOBILE UNITS COVER THE ENTIRE NATION.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="w-full py-14 md:py-20 px-6 text-center flex flex-col items-center justify-center">
        <h2
          className={`${barlowCondensed.className} text-[36px] md:text-[54px] lg:text-[60px] font-bold text-[#004e24] uppercase tracking-wide mb-8 leading-tight`}
        >
          SECURE YOUR ASSETS TODAY
        </h2>

        <a
          href="/contact"
          className={`${barlowCondensed.className} inline-block bg-[#c8102e] hover:bg-[#a50b23] text-white font-semibold text-lg md:text-xl uppercase tracking-wider px-8 md:px-10 py-3.5 md:py-4 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0`}
        >
          CONTACT NEAREST BRANCH
        </a>
      </div>
    </section>
  );
};
