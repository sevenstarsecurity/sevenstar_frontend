"use client";

import React from "react";

export const JoinEliteForce: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-[#f7faf3] text-center border-t border-gray-100">
      <div className="max-w-[1000px] mx-auto px-4 space-y-8">
        {/* Title & Subtitle */}
        <div className="space-y-3">
<h2
  className="uppercase text-center"
  style={{
    fontFamily: "Barlow Condensed, sans-serif",
    fontWeight: 600,
    fontStyle: "normal",
    fontSize: "56px",
    lineHeight: "61.6px",
    letterSpacing: "-1.9px",
    verticalAlign: "middle",
    textTransform: "uppercase",
    color: "#004E24",
  }}
>
  JOIN THE ELITE FORCE
</h2>
<p
  className="text-center max-w-xl mx-auto"
  style={{
    fontFamily: "sans-serif",
    fontWeight: 300,
    fontStyle: "normal",
    fontSize: "18px",
    lineHeight: "32.4px",
    letterSpacing: "0.9px",
    verticalAlign: "middle",
    color: "#3F4940",
  }}
>
  Are you ready to redefine your potential? We are actively recruiting former service members and dedicated civilians for our next intake.
</p>
        </div>

        {/* 2 Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href="/contact"
            className="w-full sm:w-auto bg-[#c8102e] hover:bg-[#a60d25] text-white font-normal text-[18px] uppercase tracking-wider px-8 py-4 rounded-xs shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            APPLY FOR RECRUITMENT
          </a>

          <a
            href="/branches"
            className="w-full sm:w-auto border border-[#0b4226] text-[#0b4226] hover:bg-[#0b4226] hover:text-white font-normal text-[18px] uppercase tracking-wider px-8 py-4 rounded-xs transition-all duration-200 transform hover:-translate-y-0.5"
          >
            CORPORATE PARTNERSHIP
          </a>
        </div>

        {/* Subtext */}
        <p className="text-gray-400 text-[16px] font-medium tracking-wide pt-4">
          Seven Star Security is an Equal Opportunity Employer. ISO 9001:2015 Certified.
        </p>
      </div>
    </section>
  );
};
