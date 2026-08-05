"use client";

import React, { useEffect, useRef, useState } from "react";
import { ImageFallback } from "../ui/ImageFallback";

const advisors = [
  {
    name: "Sanat Kumar Basnet",
    role: "Retired IGP of APF",
    imageUrl: "https://picsum.photos/seed/sarat/400/400",
    message:
      `At Seven Star we are constantly evolving and adapting in accordance with the ever changing demands of the industry, thereby meeting client requirements and assuring their safety. Thus offering our clients a complete "Peace of mind".

`,
  },
  {
    name: "Devendra Bd. Medhasi",
    role: "Retired Nepal Army",
    imageUrl: "https://picsum.photos/seed/devendra/400/400",
    message: `I have the honor to congratulate Seven Star Security Service
Pvt. Ltd. to publish its Company Profile on the occasion of its Anniversary.

Security of personnel and materials is paramount in today's fast-moving situations. Seven Star Security Service Pvt. Ltd. has been successfully accomplishing its goal by providing high-quality private security services.
`,
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
    <section className="w-full py-16 md:py-20 bg-[#BFC9BD]/30" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-10 lg:px-12">
        {/* Section Heading */}
        <h2
          className="uppercase mb-16 w-full text-center mx-auto"
          style={{
            fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "24px",
            lineHeight: "24px",
            letterSpacing: "1.6px",
            color: "#3F4940",
            textTransform: "uppercase",
          }}
        >
          CHIEF ADVISOR
        </h2>

        {/* Advisors — photo beside intro, side by side */}
        <div className="flex flex-col lg:flex-row gap-16">
          {advisors.map((advisor, i) => (
            <div
              key={advisor.name}
              className={`flex-1 flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8 transition-all duration-600 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Photo — circular, matching Our Staff style */}
              <div className="flex-shrink-0 p-1 rounded-full border-2 border-[#f3d37a] shadow-sm mx-auto sm:mx-0">
                <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden bg-gray-100 shadow-inner">
                  <ImageFallback
                    src={advisor.imageUrl}
                    alt={advisor.name}
                    className="w-full h-full object-cover object-center"
                    fallbackText={advisor.name}
                  />
                </div>
              </div>

              {/* Intro Text */}
              <div className="flex-1 text-center sm:text-left min-w-0">
                {/* Name */}
                <p
                  style={{
                    fontFamily:
                      "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
                    fontWeight: 500,
                    fontSize: "22px",
                    lineHeight: "28px",
                    letterSpacing: "0px",
                    color: "#004E24",
                  }}
                >
                  {advisor.name}
                </p>

                {/* Role */}
                <p
                  className="mt-1 mb-4"
                  style={{
                    fontFamily:
                      "var(--font-public-sans), 'Public Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "13px",
                    lineHeight: "20px",
                    letterSpacing: "0.8px",
                    color: "#c8102e",
                    textTransform: "uppercase",
                  }}
                >
                  {advisor.role}
                </p>

                {/* Divider */}
                <div className="w-10 h-px bg-[#deb853] mb-4 mx-auto sm:mx-0" />

                {/* Message */}
                <p
                  style={{
                    fontFamily:
                      "var(--font-public-sans), 'Public Sans', sans-serif",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "15px",
                    lineHeight: "25px",
                    color: "#3F4940",
                    whiteSpace: "pre-line",
                  }}
                  className="mx-auto sm:mx-0"
                >
                  &ldquo;{advisor.message}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};