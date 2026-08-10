"use client";

import React from "react";
import { Phone, Mail } from "lucide-react";

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#0b3e24] text-white text-xs border-b border-emerald-800/40 py-2 px-3 md:px-10 lg:px-12">
      <div className="max-w-[1600px] mx-auto flex flex-row justify-center sm:justify-between items-center gap-3 sm:gap-6 overflow-x-auto">
        {/* Contact Details */}
        <div className="flex flex-row items-center gap-3 sm:gap-6 shrink-0">
          
          <a  href="tel:015159997"
            className="flex items-center gap-1 sm:gap-1.5 text-white hover:text-gray-200 transition-colors shrink-0"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white shrink-0" />
            <span className="text-white font-medium text-[9px] xs:text-[10px] sm:text-xs whitespace-nowrap">
              01-59159997, 01-5920997
            </span>
          </a>
          
           <a href="mailto:info@sevenstar.com.np"
            className="flex items-center gap-1 sm:gap-1.5 text-white hover:text-gray-200 transition-colors shrink-0"
          >
            <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white shrink-0" />
            <span className="text-white font-normal tracking-wider text-[9px] xs:text-[10px] sm:text-xs whitespace-nowrap">
              info@sevenstar.com.np
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};