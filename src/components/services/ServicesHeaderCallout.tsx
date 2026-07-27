"use client";

import React from "react";

export const ServicesHeaderCallout: React.FC = () => {
  return (
    <section className="py-12 bg-[#f7faf3] border-b border-gray-200/50">
      <div className="max-w-[1000px] mx-auto px-4 text-center space-y-6">
        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-normal">
          Seven Star Security delivers vetted security personnel and state-of-the-art electronic systems across Nepal, tailored to protect your business, residential, commercial, or industrial properties with uncompromised standard.
        </p>

        <div>
          <a
            href="#contact"
            className="inline-block bg-[#c8102e] hover:bg-[#a60d25] text-white font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xs shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            REQUEST A CUSTOM QUOTE
          </a>
        </div>
      </div>
    </section>
  );
};
