"use client";

import React, { useEffect, useRef, useState } from "react";

const stats = [
  { value: "01", label: "HEAD OFFICE" },
  { value: "01", label: "TRAINING CENTER" },
  { value: "05", label: "REGIONAL BRANCHES" },
  { value: "100%", label: "NATIONWIDE\nCOVERAGE" },
];

export const BranchesStats: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
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
        className="mx-auto px-6 flex flex-col justify-center"
      >

        {/* Subtitle */}
        <p
          className={`text-center max-w-2xl mx-auto mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          style={{
            fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
            fontWeight: 200,
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "26px",
            letterSpacing: "0px",
            verticalAlign: "middle",
            color: "#3F4940",
          }}
        >
          From our headquarters in Kathmandu to five strategic regional branches, Seven Star Security maintains a robust
          operational network ensuring rapid response and localized expertise for over 12 years.
        </p>

        {/* Stat Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: "64px" }}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`bg-white flex flex-col items-center text-center transition-all duration-700`}
              style={{
                transitionDelay: `${i * 120}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                borderBottom: "4px solid #C8102E",
                paddingTop: "40px",
                paddingBottom: "32px",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "48px",
                  lineHeight: "56px",
                  color: "#004E24",
                }}
              >
                {s.value}
              </span>

              {/* Label */}
              <span
                className="mt-3"
                style={{
                  fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "11px",
                  lineHeight: "16px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#3F4940",
                  whiteSpace: "pre-line",
                  textAlign: "center",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
