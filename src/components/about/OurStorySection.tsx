"use client";

import React, { useEffect, useRef, useState } from "react";
import { ImageFallback } from "../ui/ImageFallback";
import { Bold } from "lucide-react";

const storyStats = [
  { label: "10+ YEARS" },
  { label: "500+ GUARDS" },
  { label: "200+ CLIENTS" },
  { label: "5 BRANCHES" },
];

export const OurStorySection: React.FC = () => {
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
    <section className="py-16 md:py-24 bg-[#f7faf3]" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Column: Image with Outer Gold Line Frame (lg:col-span-5) */}
          <div
            className={`lg:col-span-5 relative transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
          >
            {/* Outer Gold Line Container with padding around the image */}
            <div className="p-3 sm:p-4 rounded-2xl border-2 border-[#f3d37a]/80 bg-white/40 shadow-sm">
              <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/3] md:aspect-[5/4] lg:aspect-[4/3]">
                <ImageFallback
                  src="/images/our story.jpg"
                  alt="Seven Star Security Building and Guards"
                  className="w-full h-full object-cover object-center"
                  fallbackText="our story.jpg"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Text Content (lg:col-span-7) */}
          <div
            className={`lg:col-span-7 space-y-6 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
          >
            {/* Section Tag */}
            <div>
              <span className="text-xs md:text-[16px] font-bold tracking-widest text-[#c8102e] uppercase block">
                OUR STORY
              </span>
            </div>

            {/* Main Headline */}
            <h2
              className="
    font-['Public_Sans']
    font-regular
    text-[34px]
    leading-[38.4px]
    tracking-[0px]
    text-[##181D18]
    mb-5
  "
            >
              A trusted name in security since <br></br>2071
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4">
              <p>
                Founded on Karthik 19, 2071, Seven Star Security Service Pvt. Ltd. was<br></br>
                established with a singular vision: to redefine the standards of physical<br></br>
                and electronic security in the region. What started as a focused team of<br></br>
                highly trained professionals has evolved into an industry leader.
              </p>
              <p>
                Over the past decade, we have navigated the complexities of an evolving<br></br>
                security landscape, integrating advanced technology with rigorous<br></br>
                human tactical training to provide unshakeable protection for corporate,<br></br>
                industrial, and diplomatic assets.
              </p>
            </div>

            {/* Stat Pills Grid (10+ YEARS | 500+ GUARDS | 200+ CLIENTS | 5 BRANCHES) */}
            <div className="pt-4 space-y-3">
              {/* Top Row: 3 Badges */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                {storyStats.slice(0, 3).map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#e5eee7] border-l-[3px] border-l-[#0b4226] px-5 py-2.5 rounded-xs shadow-2xs font-extrabold text-xs tracking-wider text-[#0b4226] flex items-center justify-center min-w-[130px]"
                  >
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Row: 1 Badge */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                {storyStats.slice(3).map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#e5eee7] border-l-[3px] border-l-[#0b4226] px-5 py-2.5 rounded-xs shadow-2xs font-extrabold text-xs tracking-wider text-[#0b4226] flex items-center justify-center min-w-[130px]"
                  >
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
