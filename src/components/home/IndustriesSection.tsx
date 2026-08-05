"use client";

import React from "react";
import { industries } from "../../data/industries";
import { Factory, Building2, Shield } from "lucide-react";

export const IndustriesSection: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case "industrial":
        return <Factory className="w-6 h-6 text-white" />;
      case "commercial":
        return <Building2 className="w-6 h-6 text-white" />;
      case "residential":
        return <Shield className="w-6 h-6 text-white" />;
      default:
        return <Shield className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        {/* Section Header */}
        <span className="text-[14px] font-semibold tracking-widest text-[#c8102e] uppercase block mb-2">
          SECTOR EXCELLENCE
        </span>
        <h2 className="text-3xl md:text-[40px] font-semibold text-[#0b4226] tracking-[2px] mb-4">
          INDUSTRIES WE SERVE
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed mb-12">
          We specialize in providing tailored security frameworks for high-risk and complex<br></br>
          environments across Nepal.
        </p>

        {/* 3 Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {industries.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50/70 rounded-xl p-8 border border-gray-100 hover:border-emerald-400 shadow-xl hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Circular Colored Icon */}
              <div
                className={`w-16 h-16 rounded-full ${item.badgeBg} flex items-center justify-center mb-6 shadow-md transform group-hover:scale-110 transition-transform duration-300`}
              >
                {getIcon(item.iconType)}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-[#0b4226] mb-3 group-hover:text-[#c8102e] transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[#3F4940] text-[16px] md:text-[16px] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
