"use client";

import { ArrowRight } from "lucide-react";
import React from "react";

export const CtaSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#f8faf9] text-center border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-12 space-y-8">
        <h2 className="text-[#0b4226] uppercase text-[46px] md:text-4xl lg:text-5xl font-bold tracking-[0.1px] leading-snug">
          READY TO SECURE YOUR ASSETS WITH<br />
          INSTITUTIONAL-GRADE PROTECTION?
        </h2>

        <div>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#c8102e] hover:bg-[#a60d25] text-white font-bold text-sm md:text-base uppercase tracking-wider px-6 md:px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group"
          >
            <span>YOUR SAFETY IS OUR MISSION — GET IN TOUCH TODAY</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
