"use client";

import { Award } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ImageFallback } from "../ui/ImageFallback";
import { getPublicGalleryImages, GalleryImage } from "@/services/gallery"; // adjust path to match your project

export const OperationalPortfolio: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      try {
        setLoading(true);
        const data = await getPublicGalleryImages();
        if (isMounted) {
          const sorted = [...data].sort((a, b) => a.displayOrder - b.displayOrder);
          setImages(sorted);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to load gallery images:", err);
        if (isMounted) {
          setError("Unable to load gallery right now.");
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

  // Layout has 5 image slots — map the first 5 gallery images in displayOrder
  // into those fixed positions. Falls back gracefully if fewer than 5 exist.
  const [mainImg, topRight1, topRight2, bottomLeft, bottomRight] = images;

  return (
    <section className="bg-[#f1f1f1] py-12 md:py-16 border-t border-[#e2ebd9]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
        {/* Header */}
        <div className="mb-10 pb-4 border-b border-gray-200/60">
          <h2
            className="text-2xl md:text-3xl font-bold text-[#004E24] uppercase tracking-wider relative"
            style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
          >
            OPERATIONAL PORTFOLIO
          </h2>
          <div className="w-16 h-[3px] bg-[#c8102e] mt-2" />
        </div>

        {/* Loading state */}
        {loading && (
          <div className="py-16 text-center text-sm text-gray-500">
            Loading gallery...
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="py-16 text-center text-sm text-red-600">{error}</div>
        )}

        {/* Empty state */}
        {!loading && !error && images.length === 0 && (
          <div className="py-16 text-center text-sm text-gray-500">
            No gallery images available yet.
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && images.length > 0 && (
          <div className="flex flex-col gap-4 md:gap-5">
            {/* Top Row Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {/* Main Large Image - Spans 2 Columns */}
              {mainImg && (
                <div className="md:col-span-2 relative w-full h-[320px] sm:h-[440px] md:h-[560px] overflow-hidden bg-white group">
                  <ImageFallback
                    src={mainImg.imageUrl}
                    alt={mainImg.caption || "Gallery image"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    fallbackText={mainImg.caption || "Gallery image"}
                  />
                </div>
              )}

              {/* Top Right Stacked Images - 1 Column */}
              <div className="md:col-span-1 flex flex-col gap-4 md:gap-5">
                {topRight1 && (
                  <div className="relative w-full h-[200px] sm:h-[250px] md:h-[270px] overflow-hidden bg-white group">
                    <ImageFallback
                      src={topRight1.imageUrl}
                      alt={topRight1.caption || "Gallery image"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      fallbackText={topRight1.caption || "Gallery image"}
                    />
                  </div>
                )}

                {topRight2 && (
                  <div className="relative w-full h-[200px] sm:h-[250px] md:h-[270px] overflow-hidden bg-white group">
                    <ImageFallback
                      src={topRight2.imageUrl}
                      alt={topRight2.caption || "Gallery image"}
                      className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-500"
                      fallbackText={topRight2.caption || "Gallery image"}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Row Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-start">
              {/* Bottom Left: Tall Vertical Image */}
              {bottomLeft && (
                <div className="md:col-span-1 relative w-full h-[320px] sm:h-[420px] md:h-[480px] overflow-hidden bg-white group">
                  <ImageFallback
                    src={bottomLeft.imageUrl}
                    alt={bottomLeft.caption || "Gallery image"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    fallbackText={bottomLeft.caption || "Gallery image"}
                  />
                </div>
              )}

              {/* Bottom Center: Precision Personnel Green Card (static content) */}
              <div className="md:col-span-1 relative w-full h-[200px] sm:h-[250px] md:h-[270px] bg-[#074724] p-6 sm:p-8 flex flex-col justify-between text-white overflow-hidden">
                <div>
                  <h3
                    className="text-xs sm:text-sm font-bold text-[#cba242] uppercase tracking-wider mb-3"
                    style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                  >
                    Precision Personnel
                  </h3>
                  <p className="text-xs sm:text-sm text-green-100/90 leading-relaxed">
                    Our operators undergo 1,200 hours of specialized tactical and psychological training annually.
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <Award className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-300/50 stroke-[1.5]" />
                </div>
              </div>

              {/* Bottom Right */}
              {bottomRight && (
                <div className="md:col-span-1 relative w-full h-[200px] sm:h-[250px] md:h-[270px] overflow-hidden bg-white group">
                  <ImageFallback
                    src={bottomRight.imageUrl}
                    alt={bottomRight.caption || "Gallery image"}
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-500"
                    fallbackText={bottomRight.caption || "Gallery image"}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};