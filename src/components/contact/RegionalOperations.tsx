"use client";

import React from "react";
import Link from "next/link";

export const RegionalOperations: React.FC = () => {
  const regions = [
    { name: "BIRTAMODE", href: "/branches#birtamode" },
    { name: "BIRGUNJ", href: "/branches#birgunj" },
    { name: "POKHARA", href: "/branches#pokhara" },
    { name: "BHAIRAHAWA", href: "/branches#bhairahawa" },
    { name: "NEPALGUNJ", href: "/branches#nepalgunj" },
  ];

  return (
    <section className="bg-[#f0f5ea] py-14 border-b border-[#e2ebd9]">
      <div className="max-w-[1152px] mx-auto px-6 md:px-10 lg:px-12 text-center">
        {/* Category Label */}
        <span
          className="block text-[11px] font-extrabold tracking-[0.2em] text-[#004E24] uppercase mb-6"
          style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
        >
          REGIONAL OPERATIONS
        </span>

        {/* 5 Sharp Rectangular Branch Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {regions.map((region) => (
            <Link
              key={region.name}
              href={region.href}
              className="bg-[#f0f5ea] border border-[#004E24]/60 hover:bg-[#004E24] text-[#004E24] hover:text-white font-extrabold text-xs tracking-wider uppercase px-6 py-2.5 rounded-none shadow-2xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
            >
              {region.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
