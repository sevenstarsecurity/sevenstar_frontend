"use client";

import { Mail, Map, Phone } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const hubs = [
  {
    tag: "NORTHERN HUB",
    city: "New Delhi NCR",
    description:
      "Operational Head Office managing Northern deployments and Strategic Training Academy.",
    phone: "011-4500XXXX",
    email: "delhi@sevenstar.com",
  },
  {
    tag: "WESTERN HUB",
    city: "Mumbai Region",
    description:
      "Primary center for Maritime Security and Corporate Headquarters protection.",
    phone: "022-6700XXXX",
    email: "mumbai@sevenstar.com",
  },
  {
    tag: "SOUTHERN HUB",
    city: "Bangalore Tech Hub",
    description:
      "Nerve center for Cyber security and High-Tech IT Park surveillance.",
    phone: "080-3200XXXX",
    email: "bangalore@sevenstar.com",
  },
];

export const NationalScale: React.FC = () => {
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
    <section className="py-20 md:py-24 bg-[#f7faf3]" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <h2 className="font-['Barlow_Condensed'] font-semibold text-[40px] leading-[48px] tracking-[-2px] text-[#004E24] uppercase mb-2">
              NATIONAL SCALE
            </h2>
            <p className="font-['Public_Sans'] text-[18px] leading-[32.4px] tracking-[0px] text-gray-600 font-light">
              <span className="block">Strategically located command centers ensuring localized response</span>
              <span className="block">times under 15 minutes across major industrial hubs.</span>
            </p>
          </div>

          <div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#0b4226] hover:bg-[#072c19] text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xs shadow-sm transition-all"
            >
              <Map className="w-4 h-4" />
              <span>VIEW MAP</span>
            </a>
          </div>
        </div>

        {/* 3 Hub Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {hubs.map((hub, i) => (
            <div
              key={hub.tag}
              className={`bg-white rounded-none p-8 md:p-9 border border-gray-100/80 shadow-2xs hover:shadow-md transition-all duration-500 flex flex-col justify-between h-full ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div>
                {/* Red Tag */}
                <span className="text-[12px] font-bold text-[#c8102e] uppercase tracking-wider block mb-3">
                  {hub.tag}
                </span>

                {/* City Name */}
                <h3 className="font-['Barlow_Condensed'] font-semibold text-[26px] leading-tight text-[#004E24] mb-4">
                  {hub.city}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-normal">
                  {hub.description}
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-2.5 pt-2 text-sm text-gray-700 font-medium">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#004E24]" />
                  <span className="text-gray-800">{hub.phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#004E24]" />
                  <span className="text-gray-800">{hub.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
