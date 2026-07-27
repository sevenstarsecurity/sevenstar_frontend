"use client";

import React, { useEffect, useRef, useState } from "react";
import { ImageFallback } from "../ui/ImageFallback";
import { ArrowRight } from "lucide-react";

const leaders = [
  {
    name: "Ramesh Basnet",
    title: "CHAIRMAN",
    image: "/images/ramesh.png",
    fallback: "ramesh.png",
    quote: `"Security is not just a service, it is a promise of peace of mind."`,
  },
  {
    name: "Pema Yonjan",
    title: "MANAGING DIRECTOR",
    image: "/images/purna.png",
    fallback: "purna.png",
    quote: `"Our strength lies in our rigorous training and unwavering discipline."`,
  },
  {
    name: "Major Ganesh Amgain",
    title: "GENERAL MANAGER",
    image: "/images/majorganesh.png",
    fallback: "majorganesh.png",
    quote: `"Tactical excellence and field readiness define our daily operations."`,
  },
];

export const LeadershipSection: React.FC = () => {
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
        {/* Section Heading */}
        <h2 className="font-['Barlow_Condensed'] font-medium text-[32px] leading-[38.4px] tracking-[0px] text-center text-[#181D18] mb-16">
          Our Leadership
        </h2>

        {/* 3 Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
          {leaders.map((leader, i) => (
            <div
              key={leader.name}
              className={`flex flex-col items-center text-center group transition-all duration-600 ${visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Circular Photo with Outer Golden Border Ring */}
              <div className="p-1 rounded-full border-2 border-[#f3d37a] shadow-sm mb-6 group-hover:scale-105 transition-transform duration-300">
                <div className="w-40 h-40 md:w-44 md:h-44 rounded-full overflow-hidden bg-gray-100 shadow-inner">
                  <ImageFallback
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-center"
                    fallbackText={leader.fallback}
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="font-['Barlow_Condensed'] font-medium text-[24px] leading-[31.2px] tracking-[0px] text-center text-[#181D18] mb-1">
                {leader.name}
              </h3>

              {/* Role Title */}
              <p className="font-['Public_Sans'] font-normal text-[16px] leading-[24px] tracking-[0px] text-center text-[#BB0012] uppercase mb-4">
                {leader.title}
              </p>

              {/* Quote */}
              <p className="font-['Public_Sans'] font-light italic text-[16px] leading-[24px] tracking-[0px] text-center text-[#3F4940] mb-6 px-2 max-w-xs">
                {leader.quote}
              </p>

              {/* Read Full Message Link */}
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#c8102e] uppercase tracking-wider hover:text-[#9e0a22] transition-colors group/link"
              >
                <span>READ FULL MESSAGE</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
