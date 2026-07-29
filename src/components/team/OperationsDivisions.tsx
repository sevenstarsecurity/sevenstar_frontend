"use client";

import { ArrowRight, MapPin, Radio, Shield, ShieldCheck } from "lucide-react";
import React, { useState } from "react";

const tabs = [
  "FIELD OPERATIONS",
  "ADMINISTRATION",
  "SURVEILLANCE UNIT",
  "TRAINING WING",
];

const divisions = [
  {
    num: "01",
    icon: MapPin,
    title: "Vanguard Units",
    description:
      "Elite field officers trained in emergency response and riot control protocols.",
  },
  {
    num: "02",
    icon: Shield,
    title: "Asset Protection",
    description:
      "Specialized units for high-value asset transit and bank vault security management.",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "VIP Close Protection",
    description:
      "Executive protection specialists providing discreet 24/7 personal security shields.",
  },
  {
    num: "04",
    icon: Radio,
    title: "Response Command",
    description:
      "Centralized coordination hub for all active deployments and rapid distress signals.",
  },
];

export const OperationsDivisions: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-20 md:py-24 bg-[#f4f7f5]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 border-b border-gray-200 pb-4 mb-14">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTab(idx)}
              className={`text-xs md:text-sm font-extrabold tracking-wider transition-all relative py-2 ${
                activeTab === idx
                  ? "text-[#0b4226] after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-0.5 after:bg-[#0b4226]"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 4 Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {divisions.map((div) => {
            const Icon = div.icon;
            return (
              <div
                key={div.num}
                className="bg-white rounded-xs border-t-4 border-t-[#c8102e] border border-gray-200/60 p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Header: Red Icon + Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-[#c8102e]">
                      <Icon className="w-5 h-5 text-[#c8102e]" />
                    </div>
                    <span className="text-xs font-bold text-gray-400">
                      {div.num}
                    </span>
                  </div>

                  {/* Title */}
<h3 className="font-['Barlow_Condensed'] font-medium text-[24px] leading-[31.2px] tracking-[0px] text-[#004E24] mb-3 transition-colors">
  {div.title}
</h3>

                  {/* Description */}
                  <p className="text-gray-600 text-xs leading-relaxed mb-6">
                    {div.description}
                  </p>
                </div>

                {/* View Division Link */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0b4226] uppercase tracking-wider hover:text-[#c8102e] transition-colors group/link pt-2"
                >
                  <span>View Division</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
