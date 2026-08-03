"use client";

import { getPublicLeaders, Leader } from "@/services/leadership"; // adjust path to match your project
import { ArrowRight } from "lucide-react";
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

  return (
    <section className="py-20 md:py-24 bg-[#f7faf3]" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12 text-center">
        {/* Section Heading */}
        <h2 className="font-['Barlow_Condensed'] font-medium text-[32px] leading-[38.4px] tracking-[0px] text-center text-[#181D18] mb-16">
          Our Leadership
        </h2>

        {/* Loading state */}
        {loading && (
          <div className="py-12 text-sm text-gray-500">Loading leadership team...</div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="py-12 text-sm text-red-600">{error}</div>
        )}

        {/* Empty state */}
        {!loading && !error && leaders.length === 0 && (
          <div className="py-12 text-sm text-gray-500">
            No leadership members available yet.
          </div>
        )}

        {/* Leadership Cards */}
        {!loading && !error && leaders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 items-start w-full mx-auto">
            {leaders.map((leader, i) => (
              <div
                key={leader.id}
                className={`flex flex-col items-center text-center group transition-all duration-600 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Circular Photo with Outer Golden Border Ring */}
                <div className="p-1 rounded-full border-2 border-[#f3d37a] shadow-sm mb-6 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-40 h-40 md:w-44 md:h-44 rounded-full overflow-hidden bg-gray-100 shadow-inner">
                    <ImageFallback
                      src={leader.imageUrl}
                      alt={leader.name}
                      className="w-full h-full object-cover object-center"
                      fallbackText={leader.name}
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-['Barlow_Condensed'] font-medium text-[24px] leading-[31.2px] tracking-[0px] text-center text-[#181D18] mb-1">
                  {leader.name}
                </h3>

                {/* Role Title */}
                <p className="font-['Public_Sans'] font-normal text-[16px] leading-[24px] tracking-[0px] text-center text-[#BB0012] uppercase mb-4">
                  {leader.role}
                </p>

                {/* Quote */}
                {leader.message && (
                  <p className="font-['Public_Sans'] font-light italic text-[16px] leading-[24px] tracking-[0px] text-center text-[#3F4940] mb-6 px-2 max-w-xs">
                    {getQuote(leader)}
                  </p>
                )}

                {/* Read Full Message Link */}
                
                  <a href="/blog"
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#c8102e] uppercase tracking-wider hover:text-[#9e0a22] transition-colors group/link"
                >
                  <span>READ FULL MESSAGE</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};