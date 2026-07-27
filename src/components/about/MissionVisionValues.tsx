"use client";

import React, { useEffect, useRef, useState } from "react";
import { Target, Eye, Compass } from "lucide-react";

export const MissionVisionValues: React.FC = () => {
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
    <section
      className="w-full flex items-center"
      style={{
        background: "#E0E4DC4D",
        paddingTop: "80px",
        paddingBottom: "80px",
        minHeight: "434.79px",
        opacity: 1,
      }}
      ref={ref}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">

          {/* Card 1: Our Mission */}
          <div
            className={`bg-[#f8faf6] rounded-lg border-t-4 border-t-[#004E24] border border-gray-200/50 p-7 md:p-8 shadow-xs hover:shadow-md transition-all duration-500 flex flex-col justify-between ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div>
              {/* Icon Circle */}
              <div className="w-9 h-9 rounded-full border border-[#004E24] flex items-center justify-center mb-5 text-[#004E24]">
                <Target className="w-5 h-5 text-[#004E24]" />
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight mb-4">
                Our Mission
              </h3>

              {/* Description */}
              <p
                className="
    font-['Public_Sans']
    font-regular
    text-[16px]
    leading-[24px]
    tracking-[0px]
    text-[#3F4940]

    overflow-hidden
  "
              >
                To provide comprehensive, reliable, and <br></br>integrated security solutions that
                exceed client expectations through innovation and tactical excellence.
              </p>
            </div>
          </div>

          {/* Card 2: Our Vision */}
          <div
            className={`bg-[#f8faf6] rounded-2xl border-t-4 border-t-[#004E24] border border-gray-200/50 p-7 md:p-8 shadow-xs hover:shadow-md transition-all duration-500 delay-100 flex flex-col justify-between ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div>
              {/* Icon Circle */}
              <div className="w-9 h-9 rounded-full border border-[#004E24] flex items-center justify-center mb-5 text-[#004E24]">
                <Eye className="w-5 h-5 text-[#004E24]" />
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight mb-4">
                Our Vision
              </h3>

              {/* Description */}
              <p
                className="text-[#3F4940] leading-[24px]"
                style={{
                  fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "0px",
                  verticalAlign: "middle",
                }}
              >
                To be the most trusted and preferred security partner in the nation, setting
                the benchmark for professional integrity and rapid response.
              </p>
            </div>
          </div>

          {/* Card 3: Our Values */}
          <div
            className={`bg-[#f8faf6] rounded-2xl border-t-4 border-t-[#004E24] border border-gray-200/50 p-7 md:p-8 shadow-xs hover:shadow-md transition-all duration-500 delay-200 flex flex-col justify-between ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div>
              {/* Icon Circle */}
              <div className="w-9 h-9 rounded-full border border-[#004E24] flex items-center justify-center mb-5 text-[#004E24]">
                <Compass className="w-5 h-5 text-[#004E24]" />
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight mb-4">
                Our Values
              </h3>

              {/* Outlined Value Badges (Green & Red Outlines) */}
              <div className="space-y-3 pt-1">
                {/* Row 1 */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="border border-[#004E24] text-[#004E24] font-bold text-xs px-4 py-1.5 rounded-full tracking-wide bg-white/60">
                    Integrity
                  </span>
                  <span className="border border-[#c8102e] text-[#c8102e] font-bold text-xs px-4 py-1.5 rounded-full tracking-wide bg-white/60">
                    Professionalism
                  </span>
                </div>

                {/* Row 2 */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="border border-[#004E24] text-[#004E24] font-bold text-xs px-4 py-1.5 rounded-full tracking-wide bg-white/60">
                    Vigilance
                  </span>
                  <span className="border border-[#c8102e] text-[#c8102e] font-bold text-xs px-4 py-1.5 rounded-full tracking-wide bg-white/60">
                    Accountability
                  </span>
                </div>

                {/* Row 3 */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="border border-[#004E24] text-[#004E24] font-bold text-xs px-4 py-1.5 rounded-full tracking-wide bg-white/60">
                    Excellence
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
