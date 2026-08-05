"use client";

import { getPublicLeaders, Leader } from "@/services/leadership"; // adjust path to match your project
import React, { useEffect, useRef, useState } from "react";
import { ImageFallback } from "../ui/ImageFallback";

export const LeadershipSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    let isMounted = true;

    const loadLeaders = async () => {
      try {
        setLoading(true);
        const data = await getPublicLeaders();
        if (isMounted) {
          const activeSorted = data
            .filter((leader) => leader.isActive)
            .sort((a, b) => a.displayOrder - b.displayOrder);
          setLeaders(activeSorted);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to load leadership:", err);
        if (isMounted) {
          setError("Unable to load leadership team right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadLeaders();

    return () => {
      isMounted = false;
    };
  }, []);

  const getQuote = (leader: Leader): string => {
    if (!leader.message) return "";
    return `"${leader.message}"`;
  };

  // Only show a single, featured leader (first in the active/sorted list)
  const leader = leaders[0];

  return (
    <section className="py-20 md:py-24 bg-[#f7faf3]" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-10 lg:px-12">
        {/* Section Heading */}
        <h2 className="font-['Barlow_Condensed'] font-medium text-[32px] leading-[38.4px] tracking-[0px] text-center text-[#181D18] mb-16">
          Our Leadership
        </h2>

        {/* Loading state */}
        {loading && (
          <div className="py-12 text-sm text-gray-500 text-center">Loading leadership team...</div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="py-12 text-sm text-red-600 text-center">{error}</div>
        )}

        {/* Empty state */}
        {!loading && !error && !leader && (
          <div className="py-12 text-sm text-gray-500 text-center">
            No leadership members available yet.
          </div>
        )}

        {/* Featured Leader — photo beside intro */}
        {!loading && !error && leader && (
          <div
            className={`flex flex-col md:flex-row items-center md:items-start gap-10 lg:gap-16 transition-all duration-600 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Rectangular Photo with Gold Frame */}
            <div className="p-1 border-4 border-[#deb853] bg-[#FFDF96] shadow-md w-[270px] h-[306px] flex-shrink-0 mx-auto md:mx-0 hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full overflow-hidden bg-gray-100">
                <ImageFallback
                  src={leader.imageUrl}
                  alt={leader.name}
                  className="w-full h-full object-cover object-center"
                  fallbackText={leader.name}
                />
              </div>
            </div>

            {/* Intro Text */}
            <div className="flex-1 text-center md:text-left">
              {/* Name */}
              <h3 className="font-['Barlow_Condensed'] font-medium text-[28px] leading-[34px] tracking-[0px] text-[#181D18] mb-1">
                {leader.name}
              </h3>

              {/* Role Title */}
              <p className="font-['Public_Sans'] font-normal text-[16px] leading-[24px] tracking-[0px] text-[#BB0012] uppercase mb-4">
                {leader.role}
              </p>

              {/* Quote / Intro Message */}
              {leader.message && (
                <p className="font-['Public_Sans'] font-light italic text-[17px] leading-[27px] tracking-[0px] text-[#3F4940] mb-6 max-w-2xl mx-auto md:mx-0">
                  {getQuote(leader)}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};