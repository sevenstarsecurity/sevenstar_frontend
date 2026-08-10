"use client";

import { Client, getPublicClients } from "@/services/clients";
import React, { useEffect, useState } from "react";
import { companyLogos } from "../../data/companyLogos";
import { ImageFallback } from "../ui/ImageFallback";

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
        <div className="flex overflow-hidden select-none w-full">
<div
  className="flex items-center space-x-6 md:space-x-8 animate-slow-marquee hover:[animation-play-state:paused] py-2"
  style={{ animationDuration: "110s" }}
>


            {marqueeLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
className="flex items-center justify-center flex-shrink-0 h-10 w-28 md:h-14 md:w-40 transition-all duration-300 transform hover:scale-105"
              >
                <ImageFallback
                  src={logo.src}
                  alt={logo.alt}
                  fallbackText={logo.alt}
                  className="max-h-8 max-w-[100px] md:max-h-12 md:max-w-[140px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};