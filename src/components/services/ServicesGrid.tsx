"use client";

import {
  AlertTriangle,
  ArrowRight,
  Bell,
  BookOpen,
  Building,
  Building2,
  Calendar,
  Car,
  ClipboardList,
  CreditCard,
  Crosshair,
  FileCheck,
  Flame,
  HeartPulse,
  HelpCircle,
  KeyRound,
  Lock,
  Monitor,
  Navigation,
  Search,
  Shield,
  ShieldCheck,
  Truck,
  UserCheck,
  UserCheck2,
  Users,
  Video,
} from "lucide-react";
import React, { useState } from "react";

const categories = [
  "All",
  "Guard Services",
  "Electronics & Surveillance",
  "Armed & Executive",
  "Consulting & Audit",
  "Facility & Event",
];

const allServices = [
  {
    id: 1,
    category: "Guard Services",
    title: "Security Guard Services",
    description: "Vetted, highly trained static guards for commercial, residential and corporate premises.",
    icon: Shield,
  },
  {
    id: 2,
    category: "Guard Services",
    title: "Mobile Patrol",
    description: "Scheduled and random mobile vehicle patrols for maximum area coverage.",
    icon: Navigation,
  },
  {
    id: 3,
    category: "Facility & Event",
    title: "Crowd Control",
    description: "Professional management of large crowds for events, exhibitions and public gatherings.",
    icon: Users,
  },
  {
    id: 4,
    category: "Guard Services",
    title: "Traffic Management",
    description: "Trained personnel to direct traffic and manage parking areas safely.",
    icon: Car,
  },
  {
    id: 5,
    category: "Armed & Executive",
    title: "Escort Security",
    description: "Safe movement of valuable cargo, personnel and VIPs across transit routes.",
    icon: Truck,
  },
  {
    id: 6,
    category: "Armed & Executive",
    title: "Bank Security",
    description: "Armed and unarmed guards trained for financial institution protection.",
    icon: Building,
  },
  {
    id: 7,
    category: "Electronics & Surveillance",
    title: "ATM Surveillance & Monitoring",
    description: "24/7 monitoring and physical security for ATM kiosks nationwide.",
    icon: CreditCard,
  },
  {
    id: 8,
    category: "Electronics & Surveillance",
    title: "CCTV Installation & Monitoring",
    description: "High-definition camera setup with 24/7 live video monitoring.",
    icon: Video,
  },
  {
    id: 9,
    category: "Electronics & Surveillance",
    title: "Access Control",
    description: "Biometric and card-based entry management systems.",
    icon: KeyRound,
  },
  {
    id: 10,
    category: "Electronics & Surveillance",
    title: "Alarm Response",
    description: "Immediate dispatch of armed/unarmed teams upon alarm activation.",
    icon: Bell,
  },
  {
    id: 11,
    category: "Facility & Event",
    title: "Fire Security",
    description: "Fire watch personnel and compliance audits to prevent fire hazards.",
    icon: Flame,
  },
  {
    id: 12,
    category: "Electronics & Surveillance",
    title: "Remote Monitoring",
    description: "Off-site surveillance command center for round-the-clock facility monitoring.",
    icon: Monitor,
  },
  {
    id: 13,
    category: "Armed & Executive",
    title: "Executive Protection",
    description: "Discreet personal security details for high-profile individuals and executives.",
    icon: UserCheck,
  },
  {
    id: 14,
    category: "Armed & Executive",
    title: "VIP Escort Service",
    description: "Armed escort teams with specialized vehicles for secure transit.",
    icon: ShieldCheck,
  },
  {
    id: 15,
    category: "Facility & Event",
    title: "Event Security",
    description: "Tailored security planning for concerts, corporate events and private galas.",
    icon: Calendar,
  },
  {
    id: 16,
    category: "Guard Services",
    title: "Emergency Response",
    description: "Rapid response teams equipped for crisis and threat resolution.",
    icon: AlertTriangle,
  },
  {
    id: 17,
    category: "Consulting & Audit",
    title: "Fire Safety",
    description: "Comprehensive fire safety training and emergency evacuation drills.",
    icon: FileCheck,
  },
  {
    id: 18,
    category: "Facility & Event",
    title: "First Aid",
    description: "Certified first aid personnel for emergency medical support on site.",
    icon: HeartPulse,
  },
  {
    id: 19,
    category: "Consulting & Audit",
    title: "Risk Assessment",
    description: "In-depth security vulnerability audits and risk analysis.",
    icon: Search,
  },
  {
    id: 20,
    category: "Consulting & Audit",
    title: "Security Consultancy",
    description: "Strategic advice on setting up comprehensive security frameworks.",
    icon: HelpCircle,
  },
  {
    id: 21,
    category: "Consulting & Audit",
    title: "Training Programs",
    description: "Customized security training for in-house corporate teams.",
    icon: BookOpen,
  },
  {
    id: 22,
    category: "Consulting & Audit",
    title: "Audits & Surveys",
    description: "Detailed security reviews for operational compliance.",
    icon: ClipboardList,
  },
  {
    id: 23,
    category: "Consulting & Audit",
    title: "Background Checks",
    description: "Thorough vetting and verification for employee background checks.",
    icon: UserCheck2,
  },
  {
    id: 24,
    category: "Guard Services",
    title: "Loss Prevention",
    description: "Retail and industrial asset protection to minimize shrink and theft.",
    icon: Lock,
  },
  {
    id: 25,
    category: "Armed & Executive",
    title: "Armed Protection",
    description: "Licensed armed officers for high-risk assets and installations.",
    icon: Crosshair,
  },
  {
    id: 26,
    category: "Guard Services",
    title: "Facility Guard",
    description: "Dedicated site security officers for industrial and commercial complexes.",
    icon: Building2,
  },
];

export const ServicesGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices =
    activeCategory === "All"
      ? allServices
      : allServices.filter((s) => s.category === activeCategory);

  return (
    <section className="py-16 md:py-24 bg-[#f7faf3]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
        {/* Filter Category Pills Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text- font-bold tracking-wider transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#0b4226] text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-emerald-600 hover:text-[#0b4226]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 26 Services Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-xl p-7 border border-gray-100 shadow-xs hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Icon Circle */}
                  <div className="w-10 h-10 rounded-full bg-[#0b4226] text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-xs">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Title */}
<h3
  className="
    font-['Public_Sans']
    font-medium
    text-[24px]
    leading-[31.2px]
    tracking-[0px]
    text-[#181D18]
    mb-2.5
    group-hover:text-[#0b4226]
    transition-colors
  "
>
  {service.title}
</h3>

                  {/* Description */}
                  <p className="text-gray-600 text-xs leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Learn More Link */}
<a
  href="#contact"
  className="inline-flex items-center gap-1.5 text-[#c8102e] hover:text-[#a60d25] uppecase transition-colors group/link pt-2"
  style={{
    fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
    fontStyle: "normal",
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0px",
    verticalAlign: "middle",
  }}
>
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
