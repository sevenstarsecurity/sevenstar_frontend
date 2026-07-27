"use client";

import React from "react";
import { statsData } from "../../data/stats";
import { AnimatedCounter } from "../ui/AnimatedCounter";
import { RotateCcw, Scale, ShieldCheck, Building2 } from "lucide-react";

export const StatsSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case "rotate-ccw":
        return <RotateCcw className="w-5 h-5 text-emerald-700" />;
      case "scale":
        return <Scale className="w-5 h-5 text-emerald-700" />;
      case "shield-check":
        return <ShieldCheck className="w-5 h-5 text-emerald-700" />;
      case "building-2":
        return <Building2 className="w-5 h-5 text-emerald-700" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <section className="py-16 bg-[#f4f7f5] border-y border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center text-center group"
            >

              {/* Circular light green icon pill */}
              <div className="w-12 h-12 rounded-full bg-emerald-100/70 border border-emerald-200/60 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300">
                {getIcon(stat.iconName)}
              </div>


              {/* Animated Stat Value */}
              <div className="text-4xl md:text-[56px] font-semibold text-[#004E24] tracking-tight mb-2">
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  duration={2200}
                />
              </div>


              {/* Stat Label */}
              <span className="text-[14px] font-extrabold tracking-widest text-[#3F4940] uppercase">
                {stat.label}
              </span>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};