"use client";

import React, { useEffect, useRef, useState } from "react";

const advisors = [
  {
    name: "Retd. IGP Sarat Kumar Basnet",
    role: "Senior Advisor (Ex-Police Chief)",
  },
  {
    name: "Major General Devendra Bd. Medhasi",
    role: "Strategic Military Advisor",
  },
];

export const DistinguishedAdvisors: React.FC = () => {
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
      className="w-full py-16 md:py-20"
      style={{ background: "#E0E4DC4D" }}
      ref={ref}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-12 text-center">
        {/* Section Heading */}
        <h2
          className="uppercase mb-12"
          style={{
            fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "1.6px",
            textAlign: "center",
            verticalAlign: "middle",
            color: "#3F4940",
            textTransform: "uppercase",
          }}
        >
          DISTINGUISHED ADVISORS
        </h2>

        {/* Advisor Cards Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {advisors.map((advisor, i) => (
            <div
              key={advisor.name}
              className={`bg-white border-l-4 border-l-[#FFDF96] border border-gray-200/60 px-6 py-5 text-left shadow-xs hover:shadow-md transition-all duration-500 min-w-[260px] max-w-[320px] w-full ${visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Advisor Name */}
              <p
                style={{
                  fontFamily: "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "0px",
                  verticalAlign: "middle",
                  color: "#004E24",
                }}
              >
                {advisor.name}
              </p>

              {/* Advisor Role */}
              <p
                className="mt-1"
                style={{
                  fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
                  fontWeight: 600,
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "19.6px",
                  letterSpacing: "0.7px",
                  verticalAlign: "middle",
                  color: "#181D18",
                }}
              >
                {advisor.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
