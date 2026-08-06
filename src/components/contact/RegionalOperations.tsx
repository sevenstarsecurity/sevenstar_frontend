"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getPublicBranches, Branch } from "@/services/branches";

// Static fallback in case backend is loading or unreachable
const FALLBACK_REGIONS = [
  { id: "birtamode", name: "BIRTAMODE" },
  { id: "birgunj", name: "BIRGUNJ" },
  { id: "pokhara", name: "POKHARA" },
  { id: "bhairahawa", name: "BHAIRAHAWA" },
  { id: "nepalgunj", name: "NEPALGUNJ" },
];

export const RegionalOperations: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    getPublicBranches()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setBranches(data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch branches for contact page:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-[#f0f5ea] py-14 border-b border-[#e2ebd9]">
      <div className="max-w-[1152px] mx-auto px-6 md:px-10 lg:px-12 text-center">
        {/* Category Label */}
        <span
          className="block text-[11px] font-extrabold tracking-[0.2em] text-[#004E24] uppercase mb-6"
          style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
        >
          REGIONAL OPERATIONS
        </span>

        {/* Dynamic Branch Pills directly connected to backend API */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {branches.length > 0
            ? branches.map((branch) => (
                <Link
                  key={branch.id}
                  href={`/branches#${branch.id}`}
                  className="bg-[#f0f5ea] border border-[#004E24]/60 hover:bg-[#004E24] text-[#004E24] hover:text-white font-extrabold text-xs tracking-wider uppercase px-8 py-2.5 rounded-none shadow-2xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 min-w-[140px] text-center"
                  style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                >
                  {branch.name}
                </Link>
              ))
            : FALLBACK_REGIONS.map((region) => (
                <Link
                  key={region.id}
                  href={`/branches#${region.id}`}
                  className="bg-[#f0f5ea] border border-[#004E24]/60 hover:bg-[#004E24] text-[#004E24] hover:text-white font-extrabold text-xs tracking-wider uppercase px-8 py-2.5 rounded-none shadow-2xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 min-w-[140px] text-center"
                  style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                >
                  {region.name}
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
};
