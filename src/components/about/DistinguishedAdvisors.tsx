"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { ImageFallback } from "../ui/ImageFallback";

const advisors = [
  {
    name: "Retd. IGP Sarat Kumar Basnet",
    role: "Senior Advisor (Ex-Police Chief)",
    imageUrl: "https://picsum.photos/seed/sarat/400/400",
    message:
      "Security is not merely a profession — it is a solemn commitment to society. Throughout my decades of service in Nepal Police, I have witnessed the evolving landscape of threats and the courage required to counter them. Seven Star Security Services embodies that spirit of dedication. Their disciplined approach, trained personnel, and unwavering commitment to safety align with the highest standards of professional security. I am honoured to advise this institution and encourage every member to uphold integrity, vigilance, and service above self.",
  },
  {
    name: "Major General Devendra Bd. Medhasi",
    role: "Strategic Military Advisor",
    imageUrl: "https://picsum.photos/seed/devendra/400/400",
    message:
      "In matters of national and institutional security, strategic thinking is as important as physical presence. My career in the Nepal Army has reinforced the principle that effective security demands planning, precision, and professionalism. Seven Star Security Services demonstrates these qualities consistently. Their leadership understands that protecting people and assets requires both tactical knowledge and ethical responsibility. I am proud to contribute my experience to guide this organisation toward excellence and national service.",
  },
];

export const DistinguishedAdvisors: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState<
    (typeof advisors)[0] | null
  >(null);

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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedAdvisor) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedAdvisor]);

  return (
    <>
      <section className="w-full py-16 md:py-20 bg-[#BFC9BD]/30" ref={ref}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12 text-center">
          {/* Section Heading */}
          <h2
            className="uppercase mb-16 w-full text-center mx-auto"
            style={{
              fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "1.6px",
              color: "#3F4940",
              textTransform: "uppercase",
            }}
          >
            DISTINGUISHED ADVISORS
          </h2>

          {/* Advisor Cards — image floats outside LEFT of card box */}
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 w-full max-w-7xl mx-auto">
            {advisors.map((advisor, i) => (
              /* Outer wrapper: left padding = image width (100px) + gap (16px) */
              <div
                key={advisor.name}
                className={`relative pl-[180px] w-full transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Photo — circular, matching Our Staff style, outside the card box */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full border-2 border-[#f3d37a] shadow-sm">
                  <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100 shadow-inner">
                    <ImageFallback
                      src={advisor.imageUrl}
                      alt={advisor.name}
                      className="w-full h-full object-cover object-center"
                      fallbackText={advisor.name}
                    />
                  </div>
                </div>

                {/* Card body — sits to the right of the image */}
                <div
                  className="bg-white border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-300 px-6 py-5 text-left flex flex-col justify-center"
                  style={{ borderLeft: "4px solid #deb853" }}
                >
                  {/* Name */}
                  <p
                    style={{
                      fontFamily:
                        "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
                      fontWeight: 500,
                      fontSize: "19px",
                      lineHeight: "26px",
                      letterSpacing: "0px",
                      color: "#004E24",
                    }}
                  >
                    {advisor.name}
                  </p>

                  {/* Role */}
                  <p
                    className="mt-1"
                    style={{
                      fontFamily:
                        "var(--font-public-sans), 'Public Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "12px",
                      lineHeight: "19.6px",
                      letterSpacing: "0.8px",
                      color: "#c8102e",
                      textTransform: "uppercase",
                    }}
                  >
                    {advisor.role}
                  </p>

                  {/* Divider */}
                  <div className="w-10 h-px bg-[#deb853] my-3" />

                  {/* Read Full Message Button */}
                  <button
                    onClick={() => setSelectedAdvisor(advisor)}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#c8102e] uppercase tracking-wider hover:text-[#9e0a22] transition-colors group/link w-fit"
                  >
                    <span>Read Full Message</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modal Popup ── */}
      {selectedAdvisor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelectedAdvisor(null)}
        >
          <div
            className="relative bg-white max-w-xl w-full shadow-2xl"
            style={{ borderTop: "4px solid #deb853" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedAdvisor(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#c8102e] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="p-8">
              {/* Advisor Identity Row */}
              <div className="flex items-center gap-5 mb-6">
                <div className="flex-shrink-0 w-[70px] h-[78px] border-2 border-[#deb853] bg-[#FFDF96] overflow-hidden">
                  <ImageFallback
                    src={selectedAdvisor.imageUrl}
                    alt={selectedAdvisor.name}
                    className="w-full h-full object-cover object-center"
                    fallbackText={selectedAdvisor.name}
                  />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily:
                        "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
                      fontWeight: 600,
                      fontSize: "22px",
                      lineHeight: "28px",
                      color: "#004E24",
                    }}
                  >
                    {selectedAdvisor.name}
                  </h3>
                  <p
                    className="mt-1"
                    style={{
                      fontFamily:
                        "var(--font-public-sans), 'Public Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "12px",
                      letterSpacing: "0.8px",
                      color: "#c8102e",
                      textTransform: "uppercase",
                    }}
                  >
                    {selectedAdvisor.role}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#deb853]/40 mb-6" />

              {/* Message */}
              <p
                style={{
                  fontFamily:
                    "var(--font-public-sans), 'Public Sans', sans-serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "15px",
                  lineHeight: "26px",
                  color: "#3F4940",
                }}
              >
                &ldquo;{selectedAdvisor.message}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
