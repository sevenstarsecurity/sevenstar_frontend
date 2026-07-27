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
    <section
      className="bg-[#f0f5ea] flex items-center justify-center py-0"
      style={{ minHeight: "424px" }}
      ref={ref}
    >
      <div
        style={{
          width: "1152px",
          maxWidth: "1280px",
          height: "424px",
        }}
        className="mx-auto px-6 flex items-center"
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-2 items-center w-full h-full"
          style={{ gap: "64px" }}
        >

          {/* Left: Nepal Map Card */}
          <div
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
          >
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3">
              <ImageFallback
                src="/images/nepalmap.jpg"
                alt="Nepal Branch Map — Seven Star Security"
                className="w-full h-auto object-cover block rounded-lg"
                fallbackText="nepalmap.jpg"
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div
            className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
          >
            {/* Heading */}
            <h2
              style={{
                width: "544px",
                height: "96px",
                fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
                fontWeight: 600,
                fontStyle: "normal",
                fontSize: "40px",
                lineHeight: "48px",
                letterSpacing: "0px",
                verticalAlign: "middle",
                opacity: 1,
                transform: "rotate(0deg)",
                color: "#004E24",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              STRATEGIC OPERATIONS<br />NETWORK
            </h2>

            {/* Description */}
            <p
              style={{
                width: "544px",
                height: "104px",
                fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "26px",
                letterSpacing: "0px",
                verticalAlign: "middle",
                opacity: 1,
                transform: "rotate(0deg)",
                color: "#3F4940",
                display: "flex",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              Our footprint is designed for maximum operational efficiency. Each
              branch operates as a self-contained unit with dedicated response teams,
              local intelligence networks, and direct communication lines to our central
              command center in Kathmandu.
            </p>

            {/* Feature Cards */}
            <div className="space-y-3">

              {/* Card 1 - Rapid Response Protocols */}
              <div
                className="bg-white flex items-center gap-4"
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
                className="bg-white flex items-center gap-4"
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
