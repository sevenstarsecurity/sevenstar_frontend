"use client";

import Link from "next/link";
import React from "react";
import { ImageFallback } from "../ui/ImageFallback";

export interface PageHeroBannerProps {
  title: string;
  label: string;
  breadcrumbTitle: string;
}

export const PageHeroBanner: React.FC<PageHeroBannerProps> = ({ title, label, breadcrumbTitle }) => {
  return (
    <section className="relative text-white overflow-hidden min-h-[260px] md:min-h-[300px] flex items-center justify-center">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">

        <ImageFallback
          src="/images/line.png"
          alt="Seven Star Security Guards"
          className="w-full h-full object-cover object-[center_25%]"
          containerClassName="w-full h-full"
          fallbackText="line.png"
        />


        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(45deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 7.07%, rgba(255, 255, 255, 0) 7.07%, rgba(255, 255, 255, 0) 50%)",
          }}
        />


        {/* Green Overlay */}
        <div className="absolute inset-0 bg-[#0F6835]/80" />

      </div>


      {/* Centered Content */}
      <div className="relative z-10 text-center px-4 py-20">


        {/* Company Label */}
        <p className="text-sm font-medium uppercase tracking-wider text-emerald-200/80 mb-3">
          {label}
        </p>


        {/* Main Title */}
        <h1
          className="font-semibold text-4xl md:text-5xl lg:text-6xl text-white mb-5 leading-snug animate-title-reveal"
        >
          <span className="inline-block animate-title-glow">{title}</span>
        </h1>


        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 text-[16px] font-medium text-white/70">

          <Link
            href="/"
            className="hover:text-white transition-colors duration-200"
          >
            Home
          </Link>

          <span className="text-white/50">
            /
          </span>

          <span className="text-sm md:text-base font-medium text-white/70">
            {breadcrumbTitle}
          </span>

        </nav>


      </div>

    </section>
  );
};