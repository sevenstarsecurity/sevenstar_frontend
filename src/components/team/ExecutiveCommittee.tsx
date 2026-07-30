"use client";

import React, { useEffect, useRef, useState } from "react";
import { ImageFallback } from "../ui/ImageFallback";

const executives = [
  {
    name: "Major Vikram Singh (Retd.)",
    role: "CHAIRMAN & MANAGING DIRECTOR",
    bio: "20 years of tactical experience in national security and paramilitary coordination.",
    image: "/images/vikram.jpg",
  },
  {
    name: "Anjali Deshmukh",
    role: "DIRECTOR OF OPERATIONS",
    bio: "Driving operational excellence across 500+ secure deployments nationwide.",
    image: "/images/anjali.jpg",
  },
  {
    name: "Arjun Khanna",
    role: "CHIEF INTELLIGENCE OFFICER",
    bio: "Pioneer in AI-driven surveillance and modern cyber-physical security integration.",
    image: "/images/arjun.jpg",
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
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12 text-center">
        {/* Section Title */}
        <div className="mb-16">
          <h2
            className="text-3xl md:text-4xl font-semibold tracking-wider text-[#004E24] uppercase"
            style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
          >
            EXECUTIVE COMMITTEE
          </h2>
          <div className="w-16 h-1 bg-[#c8102e] mx-auto mt-3 rounded-full" />
        </div>

        {/* 3 Executive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 items-start w-full mx-auto">
          {executives.map((member, i) => (
            <div
              key={member.name}
              className={`flex flex-col items-center text-center group transition-all duration-600 ${i === 1 ? "md:mt-12" : ""
                } ${visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Rectangular Photo with Gold Frame */}
              <div className="p-1 border-4 border-[#deb853] bg-[#FFDF96] shadow-md w-[270px] h-[306px] mx-auto mb-6 group-hover:scale-105 transition-transform duration-300 opacity-100">
                <div className="w-full h-full overflow-hidden bg-gray-100">
                  <ImageFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                    fallbackText={member.name}
                  />
                </div>
              </div>

              {/* Name */}
              <h3
                className="text-2xl font-normal text-[#004E24] leading-[31.2px] tracking-normal"
                style={{ fontFamily: "'Public Sans', sans-serif" }}
              >
                {member.name}
              </h3>

              {/* Role / Post */}
              <p
                className="text-xs md:text-sm font-bold text-[#c8102e] uppercase tracking-wider mb-3"
                style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
              >
                {member.role}
              </p>

              {/* Bio */}
              <p
                className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-xs font-normal"
                style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
              >
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
