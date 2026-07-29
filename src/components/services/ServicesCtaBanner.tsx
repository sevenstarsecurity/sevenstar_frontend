"use client";

import React from "react";

export const ServicesCtaBanner: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-[#f7faf3]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
        <div className="bg-[#0b4226] text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          {/* Left Text */}
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Not sure which service is right for you?
            </h2>
            <p className="text-emerald-100/80 text-xs md:text-sm leading-relaxed">
              Our experts are ready to help you choose the ideal security framework.
            </p>
          </div>

          {/* Right Button */}
          <div className="flex-shrink-0">
            <a
              href="#contact"
              className="inline-block bg-[#c8102e] hover:bg-[#a60d25] text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-xs shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              REQUEST A FREE CONSULTATION
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
