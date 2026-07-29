"use client";

import React, { useEffect, useRef, useState } from "react";
import { ShieldCheck, Settings, TrendingUp } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "GLOBAL CERTIFICATION",
    description:
      "Graduates receive ISO-aligned certifications recognized by international security firms and corporate giants.",
  },
  {
    icon: Settings,
    title: "PSYCHOLOGICAL READINESS",
    description:
      "Training includes de-escalation techniques, threat assessment, and operating under extreme high-pressure scenarios.",
  },
  {
    icon: TrendingUp,
    title: "ACCELERATED CAREER PATH",
    description:
      "Our top-tier graduates are fast-tracked into leadership roles within Seven Star's elite deployment units.",
  },
];

export const DefiningExcellence: React.FC = () => {
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
    <section className="py-20 md:py-24 bg-[#f7faf3]" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12 text-center">
        {/* Section Heading */}
        <div className="mb-14 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-wider text-[#0b4226] uppercase mb-3">
            DEFINING EXCELLENCE
          </h2>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
            Our training program isn't just about physical preparedness; it's about building an elite mindset for modern security challenges.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full w-full mx-auto">
          {pillars.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`bg-white rounded-xs border-t-4 border-t-[#c8102e] border border-gray-200/60 p-8 shadow-xs hover:shadow-lg transition-all duration-500 flex flex-col items-center text-center group ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Red Icon Badge */}
                <div className="w-11 h-11 rounded-full bg-[#c8102e] text-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-base font-extrabold text-[#0b4226] mb-3 tracking-wide uppercase">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-xs leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
