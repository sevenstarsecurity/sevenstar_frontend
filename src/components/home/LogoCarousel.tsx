"use client";

import React, { useEffect, useState } from "react";
import { companyLogos } from "../../data/companyLogos";
import { ImageFallback } from "../ui/ImageFallback";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Client, getPublicClients } from "@/services/clients";

interface CarouselLogo {
  id: string;
  src: string;
  alt: string;
}

// Static fallback so the carousel still renders something if the API is
// unreachable or returns no clients.
const FALLBACK_LOGOS: CarouselLogo[] = companyLogos.map((logo) => ({
  id: String(logo.id),
  src: logo.src,
  alt: logo.alt,
}));

export const LogoCarousel: React.FC = () => {
  const [logos, setLogos] = useState<CarouselLogo[]>(FALLBACK_LOGOS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadClients = async () => {
      try {
        const clients: Client[] = await getPublicClients();

        // Public endpoint should already only return active clients,
        // but filter defensively and sort by displayOrder (lower = first).
        const active = clients
          .filter((c) => c.isActive)
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((c) => ({
            id: c.id,
            src: c.logoUrl,
            alt: c.name,
          }));

        if (!cancelled && active.length > 0) {
          setLogos(active);
        }
      } catch {
        // Network/API error — keep the static fallback logos.
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadClients();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-white py-6 border-b border-gray-100 w-full">
        <div className="flex items-center justify-center h-14">
          <div className="w-32 h-3 rounded-full bg-gray-100 animate-pulse" />
        </div>
      </div>
    );
  }

  // Multiply items to ensure seamless infinite scroll across full screen width
  const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="bg-white py-6 border-b border-gray-100 relative overflow-hidden w-full">
      <div className="w-full relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 text-gray-400">
          <ChevronLeft className="w-5 h-5" />
        </div>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 text-gray-400">
          <ChevronRight className="w-5 h-5" />
        </div>

        <div className="flex overflow-hidden select-none w-full">
          <div className="flex items-center space-x-12 md:space-x-16 animate-slow-marquee hover:[animation-play-state:paused] py-2">
            {marqueeLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex items-center justify-center flex-shrink-0 h-14 w-40 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105"
              >
                <ImageFallback
                  src={logo.src}
                  alt={logo.alt}
                  fallbackText={logo.alt}
                  className="max-h-12 max-w-[140px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};