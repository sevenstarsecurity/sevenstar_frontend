"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Shield,
  UserCheck,
  Video,
  Calendar,
  Truck,
  MapPin,
  GraduationCap,
  Phone,
  Mail,
  Camera,
  User,
  Briefcase,
} from "lucide-react";
import { ImageFallback } from "../ui/ImageFallback";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#131612] text-gray-300 pt-14 pb-8 border-t border-[#1e231b]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
        {/* Top Grid: 4 Equal Columns (~252px each) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center mb-3 group">
              <ImageFallback
                src="/images/sevennobg.png"
                alt="Seven Star Security Logo"
                className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                fallbackText="sevenstarlogo.png"
              />
            </Link>

            <div className="text-[#9ca396] text-xs md:text-[13px] leading-relaxed max-w-xs space-y-0.5">
              <p>Elite Protection Services.</p>
              <p>Safeguarding assets, ensuring</p>
              <p>operational continuity, and providing</p>
              <p>peace of mind across Nepal since</p>
              <p>2012.</p>
            </div>

            {/* Social Square Icons */}
            <div className="flex items-center space-x-2.5 pt-3">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-[3px] bg-[#004e24] flex items-center justify-center text-white hover:bg-[#006830] transition-colors"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-[3px] bg-[#004e24] flex items-center justify-center text-white hover:bg-[#006830] transition-colors"
              >
                <User className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-[3px] bg-[#004e24] flex items-center justify-center text-white hover:bg-[#006830] transition-colors"
              >
                <span className="font-bold text-sm">✕</span>
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-[3px] bg-[#004e24] flex items-center justify-center text-white hover:bg-[#006830] transition-colors"
              >
                <Briefcase className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: QUICK LINKS */}
          <div className="space-y-4 md:pt-[68px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-[3px] h-4 bg-[#c8102e] inline-block flex-shrink-0" />
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                QUICK LINKS
              </h4>
            </div>

            <ul className="space-y-3 text-xs md:text-sm text-[#9ca396]">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "#about" },
                { name: "Services", href: "#services" },
                { name: "Careers", href: "#career" },
                { name: "Contact Us", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#9ca396] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: OUR SERVICES */}
          <div className="space-y-4 md:pt-[68px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-[3px] h-4 bg-[#c8102e] inline-block flex-shrink-0" />
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                OUR SERVICES
              </h4>
            </div>

            <ul className="space-y-3 text-xs md:text-sm text-[#9ca396]">
              <li className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
                <Shield className="w-4 h-4 text-[#008e43] flex-shrink-0" />
                <span>Security Guard Services</span>
              </li>
              <li className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
                <UserCheck className="w-4 h-4 text-[#008e43] flex-shrink-0" />
                <span>VIP Protection</span>
              </li>
              <li className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
                <Video className="w-4 h-4 text-[#008e43] flex-shrink-0" />
                <span>CCTV &amp; Surveillance</span>
              </li>
              <li className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
                <Calendar className="w-4 h-4 text-[#008e43] flex-shrink-0" />
                <span>Event Security</span>
              </li>
              <li className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
                <Truck className="w-4 h-4 text-[#008e43] flex-shrink-0" />
                <span>Vehicle Fleet Management</span>
              </li>
            </ul>
          </div>

          {/* Column 4: CONTACT INFO */}
          <div className="space-y-4 md:pt-[68px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-[3px] h-4 bg-[#c8102e] inline-block flex-shrink-0" />
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                CONTACT INFO
              </h4>
            </div>

            <ul className="space-y-3 text-xs md:text-sm text-[#9ca396]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#008e43] flex-shrink-0 mt-0.5" />
                <span>
                  HQ: Kathmandu, Bagmati Province, Nepal, 44600
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <GraduationCap className="w-4 h-4 text-[#008e43] flex-shrink-0 mt-0.5" />
                <span>Training Center: Lalitpur, Nepal</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#008e43] flex-shrink-0" />
                <span>+977 1 4XXXXXX</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#008e43] flex-shrink-0" />
                <span>info@sevenstar.com.np</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-[#1e231b] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] md:text-xs font-semibold tracking-wider uppercase text-[#8b9186]">
          <p>© 2024 SEVEN STAR SECURITY SERVICE PVT. LTD. ALL RIGHTS RESERVED.</p>
          <div className="text-[#deb853]">
            <span>GOVT LICENSE NO. 127991/2071/072</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
