"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapPin, Phone, ChevronRight } from "lucide-react";

const regionalBranches = [
  {
    name: "BHAKTAPUR BRANCH",
    manager: "Regional Manager: Binod Thapa",
    address: "Old Durbar Marg, Bhaktapur",
    phone: "+977-01-66XXXX",
  },
  {
    name: "BIRGUNJ BRANCH",
    manager: "Regional Manager: Suresh Yadav",
    address: "Traffic Chowk, Birgunj, Parsa",
    phone: "+977-051-XXXXXX",
  },
  {
    name: "POKHARA BRANCH",
    manager: "Regional Manager: Mina Gurung",
    address: "Lakeside Marg, Pokhara-9",
    phone: "+977-061-XXXXXX",
  },
  {
    name: "CHITWAN BRANCH",
    manager: "Regional Manager: Ramesh Adhikari",
    address: "Narayangarh Bazaar, Chitwan",
    phone: "+977-056-XXXXXX",
  },
  {
    name: "BIRATNAGAR BRANCH",
    manager: "Regional Manager: Raju Subba",
    address: "Mahendra Path, Biratnagar-9",
    phone: "+977-021-XXXXXX",
  },
];

export const RegionalBranches: React.FC = () => {
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
    <section className="py-16 md:py-24 bg-[#f7faf3]" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-12">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b4226] tracking-wider uppercase mb-3">
            REGIONAL BRANCHES
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-[#c8102e] rounded-full" />
            <div className="w-8 h-1 bg-[#0b4226] rounded-full" />
            <div className="w-8 h-1 bg-[#deb853] rounded-full" />
          </div>
        </div>

        {/* 2-column Grid (last card full width) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {regionalBranches.map((branch, i) => (
            <div
              key={branch.name}
              className={`bg-white rounded-xl border border-gray-100 border-l-4 border-l-[#0b4226] px-7 py-6 shadow-xs
                hover:shadow-xl hover:scale-[1.025] hover:border-l-[#c8102e]
                transition-all duration-300 ease-out group cursor-default
                ${i === 4 ? "md:col-span-2" : ""}
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Branch Name */}
                  <h3 className="text-base font-extrabold text-[#0b4226] mb-1.5 tracking-wide uppercase group-hover:text-[#c8102e] transition-colors duration-200">
                    {branch.name}
                  </h3>

                  {/* Manager */}
                  <p className="text-gray-600 text-xs mb-3 font-medium">{branch.manager}</p>

                  {/* Address */}
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#0b4226] flex-shrink-0" />
                    <span>{branch.address}</span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Phone className="w-3.5 h-3.5 text-[#0b4226] flex-shrink-0" />
                    <span>{branch.phone}</span>
                  </div>
                </div>

                {/* Direction Icon Badge */}
                <div className="flex-shrink-0 mt-1">
                  <a
                    href="#contact"
                    className="w-8 h-8 rounded-full bg-[#f7faf3] border border-[#0b4226]/20 flex items-center justify-center text-[#0b4226] hover:bg-[#0b4226] hover:text-white hover:border-transparent transition-all duration-200 group-hover:scale-110"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
