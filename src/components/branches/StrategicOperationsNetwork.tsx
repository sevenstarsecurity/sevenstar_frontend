"use client";

import React, { useEffect, useRef, useState } from "react";
import { ImageFallback } from "../ui/ImageFallback";

export const StrategicOperationsNetwork: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#f0f5ea] py-12 md:py-20" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full">

          {/* Left: Nepal Map Card (lg:col-span-6) */}
          <div
            className={`lg:col-span-6 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
          >
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3">
              <ImageFallback
                src="/images/NepalMap.webp"
                alt="Nepal Branch Map — Seven Star Security"
                className="w-full h-auto object-cover block rounded-lg"
                fallbackText="NepalMap.webp"
              />
            </div>
          </div>

          {/* Right: Text Content (lg:col-span-6) */}
          <div
            className={`lg:col-span-6 space-y-6 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
          >
            {/* Heading */}
            <h2
              className="text-3xl md:text-[40px] font-semibold leading-tight text-[#004E24] uppercase"
              style={{
                fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
              }}
            >
              STRATEGIC OPERATIONS<br />NETWORK
            </h2>

            {/* Description */}
            <p
              className="text-[#3F4940] text-sm md:text-base leading-relaxed"
              style={{
                fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
              }}
            >
              Our footprint is designed for maximum operational efficiency. Each branch operates as a self-contained unit with dedicated response teams, local intelligence networks, and direct communication lines to our central command center in Kathmandu.
            </p>

            {/* Feature Cards */}
            <div className="space-y-3 pt-2">

              {/* Card 1 - Rapid Response Protocols */}
              <div
                className="bg-white flex items-center gap-4 rounded-xs shadow-2xs"
                style={{
                  border: "1px solid #E5E7EB",
                  borderLeft: "4px solid #004E24",
                  padding: "16px 20px",
                }}
              >
                {/* Shield icon */}
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#004E24" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif", fontWeight: 700, fontSize: "14px", lineHeight: "20px", color: "#004E24", marginBottom: "2px" }}>
                    Rapid Response Protocols
                  </p>
                  <p style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif", fontWeight: 400, fontSize: "13px", lineHeight: "20px", color: "#6B7280" }}>
                    Guaranteed arrival times within regional limits.
                  </p>
                </div>
              </div>

              {/* Card 2 - Integrated Logistics */}
              <div
                className="bg-white flex items-center gap-4 rounded-xs shadow-2xs"
                style={{
                  border: "1px solid #E5E7EB",
                  borderLeft: "4px solid #004E24",
                  padding: "16px 20px",
                }}
              >
                {/* Hub/network icon */}
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#004E24" strokeWidth={1.6}>
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="4" cy="12" r="2" />
                    <circle cx="20" cy="12" r="2" />
                    <circle cx="12" cy="4" r="2" />
                    <circle cx="12" cy="20" r="2" />
                    <line x1="6" y1="12" x2="10" y2="12" />
                    <line x1="14" y1="12" x2="18" y2="12" />
                    <line x1="12" y1="6" x2="12" y2="10" />
                    <line x1="12" y1="14" x2="12" y2="18" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif", fontWeight: 700, fontSize: "14px", lineHeight: "20px", color: "#004E24", marginBottom: "2px" }}>
                    Integrated Logistics
                  </p>
                  <p style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif", fontWeight: 400, fontSize: "13px", lineHeight: "20px", color: "#6B7280" }}>
                    Seamless asset movement across all regional hubs.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
