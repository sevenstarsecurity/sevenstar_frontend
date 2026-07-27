"use client";

import React, { useEffect, useRef, useState } from "react";

const advisors = [
  {
    name: "General R.N. Malhotra",
    role: "FORMER CHIEF OF STRATEGIC COMMAND",
    quote: `"Seven Star represents the pinnacle of private security discipline in the modern era."`,
  },
  {
    name: "Dr. Sameer Iyengar",
    role: "CYBER WARFARE SPECIALIST",
    quote: `"Their integration of human intelligence with digital surveillance is unmatched."`,
  },
  {
    name: "Aditya Varma",
    role: "INDUSTRIAL SAFETY AUDITOR",
    quote: `"A standard-bearer for compliance and tactical excellence across heavy industries."`,
  },
];

export const StrategicAdvisors: React.FC = () => {
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
    <section className="py-20 md:py-24 bg-[#121613] text-white" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-12">
        {/* Title */}
        <div className="mb-14">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-widest text-[#deb853] uppercase">
            STRATEGIC ADVISORS
          </h2>
        </div>

        {/* 3 Columns Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-yellow-200 min-h-45">
          {advisors.map((item, i) => (
            <div
              key={item.name}
              className={`pt-6 md:pt-0 ${i !== 0 ? "md:pl-10 lg:pl-12" : ""} transition-all duration-600 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Name */}
              <h3 className="text-lg font-extrabold text-white mb-1.5 tracking-tight">
                {item.name}
              </h3>

              {/* Role */}
              <p className="text-xs font-extrabold text-[#deb853] uppercase tracking-wider mb-4">
                {item.role}
              </p>

              {/* Quote */}
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-normal italic">
                {item.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
