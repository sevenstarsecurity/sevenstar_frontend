"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Medal,
  Sliders,
  Cpu,
  Clock,
  Dumbbell,
  MessageSquare,
  Shield,
  Handshake,
} from "lucide-react";

const features = [
  {
    icon: Medal,
    title: "Expertise",
    description: "Highly skilled leadership from military and police backgrounds.",
  },
  {
    icon: Sliders,
    title: "Customized Solutions",
    description: "Tailored security protocols for diverse client requirements.",
  },
  {
    icon: Cpu,
    title: "Technology",
    description: "Integration of latest electronic surveillance and monitoring.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Round-the-clock command center and response teams.",
  },
  {
    icon: Dumbbell,
    title: "Training",
    description: "Intensive physical and ethical training for all personnel.",
  },
  {
    icon: MessageSquare,
    title: "Communication",
    description: "Seamless coordination through advanced radio systems.",
  },
  {
    icon: Shield,
    title: "Proactive",
    description: "Anticipating risks before they become active threats.",
  },
  {
    icon: Handshake,
    title: "Service",
    description: "Upholding client dignity and professional standards.",
  },
];

export const WhyChooseSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-24 bg-[#121613] text-white" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
        {/* Section Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-white inline-block">
            Why choose{" "}
            <span className="relative inline-block pb-3">
              Seven Star Security
              <span className="absolute bottom-0 left-0 w-[40%] h-[4px] bg-[#deb853]" />
            </span>
          </h2>
        </div>

        {/* 4 x 2 Feature Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className={`bg-[#171c18] border border-white/10 p-4 sm:p-7 hover:border-[#40c075]/60 hover:bg-[#1b221d] hover:-translate-y-1.5 shadow-md hover:shadow-2xl hover:shadow-[#40c075]/10 transition-all duration-300 ease-out group cursor-default ${visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                  }`}
                style={{
                  // Only stagger the entrance animation. Once the card has
                  // become visible, drop the delay to 0 so every card's
                  // hover transition (which also rides on `transition-all`)
                  // responds at the same, equal speed instead of inheriting
                  // the entrance stagger.
                  transitionDelay: visible ? "0ms" : `${i * 65}ms`,
                }}
              >
                {/* Green Icon */}
                <div className="mb-3 sm:mb-5 text-[#40c075] transform group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#40c075]" />
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-[18px] font-normal text-white mb-1.5 sm:mb-2.5 tracking-[0px] group-hover:text-[#40c075] transition-colors duration-200">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-[11px] sm:text-sm leading-snug sm:leading-relaxed tracking-[0px]">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};