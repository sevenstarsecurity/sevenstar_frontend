"use client";

import React, { useEffect, useRef, useState } from "react";

const modules = [
  {
    num: "01",
    title: "TACTICAL RESPONSE TRAINING",
    description:
      "Specialized skills in rapid extraction, perimeter defense, and non-lethal combat techniques for diverse urban environments.",
  },
  {
    num: "02",
    title: "SURVEILLANCE & INTELLIGENCE",
    description:
      "Training on state-of-the-art monitoring systems, threat detection AI, and reconnaissance methodology.",
  },
  {
    num: "03",
    title: "VIP CLOSE PROTECTION",
    description:
      "Executive-level body guarding including convoy operations, venue screening, and formal etiquette.",
  },
  {
    num: "04",
    title: "LEGAL & ETHICAL CONDUCT",
    description:
      "Comprehensive studies on security law, human rights, and the ethical use of force in the field.",
  },
];

export const AcademicDepth: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-24 bg-white border-t border-gray-100" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-wider text-[#0b4226] uppercase mb-2">
              ACADEMIC DEPTH
            </h2>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              Security is a science. Our curriculum covers every angle from physical combat to digital surveillance and legal compliance.
            </p>
          </div>

          {/* 3 Accent Color Lines */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-[#c8102e] rounded-full" />
            <div className="w-8 h-1 bg-[#0b4226] rounded-full" />
            <div className="w-8 h-1 bg-[#deb853] rounded-full" />
          </div>
        </div>

        {/* 2x2 Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {modules.map((mod, i) => (
            <div
              key={mod.num}
              className={`flex items-start gap-5 p-6 rounded-xl bg-gray-50/70 border border-gray-100 hover:border-emerald-200 shadow-2xs hover:shadow-md transition-all duration-500 group ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Dark Green Square Number Badge */}
              <div className="w-14 h-14 bg-[#0b4226] text-white font-black text-lg flex items-center justify-center rounded-xs flex-shrink-0 shadow-sm group-hover:bg-[#c8102e] transition-colors duration-300">
                {mod.num}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-base font-extrabold text-[#0b4226] mb-2 tracking-wide uppercase">
                  {mod.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed font-normal">
                  {mod.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
