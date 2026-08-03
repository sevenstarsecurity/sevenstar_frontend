"use client";

import React, { useEffect, useRef, useState } from "react";
import { ImageFallback } from "../ui/ImageFallback";
import { getPublicStaff, Staff } from "@/services/staff";
import { AxiosError } from "axios";

// ─── Sample fallback data shown when API returns no staff ──────────────────
const SAMPLE_STAFF: Staff[] = [
  {
    id: "sample-1",
    name: "Rajesh Kumar Shrestha",
    role: "Senior Security Officer",
    message: "Dedicated to maintaining safety and order at every post.",
    imageUrl: "https://picsum.photos/seed/rajesh/400/400",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "sample-2",
    name: "Sunita Tamang",
    role: "Operations Coordinator",
    message: "Ensuring seamless coordination across all security divisions.",
    imageUrl: "https://picsum.photos/seed/sunita/400/400",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "sample-3",
    name: "Bikas Rai",
    role: "Field Supervisor",
    message: "Leading field teams with discipline and precision.",
    imageUrl: "https://picsum.photos/seed/bikas/400/400",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "sample-4",
    name: "Priya Gurung",
    role: "Security Analyst",
    message: "Analyzing risks and ensuring proactive security measures daily.",
    imageUrl: "https://picsum.photos/seed/priya/400/400",
    displayOrder: 4,
    isActive: true,
  },
];

export const TeamStaffSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [staffList, setStaffList] = useState<Staff[]>([]);
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

    const fetchStaff = async () => {
      try {
        setLoading(true);
        const data = await getPublicStaff();
        if (mounted) {
          const activeSorted = data
            .filter((s) => s.isActive)
            .sort((a, b) => a.displayOrder - b.displayOrder);
          // Fall back to sample data if API returns empty
          setStaffList(activeSorted.length > 0 ? activeSorted : SAMPLE_STAFF);
          setError(null);
        }
      } catch (err) {
        const axiosErr = err as AxiosError;
        console.error("Failed to fetch staff members:", axiosErr);
        if (mounted) {
          // On error, show sample data instead of error state
          setStaffList(SAMPLE_STAFF);
          setError(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchStaff();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-20 md:py-24 bg-white" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12 text-center">
        {/* Section Title */}
        <div className="mb-16">
          <h2
            className="text-3xl md:text-4xl font-semibold tracking-wider text-[#004E24] uppercase"
            style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
          >
            OUR STAFF
          </h2>
          <div className="w-16 h-1 bg-[#c8102e] mx-auto mt-3 rounded-full" />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-[#004E24] text-sm font-medium py-10">
            Loading staff members...
          </div>
        )}

        {/* Staff Member Cards */}
        {!loading && staffList.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12 items-start w-full mx-auto">
            {staffList.map((member, i) => (
              <div
                key={member.id}
                className={`flex flex-col items-center text-center group transition-all duration-600 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Circular Photo with Outer Golden Border Ring */}
                <div className="p-1 rounded-full border-2 border-[#f3d37a] shadow-sm mb-6 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-40 h-40 md:w-44 md:h-44 rounded-full overflow-hidden bg-gray-100 shadow-inner">
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
                  className="text-2xl font-normal text-[#004E24] leading-[31.2px] tracking-normal mb-1"
                  style={{ fontFamily: "'Public Sans', sans-serif" }}
                >
                  {member.name}
                </h3>

                {/* Role / Title */}
                <p
                  className="text-xs md:text-sm font-bold text-[#c8102e] uppercase tracking-wider mb-3"
                  style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                >
                  {member.role}
                </p>

                {/* Bio / Message */}
                {member.message && (
                  <p
                    className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-xs font-normal italic"
                    style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                  >
                    &quot;{member.message}&quot;
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
