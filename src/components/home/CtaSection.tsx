"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export const CtaSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#f8faf9] text-center border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-12 space-y-8">
        <h2
          className="text-[#0b4226] uppercase"
          style={{
            fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "70.4px",
            letterSpacing: "-1.28px",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          READY TO SECURE YOUR ASSETS WITH<br />
          INSTITUTIONAL-GRADE PROTECTION?
        </h2>

        <div>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-[#c8102e] hover:bg-[#a60d25] text-white font-black text-xs md:text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group"
          >
            <span>YOUR SAFETY IS OUR MISSION — GET IN TOUCH TODAY</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
