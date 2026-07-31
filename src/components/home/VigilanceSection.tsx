"use client";

import React, { useEffect, useState } from "react";
import { ImageFallback } from "../ui/ImageFallback";
import { getPublicVigilanceImages, VigilanceImage } from "@/services/vigilance"; // adjust path to match your project

// Alternating hover-lift pattern to preserve the original staggered look
// regardless of how many images come back from the API.
const getCardStyle = (index: number): string => {
  return index === 1
    ? "hover:translate-y-11 md:mt-12"
    : "hover:-translate-y-1";
};

export const VigilanceSection: React.FC = () => {
  const [images, setImages] = useState<VigilanceImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      try {
        setLoading(true);
        const data = await getPublicVigilanceImages();
        if (isMounted) {
          setImages(data);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to load vigilance images:", err);
        if (isMounted) {
          setError("Unable to load images right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-20 bg-[#0F6835] text-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12 text-center">
        {/* Title */}
        <h2 className="text-40px md:text-[40px] font-semibold uppercase tracking-wider mb-3">
          VIGILANCE IN ACTION
        </h2>

        {/* Gold Accent Bar */}
        <div className="w-27 h-1 bg-[#FFDF96] mx-auto mb-16" />

        {/* Loading state */}
        {loading && (
          <div className="py-12 text-sm text-white/70">Loading images...</div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="py-12 text-sm text-red-200">{error}</div>
        )}

        {/* Empty state */}
        {!loading && !error && images.length === 0 && (
          <div className="py-12 text-sm text-white/70">
            No vigilance images available yet.
          </div>
        )}

        {/* Image Cards Container - Aligned with Navbar Sevenstar logo & Get A Quote button */}
        {!loading && !error && images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 pb-12 w-full items-start">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`flex flex-col bg-[#FFDF96] p-[6px] shadow-2xl transition-transform duration-300 w-full h-[460px] ${getCardStyle(
                  index
                )}`}
              >
                <div className="w-full h-full overflow-hidden bg-[#08331d]">
                  <ImageFallback
                    src={image.imageUrl}
                    alt={image.caption || "Seven Star Security in action"}
                    fallbackText={image.caption || "Vigilance image"}
                    className="w-full h-full object-cover object-center"
                    containerClassName="w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};