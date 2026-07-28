"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { Barlow_Condensed } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

interface Leadership {
  title: string;
  name: string;
}

interface Branch {
  name: string;
  phone: string;
  mapsQuery: string;
  leadership: Leadership[];
  isFullWidth?: boolean;
}

const regionalBranches: Branch[] = [
  {
    name: "BIRTAMODE BRANCH",
    phone: "+977-23-540000",
    mapsQuery: "Birtamode, Jhapa, Nepal",
    leadership: [
      { title: "Regional Manager", name: "Rajesh Thapa" },
      { title: "Ops Supervisor", name: "Sunita Rai" },
    ],
  },
  {
    name: "BIRGUNJ BRANCH",
    phone: "+977-51-520000",
    mapsQuery: "Birgunj, Parsa, Nepal",
    leadership: [
      { title: "Regional Manager", name: "Anil Gupta" },
      { title: "Logistics Lead", name: "Mohan Sah" },
    ],
  },
  {
    name: "POKHARA BRANCH",
    phone: "+977-61-460000",
    mapsQuery: "Pokhara, Kaski, Nepal",
    leadership: [
      { title: "Regional Manager", name: "Bikram Gurung" },
      { title: "Field Officer", name: "Maya Karki" },
    ],
  },
  {
    name: "BHAIRAHAWA BRANCH",
    phone: "+977-71-500000",
    mapsQuery: "Bhairahawa, Rupandehi, Nepal",
    leadership: [
      { title: "Regional Manager", name: "Deepak Yadav" },
      { title: "Security Analyst", name: "Sarita Jha" },
    ],
  },
  {
    name: "NEPALGUNJ BRANCH",
    phone: "+977-81-540000",
    mapsQuery: "Nepalgunj, Banke, Nepal",
    leadership: [
      { title: "Regional Manager", name: "Kamal Chaudhary" },
      { title: "Patrol Supervisor", name: "Prem Pun" },
    ],
    isFullWidth: true,
  },
];

export const RegionalBranches: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-[#f2f5ec]" ref={ref}>
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
          <div className="flex-shrink-0">
            <h2
              className={`${barlowCondensed.className} text-[36px] md:text-[44px] font-bold leading-tight text-[#004e24] uppercase tracking-wide`}
            >
              REGIONAL BRANCHES
            </h2>
            <p className="text-[#64685e] text-sm md:text-base font-normal mt-1">
              Full operational capacity in major industrial hubs.
            </p>
          </div>
          <div className="hidden md:block flex-1 ml-10 border-b border-[#dedede] mb-2" />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {regionalBranches.map((branch, i) => {
            const isFullWidth = branch.isFullWidth;

            if (isFullWidth) {
              return (
                <div
                  key={branch.name}
                  className={`md:col-span-2 bg-white rounded-[2px] border-t-[3.5px] border-b-[3.5px] border-[#c8102e] border-x border-x-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)]
                    hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out group p-6 md:p-8
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative">
                    {/* Left Details */}
                    <div className="flex-1">
                      <h3
                        className={`${barlowCondensed.className} text-[26px] md:text-[28px] font-bold text-[#004e24] uppercase tracking-wide mb-4`}
                      >
                        {branch.name}
                      </h3>

                      <div className="text-[11px] font-semibold tracking-wider text-[#848780] uppercase mb-2.5">
                        TEAM LEADERSHIP
                      </div>

                      <ul className="space-y-2">
                        {branch.leadership.map((member, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2.5 text-xs md:text-sm text-[#2d332a]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] flex-shrink-0" />
                            <span>
                              <span className="font-semibold">{member.title}:</span>{" "}
                              {member.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right side for full width card */}
                    <div className="flex flex-col justify-between items-start md:items-end h-full pt-1 md:pt-0 gap-6">
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(branch.mapsQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#c8102e] hover:text-[#9e0b23] transition-colors p-1"
                        title="View Location"
                      >
                        <MapPin className="w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200" />
                      </a>

                      <div className="text-left md:text-right mt-2 md:mt-6">
                        <a
                          href={`tel:${branch.phone}`}
                          className="block text-[#004e24] font-bold text-lg md:text-[22px] tracking-tight hover:underline transition-all mb-1"
                        >
                          {branch.phone}
                        </a>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(branch.mapsQuery)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#c8102e] font-bold text-xs md:text-[13px] tracking-wider uppercase group-hover:translate-x-1 transition-transform duration-200 hover:underline"
                        >
                          GET DIRECTIONS <ArrowRight className="w-3.5 h-3.5 text-[#c8102e]" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={branch.name}
                className={`bg-white rounded-[2px] border-t-[3.5px] border-[#c8102e] border-x border-x-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)]
                  hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out group p-6 md:p-7 flex flex-col justify-between
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div>
                  {/* Top Header & MapPin */}
                  <div className="flex items-start justify-between mb-4">
                    <h3
                      className={`${barlowCondensed.className} text-[24px] md:text-[26px] font-bold text-[#004e24] uppercase tracking-wide`}
                    >
                      {branch.name}
                    </h3>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(branch.mapsQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c8102e] hover:text-[#9e0b23] transition-colors p-1"
                      title="View Location"
                    >
                      <MapPin className="w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200" />
                    </a>
                  </div>

                  {/* Team Leadership */}
                  <div className="text-[11px] font-semibold tracking-wider text-[#848780] uppercase mb-2.5">
                    TEAM LEADERSHIP
                  </div>

                  <ul className="space-y-2 mb-6">
                    {branch.leadership.map((member, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 text-xs md:text-sm text-[#2d332a]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] flex-shrink-0" />
                        <span>
                          <span className="font-semibold">{member.title}:</span>{" "}
                          {member.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Row */}
                <div>
                  <div className="border-b border-[#e5e7eb] mb-4" />
                  <div className="flex items-center justify-between">
                    <a
                      href={`tel:${branch.phone}`}
                      className="text-[#004e24] font-bold text-sm md:text-base tracking-tight hover:underline transition-all"
                    >
                      {branch.phone}
                    </a>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(branch.mapsQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#c8102e] font-bold text-xs md:text-[13px] tracking-wider uppercase group-hover:translate-x-1 transition-transform duration-200 hover:underline"
                    >
                      GET DIRECTIONS <ArrowRight className="w-3.5 h-3.5 text-[#c8102e]" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
