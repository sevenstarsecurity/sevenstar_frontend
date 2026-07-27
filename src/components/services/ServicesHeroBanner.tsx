"use client";

import React from "react";
import Link from "next/link";
import { ImageFallback } from "../ui/ImageFallback";

export const ServicesHeroBanner: React.FC = () => {
  return (
    <section className="relative text-white overflow-hidden min-h-[260px] md:min-h-[300px] flex items-center justify-center">
      {/* Background Image — stand.png full cover */}
      <div className="absolute inset-0 z-0">
        <ImageFallback
          src="/images/stand.png"
          alt="Seven Star Security Services"
          className="w-full h-full object-cover object-center"
          containerClassName="w-full h-full"
          fallbackText="stand.png"
        />
        {/* Dark green semi-transparent overlay */}
        <div className="absolute inset-0 bg-[#0b4226]/80" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 text-center px-4 py-20">
        {/* "SERVICES" small label */}
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200/80 mb-3">
          SERVICES
        </p>

        {/* Main Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5 drop-shadow-md">
          Comprehensive security solutions, tailored to you
        </h1>

        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 text-sm font-medium text-white/70">
          <Link href="/" className="hover:text-white transition-colors duration-200">
            Home
          </Link>
          <span className="text-white/50">&gt;</span>
          <span className="text-white font-bold">Services</span>
        </nav>
      </div>
    </section>
  );
};
