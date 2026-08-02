"use client";

import React from "react";

export const AboutCtaBanner: React.FC = () => {
  return (
    <section
      className="bg-[#004E24] text-white text-center flex items-center justify-center"
      style={{
        paddingTop: "64px",
        paddingBottom: "64px",
        minHeight: "199px",
        opacity: 1,
      }}
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 w-full">
        {/* Left Text */}
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-[32px] md:text-3xl font-regular tracking-tight">
            Want to learn more about our force?
          </h2>
          <p className="text-emerald-100/80 text-[16px] md:text-sm max-w-xl leading-relaxed">
Explore the professional structure and background of our dedicated security teams.
          </p>
        </div>

        {/* Right CTA Button */}
        <div className="flex-shrink-0">
<a
  href="#contact"
  className="inline-flex w-[235px] h-[56px] items-center justify-center gap-3 bg-[#c8102e] hover:bg-[#a60d25] text-white font-extrabold text-[16px] uppercase tracking-wider rounded-xs shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 group"
>
  <span>MEET OUR TEAM</span>
</a>
        </div>
      </div>
    </section>
  );
};
