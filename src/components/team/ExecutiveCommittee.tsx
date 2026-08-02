"use client";

import React, { useEffect, useRef, useState } from "react";
import { ImageFallback } from "../ui/ImageFallback";
import { getPublicExecutives, Executive } from "@/services/teamexecutive"; // adjust path to your api file
import { AxiosError } from "axios";

export const ExecutiveCommittee: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [executives, setExecutives] = useState<Executive[]>([]);
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
    let mounted = true;

    const fetchExecutives = async () => {
      try {
        setLoading(true);
        const data = await getPublicExecutives();
        if (mounted) {
          // Only show active executives, sorted by displayOrder
          const activeSorted = data
            .filter((e) => e.isActive)
            .sort((a, b) => a.displayOrder - b.displayOrder);
          setExecutives(activeSorted);
          setError(null);
        }
      } catch (err) {
        // Log full details so we can see exactly what's failing:
        // URL called, status code, and response body from the backend.
        const axiosErr = err as AxiosError;
        console.error("Failed to fetch executives:", {
          url: axiosErr?.config?.url,
          baseURL: axiosErr?.config?.baseURL,
          status: axiosErr?.response?.status,
          responseData: axiosErr?.response?.data,
          message: axiosErr?.message,
        });

        if (mounted) {
          const status = axiosErr?.response?.status;
          if (status) {
            setError(
              `Failed to load executive committee (status ${status}). ${
                (axiosErr?.response?.data as any)?.message ?? ""
              }`
            );
          } else {
            setError(
              `Failed to load executive committee. ${axiosErr?.message ?? "Network error."}`
            );
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchExecutives();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-20 md:py-24 bg-[#f7faf3]" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12 text-center">
        {/* Section Title */}
        <div className="mb-16">
          <h2
            className="text-3xl md:text-4xl font-semibold tracking-wider text-[#004E24] uppercase"
            style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
          >
            EXECUTIVE COMMITTEE
          </h2>
          <div className="w-16 h-1 bg-[#c8102e] mx-auto mt-3 rounded-full" />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-[#004E24] text-sm font-medium py-10">
            Loading executive committee...
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-[#c8102e] text-sm font-medium py-10">{error}</div>
        )}

        {/* Empty State */}
        {!loading && !error && executives.length === 0 && (
          <div className="text-gray-500 text-sm font-medium py-10">
            No executive committee members found.
          </div>
        )}

        {/* Executive Cards */}
        {!loading && !error && executives.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 items-start w-full mx-auto">
            {executives.map((member, i) => (
              <div
                key={member.id}
                className={`flex flex-col items-center text-center group transition-all duration-600 ${
                  i === 1 ? "md:mt-12" : ""
                } ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Rectangular Photo with Gold Frame */}
                <div className="p-1 border-4 border-[#deb853] bg-[#FFDF96] shadow-md w-[270px] h-[306px] mx-auto mb-6 group-hover:scale-105 transition-transform duration-300 opacity-100">
                  <div className="w-full h-full overflow-hidden bg-gray-100">
                    <ImageFallback
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover object-center"
                      fallbackText={member.name}
                    />
                  </div>
                </div>

                {/* Name */}
                <h3
                  className="text-2xl font-normal text-[#004E24] leading-[31.2px] tracking-normal"
                  style={{ fontFamily: "'Public Sans', sans-serif" }}
                >
                  {member.name}
                </h3>

                {/* Role / Post */}
                <p
                  className="text-xs md:text-sm font-bold text-[#c8102e] uppercase tracking-wider mb-3"
                  style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                >
                  {member.role}
                </p>

                {/* Bio / Message */}
                {member.message && (
                  <p
                    className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-xs font-normal"
                    style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                  >
                    {member.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};