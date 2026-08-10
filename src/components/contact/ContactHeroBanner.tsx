"use client";

import { Clock, Mail, Share2 } from "lucide-react";
import React from "react";

export const ContactHeroBanner: React.FC = () => {
  return (
    <section className="relative bg-[#004E24] pt-14 pb-24 md:pt-18 md:pb-28 text-white">
      {/* Background Subtle Gradient & Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#003d1c] via-[#004E24] to-[#004E24] opacity-95" />

      {/* Main Content */}
      <div className="relative z-10 max-w-[1152px] mx-auto px-6 md:px-10 lg:px-12">
        {/* Main Title */}
        <h1
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-tight mb-4 max-w-3xl"
          style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
        >
          OPERATIONAL<br />CORRESPONDENCE
        </h1>

        {/* Description Subtitle */}
        <p
          className="text-emerald-100/90 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed mb-10 text-center md:text-left mx-auto md:mx-0"
          style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
        >
          Our specialized task force is available 24/7 for strategic planning, risk consultation, and immediate field response. Connect with our command center today.
        </p>

        {/* 3 Contact Rectangular Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20 -mb-36 md:-mb-44">
          {/* Card 1 */}
          <div className="bg-white rounded-none p-6 shadow-md border border-gray-200 flex flex-col justify-between text-gray-900 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[160px]">
            <div>
              <div className="w-10 h-10 rounded-none bg-emerald-50 text-[#004E24] flex items-center justify-center mb-4 group-hover:bg-[#004E24] group-hover:text-white transition-colors duration-300">
                <Share2 className="w-5 h-5" />
              </div>
              <h3
                className="text-sm font-extrabold text-gray-900 uppercase tracking-wide mb-1"
                style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
              >
                CORPORATE HQ
              </h3>
              <p className="text-xs text-gray-500 mb-4">Chandol-4, Kathmandu, Nepal</p>
            </div>
            <p className="text-xs md:text-sm font-extrabold text-[#004E24] tracking-wider">
              01-4542880
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-none p-6 shadow-md border border-gray-200 flex flex-col justify-between text-gray-900 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[160px]">
            <div>
              <div className="w-10 h-10 rounded-none bg-emerald-50 text-[#004E24] flex items-center justify-center mb-4 group-hover:bg-[#004E24] group-hover:text-white transition-colors duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <h3
                className="text-sm font-extrabold text-gray-900 uppercase tracking-wide mb-1"
                style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
              >
                ELECTRONIC COMMS
              </h3>
              <p className="text-xs text-gray-500 mb-4">Secure encrypted communication line</p>
            </div>
            <p className="text-xs md:text-sm font-extrabold text-[#004E24] tracking-wider underline break-all">
              SEVENSTARSECURITIES@GMAIL.COM
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-none p-6 shadow-md border border-gray-200 flex flex-col justify-between text-gray-900 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[160px]">
            <div>
              <div className="w-10 h-10 rounded-none bg-emerald-50 text-[#004E24] flex items-center justify-center mb-4 group-hover:bg-[#004E24] group-hover:text-white transition-colors duration-300">
                <Clock className="w-5 h-5" />
              </div>
              <h3
                className="text-sm font-extrabold text-gray-900 uppercase tracking-wide mb-1"
                style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
              >
                SERVICE HOURS
              </h3>
              <p className="text-xs text-gray-500 mb-4">Global field operations active</p>
            </div>
            <p className="text-xs md:text-sm font-extrabold text-[#004E24] tracking-wider">
              24/7/365 DEPLOYMENT
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
