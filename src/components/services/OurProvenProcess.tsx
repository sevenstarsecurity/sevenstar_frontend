"use client";

import React, { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "1",
    title: "Evaluate",
    description: "Thorough site assessment and risk vulnerability analysis.",
  },
  {
    num: "2",
    title: "Customize",
    description: "Designing a tailored security strategy and protocol.",
  },
  {
    num: "3",
    title: "Deploy",
    description: "Seamless deployment of trained personnel and tech.",
  },
  {
    num: "4",
    title: "Monitor",
    description: "Continuous supervision and 24/7 command center support.",
  },
];

export const OurProvenProcess: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-28 bg-[#f7faf3] overflow-hidden" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-12 text-center">
        {/* Title */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b4226] tracking-tight mb-3">
            Our Proven Process
          </h2>
          <div className="w-16 h-1 bg-[#deb853] mx-auto rounded-full" />
        </div>

        {/* Pipeline Container */}
        <div className="relative">
          {/* Animated Progress Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[3px] bg-gray-200 z-0">
            <div
              className={`h-full bg-gradient-to-r from-[#c8102e] via-[#deb853] to-[#0b4226] transition-all duration-1000 ease-out ${
                visible ? "w-full" : "w-0"
              }`}
            />
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 relative z-10">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`flex flex-col items-center text-center group cursor-default transition-all duration-700 ease-out ${
                  visible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-10 scale-95"
                }`}
                style={{ transitionDelay: `${i * 180 + 200}ms` }}
              >
                {/* Step Circle with Animated Ring on Hover */}
                <div className="relative mb-6">
                  {/* Outer Pulsing Aura Ring on Hover */}
                  <div className="absolute -inset-2 rounded-full bg-[#c8102e]/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 animate-pulse" />

                  {/* Red Circle Number */}
                  <div className="w-14 h-14 rounded-full bg-[#c8102e] text-white flex items-center justify-center font-black text-xl shadow-lg group-hover:bg-[#0b4226] group-hover:scale-110 transition-all duration-300 relative z-10">
                    {step.num}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-extrabold text-gray-900 mb-2.5 tracking-tight group-hover:text-[#0b4226] transition-colors duration-200">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-xs font-normal">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
