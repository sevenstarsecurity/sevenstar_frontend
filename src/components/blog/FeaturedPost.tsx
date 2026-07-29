"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ImageFallback } from "../ui/ImageFallback";

export const FeaturedPost: React.FC = () => {
  return (
    <section className="bg-[#f0f5ea] pt-12 md:pt-16 pb-8">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
        {/* Featured Card Wrapper with Top Red Line */}
        <div className="relative bg-white shadow-md border border-gray-200/80 overflow-hidden border-t-4 border-t-[#c8102e] group transition-all duration-300 hover:shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Image Column (Spans 6 cols on lg) */}
            <div className="lg:col-span-6 relative h-[260px] sm:h-[320px] lg:h-auto overflow-hidden">
              <ImageFallback
                src="/images/girl typing.jpg"
                alt="Seven Star Security Command Center"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                fallbackText="Command Center"
              />
              {/* Featured Badge */}
              <div className="absolute top-4 left-4 bg-[#004E24] text-white text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-xs shadow-xs">
                FEATURED
              </div>
            </div>

            {/* Right Content Column (Spans 6 cols on lg) */}
            <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
              <div>
                {/* Meta Row: Category + Date */}
                <div className="flex items-center space-x-3 mb-4">
                  <span
                    className="bg-[#e6f0e4] text-[#004E24] text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-xs"
                    style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                  >
                    COMPANY NEWS
                  </span>
                  <span className="text-xs text-gray-500 font-medium">Oct 24, 2024</span>
                </div>

                {/* Title */}
                <h2
                  className="text-xl sm:text-2xl lg:text-[40px] text-#181D18 group-hover:text-[#004E24] transition-colors leading-tight mb-4"
                  style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                >
                  <Link href="#featured-article">
                    Strategic Expansion: Seven Star Security Launches Rapid Response Hub in Butwal
                  </Link>
                </h2>

                {/* Excerpt */}
                <p
                  className="text-gray-600 text-xs sm:text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                >
                  We are proud to announce the inauguration of our newest tactical operational base, bringing sub-10 minute emergency response times to the industrial heart of the Western region...
                </p>
              </div>

              {/* Author & CTA Row */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                {/* Author Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                    <ImageFallback
                      src="/images/purna.png"
                      alt="Rajan Thapa"
                      className="w-full h-full object-cover"
                      fallbackText="RT"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Rajan Thapa</h4>
                    <p className="text-[11px] text-gray-500">Chief of Operations</p>
                  </div>
                </div>

                {/* Read Story Link */}
                <Link
                  href="#featured-article"
                  className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-[#004E24] hover:text-[#0b4226] tracking-wider uppercase group/link"
                  style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                >
                  <span>READ STORY</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
