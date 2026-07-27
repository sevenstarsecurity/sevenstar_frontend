"use client";

import React from "react";
import { Award } from "lucide-react";

export const CertificationsSection: React.FC = () => {
  return (
    <section
      className="w-full border-t border-gray-200/60"
      style={{ opacity: 1, background: "#E0E4DC33" }}
    >
      <div
        style={{
          width: "1280px",
          maxWidth: "100%",
          height: "128px",
          paddingTop: "32px",
          paddingBottom: "32px",
          margin: "0 auto",
          paddingLeft: "16px",
          paddingRight: "16px",
          boxSizing: "border-box",
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-300/60 h-full">

          {/* Left: ISO 9001:2015 Certified */}
          <div className="flex items-center gap-4 py-6 sm:pr-10">
            {/* Circular Icon */}
            <div className="w-10 h-10 rounded-full border-2 border-gray-400/50 flex items-center justify-center flex-shrink-0 bg-white">
              <Award className="w-5 h-5 text-[#3F4940]" />
            </div>
            <span
              style={{
                fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                lineHeight: "20px",
                letterSpacing: "0.05em",
                color: "#3F4940",
              }}
            >
              ISO 9001:2015 CERTIFIED
            </span>
          </div>

          {/* Right: Security License No. */}
          <div className="flex flex-col py-6 sm:pl-10">
            <span
              style={{
                fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
                fontWeight: 700,
                fontSize: "10px",
                lineHeight: "14px",
                letterSpacing: "0.15em",
                color: "#3F4940",
                textTransform: "uppercase",
              }}
            >
              SECURITY LICENSE NO.
            </span>
            <span
              style={{
                fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                lineHeight: "20px",
                letterSpacing: "0.05em",
                color: "#004E24",
              }}
            >
              127891/2071/072
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
