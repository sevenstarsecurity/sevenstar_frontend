"use client";

import React, { useEffect, useRef, useState } from "react";
import { ImageFallback } from "../ui/ImageFallback";

const executives = [
  {
    name: "Major Vikram Singh (Retd.)",
    role: "CHAIRMAN & MANAGING DIRECTOR",
    bio: "20 years of tactical experience in national security and paramilitary coordination.",
  },
  {
    name: "Anjali Deshmukh",
    role: "DIRECTOR OF OPERATIONS",
    bio: "Driving operational excellence across 500+ secure deployments nationwide.",
  },
  {
    name: "Arjun Khanna",
    role: "CHIEF INTELLIGENCE OFFICER",
    bio: "Pioneer in AI-driven surveillance and modern cyber-physical security integration.",
  },
];

export const ExecutiveCommittee: React.FC = () => {
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
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-12 text-center">
        {/* Section Title */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-wider text-[#0b4226] uppercase">
            EXECUTIVE COMMITTEE
          </h2>
          <div className="w-16 h-1 bg-[#c8102e] mx-auto mt-3 rounded-full" />
        </div>

        {/* 3 Executive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
          {executives.map((member, i) => (
            <div
              key={member.name}
              className={`flex flex-col items-center text-center group transition-all duration-600 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Rectangular Photo with Gold Frame */}
              <div className="p-1 border-4 border-[#deb853] bg-white shadow-md w-48 h-56 mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full overflow-hidden bg-gray-100">
                  <ImageFallback
                    src="/images/mic123.png"
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                    fallbackText="mic123.png"
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="text-lg font-extrabold text-gray-900 mb-1 tracking-tight">
                {member.name}
              </h3>

              {/* Role */}
              <p className="text-xs font-extrabold text-[#c8102e] uppercase tracking-widest mb-3">
                {member.role}
              </p>

              {/* Bio */}
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-xs font-normal">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
