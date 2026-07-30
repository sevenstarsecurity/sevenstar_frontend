"use client";

import { Play } from "lucide-react";
import React, { useState } from "react";
import { ImageFallback } from "../ui/ImageFallback";

export const InstitutionalReadiness: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-[#F1F5ED] py-16 md:py-24 border-t border-[#e2ebd9]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Video Simulation Card */}
        <div className="lg:col-span-6">
          <div className="relative bg-black rounded-lg overflow-hidden border border-gray-300 shadow-md group aspect-[16/10]">
            {isPlaying ? (
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Seven Star Security Training Simulation"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <ImageFallback
                  src="/images/salam.png"
                  alt="Live Training Simulation"
                  className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-500"
                  fallbackText="Training Simulation"
                />
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Play Button */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center focus:outline-none group"
                  aria-label="Play Training Video"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#c8102e] hover:bg-[#a60d25] rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </button>

                {/* Tag at bottom left */}
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c8102e] animate-pulse" />
                  <span>LIVE TRAINING SIM A-4</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Text & Stats */}
        <div className="lg:col-span-6 space-y-6">
          {/* Heading */}
          <h2
            className="font-sans text-[40px] leading-[48px] font-semibold tracking-[2px] text-[#004E24] uppercase"
          >
            INSTITUTIONAL READINESS
          </h2>

          {/* Paragraph */}
          <p
            className="text-[#3F4940] text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
          >
            Transparency is the bedrock of trust. Witness our protocols in action as we prepare for high-stakes environments across two continents. Our training facility in the Cotswolds serves as the global standard for executive safety.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-8 pt-4">
            {/* Stat 1 */}
            <div>
              <div
                className="text-4xl md:text-5xl font-extrabold text-[#004E24]"
                style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
              >
                99.8%
              </div>
              <div
                className="text-[11px] font-bold tracking-widest text-[#3F4940] uppercase mt-1"
                style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
              >
                SUCCESS RATE
              </div>
            </div>

            {/* Stat 2 */}
            <div>
              <div
                className="text-4xl md:text-5xl font-extrabold text-[#004E24]"
                style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
              >
                150+
              </div>
              <div
                className="text-[11px] font-bold tracking-widest text-[#3F4940] uppercase mt-1"
                style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
              >
                GLOBAL SITES
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
