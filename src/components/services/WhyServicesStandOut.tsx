"use client";

import React, { useEffect, useRef, useState } from "react";
import { UserCheck, Cpu, HeadphonesIcon, Radio, Award } from "lucide-react";

const features = [
  {
    icon: UserCheck,
    title: "Trained and Certified",
    description: "All personnel undergo rigorous background checks and tactical training.",
  },
  {
    icon: Cpu,
    title: "Advanced Technology",
    description: "Integration of biometric and modern surveillance tools.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Availability",
    description: "Continuous command center operations and emergency response.",
  },
  {
    icon: Radio,
    title: "Rapid Deployment",
    description: "Quick response teams ready to dispatch within minutes.",
  },
  {
    icon: Award,
    title: "Tailored Solutions",
    description: "Customized plans designed around your specific site risk.",
  },
];

export const WhyServicesStandOut: React.FC = () => {
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
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
        {/* Title */}
        <h2
          className="tracking-tight text-white mb-8 text-3xl md:text-4xl lg:text-5xl leading-snug"
        >
          Why our services stand out
        </h2>


        {/* 5 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 justify-items-center">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className={`flex flex-col items-center text-center transition-all duration-600 ${visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="flex justify-center mb-4 text-[#40c075]">
                  <Icon className="w-6 h-6 text-[#40c075]" />
                </div>
                <h3 className="text-base font-extrabold text-white mb-2 tracking-tight">
                  {feat.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
