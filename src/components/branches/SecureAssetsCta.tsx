"use client";

import React from "react";

export const SecureAssetsCta: React.FC = () => {
  return (
    <section
      className="flex items-center justify-center text-white text-center"
      style={{
        backgroundColor: "#004E24",
        paddingTop: "64px",
        paddingBottom: "64px",
        minHeight: "180px",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8 w-full">
        {/* Left */}
        <div className="text-center md:text-left space-y-2">
          <p className="text-emerald-200/70 text-xs font-semibold uppercase tracking-[0.25em]">
            Seven Star Security Services Pvt. Ltd. | All Rights Reserved
          </p>
<h2
  className="font-['Barlow_Condensed'] font-semibold text-[36px] md:text-[56px] leading-[40px] md:leading-[61.6px] tracking-[-1.12px] text-center text-[#004E24]"
>
  SECURE YOUR ASSETS TODAY
</h2>
        </div>

        {/* Right CTA Button */}
<div className="flex-shrink-0">
  <a
    href="#contact"
    className="inline-block bg-[#c8102e] hover:bg-[#a60d25] text-[#FFFFFF] font-['Barlow_Condensed'] font-medium text-[18px] md:text-[24px] leading-[24px] md:leading-[31.2px] tracking-[0px] text-center uppercase px-8 py-4 rounded-xs shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
  >
    CONTACT NEAREST BRANCH
  </a>
</div>
      </div>
    </section>
  );
};
