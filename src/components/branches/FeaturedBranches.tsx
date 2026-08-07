"use client";

import { MapPin } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { ImageFallback } from "../ui/ImageFallback";

export const FeaturedBranches: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="bg-[#f0f5ea] py-10 md:py-16"
      ref={ref}
    >
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 space-y-8">

        {/* ── Card 1: Kathmandu Head Office ── */}
        <div
          className={`border-[2.2px] border-[#543F00] bg-white overflow-hidden flex flex-col md:flex-row transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          {/* Building photo */}
          <div className="w-full md:w-[42%] h-64 sm:h-72 md:h-auto flex-shrink-0 overflow-hidden">
            <ImageFallback
              src="/images/our story.webp"
              alt="Kathmandu Head Office"
              className="w-full h-full object-cover object-center"
              fallbackText="our story.webp"
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-center">
            {/* Badge */}
            <span className="inline-block self-start bg-[#6B4F1A] text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm mb-3 font-['Public_Sans']">
              GLOBAL HQ
            </span>

            {/* Heading */}
            <h3 className="font-['Public_Sans'] font-bold text-xl sm:text-2xl md:text-[28px] leading-tight text-[#004E24] uppercase mb-2.5">
              KATHMANDU HEAD OFFICE
            </h3>

            {/* Address */}
            <div className="flex items-center gap-1.5 mb-4">
              <MapPin className="w-3.5 h-3.5 text-[#C8102E] flex-shrink-0" />
              <span className="font-['Public_Sans'] text-xs sm:text-sm text-[#3F4940]">
                Chandol-04, Kathmandu, Nepal (Near Kundalini Health Club)
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-4" />

            {/* Contact + Operations row */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-10">
              <div>
                <p className="font-['Public_Sans'] text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1">
                  CONTACT
                </p>
                <p className="font-['Public_Sans'] text-sm sm:text-base font-bold text-gray-900">
                  +977-1-4411111
                </p>
              </div>
              <div>
                <p className="font-['Public_Sans'] text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1">
                  OPERATIONS
                </p>
                <p className="font-['Public_Sans'] text-sm sm:text-base font-bold text-[#004E24]">
                  24/7 Command Center
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 2: S3 Training Academy ── */}
        <div
          className={`border-[2.2px] border-[#543F00] bg-white overflow-hidden flex flex-col-reverse md:flex-row transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          {/* Content */}
          <div className="flex-1 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-center">
            {/* Badge */}
            <span className="inline-block self-start bg-[#004E24] text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm mb-3 font-['Public_Sans']">
              CENTER OF EXCELLENCE
            </span>

            {/* Heading */}
            <h3 className="font-['Public_Sans'] font-bold text-xl sm:text-2xl md:text-[28px] leading-tight text-[#004E24] uppercase mb-2.5">
              S3 TRAINING ACADEMY
            </h3>

            {/* Address */}
            <div className="flex items-center gap-1.5 mb-4">
              <MapPin className="w-3.5 h-3.5 text-[#C8102E] flex-shrink-0" />
              <span className="font-['Public_Sans'] text-xs sm:text-sm text-[#3F4940]">
                Swoyambhu, Kathmandu (Tactical Training Complex)
              </span>
            </div>

            {/* Quote */}
            <blockquote className="border-l-4 border-l-[#C8102E] pl-3.5 mb-6 font-['Public_Sans'] text-xs sm:text-sm leading-relaxed text-[#3F4940]">
              "Forging professionals through rigorous physical and psychological conditioning since<br></br> 2012."
            </blockquote>

            {/* CTA Button */}
            <div>
              <a
                href="/training"
                className="inline-block bg-[#004E24] hover:bg-[#00391a] text-white font-['Public_Sans'] font-regular text-[14px] tracking-wider uppercase px-5 py-3  transition-colors"
              >
                TRAINING PROGRAMS
              </a>
            </div>
          </div>

          {/* Training photo */}
          <div className="w-full md:w-[42%] h-64 sm:h-72 md:h-auto flex-shrink-0 overflow-hidden">
            <ImageFallback
              src="/images/traning.webp"
              alt="S3 Training Academy"
              className="w-full h-full object-cover "
              fallbackText="mic123.png"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
