"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { Barlow_Condensed } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { getPublicBranches, Branch } from "@/services/branches";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const RegionalBranches: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    let isMounted = true;

    const loadBranches = async () => {
      try {
        setLoading(true);
        const data = await getPublicBranches();
        if (isMounted) {
          setBranches(data);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to load branches:", err);
        if (isMounted) {
          setError("Unable to load branches right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadBranches();

    return () => {
      isMounted = false;
    };
  }, []);

  const getMapsUrl = (branch: Branch): string => {
    if (branch.googleMapsUrl) {
      return branch.googleMapsUrl;
    }
    return `https://maps.google.com/?q=${branch.latitude},${branch.longitude}`;
  };

  const isLastCardFullWidth = (index: number): boolean => {
    return index === branches.length - 1 && branches.length % 2 !== 0;
  };

  const renderLeadershipList = (branch: Branch) => {
    // branch.staffMembers can come back undefined/omitted from the public
    // /branches endpoint (unlike the admin nested-staff endpoint, which
    // always includes it) — default to [] so .filter never throws.
    const leadership = (branch.staffMembers ?? [])
      .filter((member) => member.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);

    if (leadership.length === 0) {
      return null;
    }

    return (
      <div className="mb-6">
        <div className="text-[11px] font-semibold tracking-wider text-[#848780] uppercase mb-2.5">
          TEAM LEADERSHIP
        </div>
        <ul className="space-y-2">
          {leadership.map((member) => (
            <li
              key={member.id}
              className="flex items-center gap-2.5 text-xs md:text-sm text-[#2d332a]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] flex-shrink-0" />
              <span>
                {member.designation ? (
                  <span className="font-semibold">{member.designation}: </span>
                ) : null}
                {member.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-[#f2f5ec]" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
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

        {/* Loading state */}
        {loading ? (
          <div className="text-center py-12 text-[#64685e] text-sm">
            Loading branches...
          </div>
        ) : null}

        {/* Error state */}
        {!loading && error ? (
          <div className="text-center py-12 text-[#c8102e] text-sm">{error}</div>
        ) : null}

        {/* Empty state */}
        {!loading && !error && branches.length === 0 ? (
          <div className="text-center py-12 text-[#64685e] text-sm">
            No branches available yet.
          </div>
        ) : null}

        {/* 2-Column Grid */}
        {!loading && !error && branches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {branches.map((branch, i) => {
              const fullWidth = isLastCardFullWidth(i);

              if (fullWidth) {
                return (
                  <div
                    key={branch.id}
                    className={`md:col-span-2 bg-white rounded-[2px] border-t-[3.5px] border-b-[3.5px] border-[#c8102e] border-x border-x-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out group p-6 md:p-8 ${
                      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative">
                      <div className="flex-1">
                        <h3
                          className={`${barlowCondensed.className} text-[26px] md:text-[28px] font-bold text-[#004e24] uppercase tracking-wide mb-4`}
                        >
                          {branch.name}
                        </h3>
                        {renderLeadershipList(branch)}
                      </div>

                      <div className="flex flex-col justify-between items-start md:items-end h-full pt-1 md:pt-0 gap-6">
                        <a
                          href={getMapsUrl(branch)}
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
                            href={getMapsUrl(branch)}
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
                  key={branch.id}
                  className={`bg-white rounded-[2px] border-t-[3.5px] border-[#c8102e] border-x border-x-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out group p-6 md:p-7 flex flex-col justify-between ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <h3
                        className={`${barlowCondensed.className} text-[24px] md:text-[26px] font-bold text-[#004e24] uppercase tracking-wide`}
                      >
                        {branch.name}
                      </h3>
                      
                      <a
                        href={getMapsUrl(branch)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#c8102e] hover:text-[#9e0b23] transition-colors p-1"
                        title="View Location"
                      >
                        <MapPin className="w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200" />
                      </a>
                    </div>

                    {renderLeadershipList(branch)}
                  </div>

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
                        href={getMapsUrl(branch)}
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
        ) : null}
      </div>
    </section>
  );
};