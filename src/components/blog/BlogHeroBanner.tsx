"use client";

import React from "react";
import Link from "next/link";
import { ImageFallback } from "../ui/ImageFallback";

export const BlogHeroBanner: React.FC = () => {
  return (
    <section className="relative w-full h-[260px] md:h-[320px] bg-[#0b4226] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageFallback
          src="/images/Security Operations Background.png"
          alt="Seven Star Security Background"
          className="w-full h-full object-cover opacity-25"
          fallbackText="Security Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b4226]/80 via-[#0b4226]/90 to-[#0b4226]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Category Tag */}
        <span
          className="text-[11px] font-semibold tracking-[0.25em] text-emerald-200 uppercase mb-3"
          style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
        >
          [ COMPANY ]
        </span>

        {/* Main Title */}
        <h1
          className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4"
          style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
        >
          Security news, tips & updates
        </h1>

        {/* Breadcrumb Links */}
        <div
          className="flex items-center space-x-2 text-xs text-emerald-100/70 font-medium"
          style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-white">Blog</span>
        </div>
      </div>
    </section>
  );
};
