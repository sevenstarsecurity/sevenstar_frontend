"use client";

import React, { useEffect, useRef, useState } from "react";
import { ImageFallback } from "../ui/ImageFallback";

export const TrainingArena: React.FC = () => {
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
    <section className="py-20 md:py-24 bg-[#0b4226] text-white overflow-hidden" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Info (lg:col-span-5) */}
          <div
            className={`lg:col-span-5 space-y-6 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
          >
            <h2
              className="uppercase text-white tracking-tight leading-tight"
              style={{
                fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
                fontWeight: 600,
                fontStyle: "normal",
                fontSize: "40px",
                lineHeight: "48px",
                letterSpacing: "0px",
                verticalAlign: "middle",
                textTransform: "uppercase",
                color: "#FFFFFF",
              }}
            >
              OUR TRAINING <br className="hidden sm:inline" />
              ARENA
            </h2>
            <p className="text-white/70 text-[16px] leading-[24px] tracking-[0px] max-w-md font-normal">
              A multi-acre, purpose-built facility designed to <br />
              simulate real-world security challenges including <br />
              high-risks, industrial zones, and residential <br />
              clusters.
            </p>
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-block border border-[#deb853] text-[#FFDF96] hover:bg-[#deb853] hover:text-[#0b4226] font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xs transition-all duration-300 transform hover:-translate-y-0.5 shadow-md"
              >
                TOUR THE FACILITY
              </a>
            </div>
          </div>

          {/* Right Column: 2 Gold Framed Photos Side-by-Side (lg:col-span-7) */}
          <div
            className={`lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
          >
            {/* Photo 1: salam.png */}
            <div className="border-4 border-[#deb853] shadow-2xl rounded-xs overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
              <div className="h-[387px] w-full overflow-hidden relative">
                <ImageFallback
                  src="/images/salam.png"
                  alt="Seven Star Guards Formation"
                  className="w-full h-full object-cover object-center"
                  fallbackText="salam.png"
                />
              </div>
            </div>

            {/* Photo 2: mic123.png */}
            <div className="border-4 border-[#deb853] shadow-2xl rounded-xs overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
              <div className="h-[387px] w-full overflow-hidden relative">
                <ImageFallback
                  src="/images/mic123.png"
                  alt="Seven Star Radio Officer"
                  className="w-full h-full object-cover object-center"
                  fallbackText="mic123.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
