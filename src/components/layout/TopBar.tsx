"use client";

import React from "react";
import { Phone, Mail, Award, Briefcase } from "lucide-react";

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#0b3e24] text-white text-xs border-b border-emerald-800/40 py-2 px-4 md:px-10 lg:px-12">
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Left Side: Contact Details */}
        <div className="flex items-center space-x-6">
          <a
            href="tel:"
            className="flex items-center gap-1.5 text-white hover:text-gray-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-white" />
            <span className="text-white font-medium">01-59159997, 01-5920997</span>
          </a>
          <a
            href="mailto:info@sevenstar.com.np"
            className="flex items-center gap-1.5 text-white hover:text-gray-200 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-white" />
            <span className="text-white font-normal tracking-wider">info@sevenstar.com.np</span>
          </a>
        </div>

        {/* Right Side: Links */}
        <div className="flex items-center space-x-4 font-medium text-[11px] uppercase tracking-wider text-white">
          <a
            href="#careers"
            className="flex items-center gap-1 text-white hover:text-gray-200 transition-colors"
          >
            <Briefcase className="w-3 h-3 text-white" />
            <span className="text-white">Careers</span>
          </a>
          <span className="text-white">|</span>
          <a
            href="#iso"
            className="flex items-center gap-1 text-white hover:text-gray-200 transition-colors"
          >
            <Award className="w-3 h-3 text-white" />
            <span className="text-white">ISO Certifications</span>
          </a>
        </div>
      </div>
    </div>
  );
};
