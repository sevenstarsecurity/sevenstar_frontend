"use client";

import { getPublicSocialLinks, SocialLink, SocialPlatform } from "@/services/socialmedia";
import {
  Calendar,
  ChevronRight,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Share2,
  Shield,
  Truck,
  UserCheck,
  Video,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { ImageFallback } from "../ui/ImageFallback";

const PLATFORM_ICONS: Record<SocialPlatform, React.ReactNode> = {
  FACEBOOK: <FaFacebook className="w-4 h-4" />,
  INSTAGRAM: <FaInstagram className="w-4 h-4" />,
  LINKEDIN: <FaLinkedin className="w-4 h-4" />,
  YOUTUBE: <FaYoutube className="w-4 h-4" />,
  TIKTOK: <FaTiktok className="w-4 h-4" />,
  TWITTER: <FaTwitter className="w-4 h-4" />,
};

const PLATFORM_LABELS: Record<SocialPlatform, string> = {
  FACEBOOK: "Facebook",
  INSTAGRAM: "Instagram",
  LINKEDIN: "LinkedIn",
  YOUTUBE: "YouTube",
  TIKTOK: "TikTok",
  TWITTER: "Twitter / X",
};

export const Footer: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isLoadingSocial, setIsLoadingSocial] = useState(true);

  useEffect(() => {
    const loadSocialLinks = async () => {
      try {
        const links = await getPublicSocialLinks();
        console.log("[Footer DEBUG] raw links from API:", links);
        const active = links.filter((link) => link.isActive);
        console.log("[Footer DEBUG] active links after filter:", active);
        setSocialLinks(active);
      } catch (err) {
        console.error("[Footer DEBUG] fetch error:", err);
        setSocialLinks([]);
      } finally {
        setIsLoadingSocial(false);
      }
    };

    loadSocialLinks();
  }, []);

  return (
    <footer className="bg-[#131612] text-gray-300 pt-10 md:pt-14 pb-8 border-t border-[#1e231b]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
        {/* Top Grid: 4 Columns on large, 2 on medium, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pb-10 md:pb-12">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
            <Link href="/" className="flex items-center mb-1 group">
              <ImageFallback
                src="/images/sevenstarbg.webp"
                alt="Seven Star Security Logo"
                className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                fallbackText="sevenstarbg.webp"
              />
            </Link>

            {/* Mobile view: full width paragraph */}
            <p className="text-[#9ca396] text-xs leading-relaxed w-full sm:hidden">
              Elite Protection Services. Safeguarding assets, ensuring operational continuity, and providing peace of mind across Nepal since 2012.
            </p>

            {/* Desktop/Web view: exact original layout */}
            <div className="hidden sm:block text-[#9ca396] text-xs md:text-sm leading-relaxed max-w-xs space-y-1">
              <p>Elite Protection Services.</p>
              <p>Safeguarding assets, ensuring</p>
              <p>operational continuity, and providing</p>
              <p>peace of mind across Nepal since</p>
              <p>2012.</p>
            </div>

            {/* Social Square Icons — dynamic from admin-managed API */}
            {/* TEMP DEBUG: rendering unconditionally (no isLoadingSocial gate) so we can see state directly */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 justify-center sm:justify-start min-h-[32px]">
              {isLoadingSocial && (
                <span className="text-[10px] text-yellow-400">[DEBUG] still loading...</span>
              )}
              {!isLoadingSocial && socialLinks.length === 0 && (
                <span className="text-[10px] text-red-400">
                  [DEBUG] loaded but 0 active links in state
                </span>
              )}
              {socialLinks.map((link) => {
                console.log(
                  "[Footer DEBUG] rendering icon for platform:",
                  link.platform,
                  "icon exists:",
                  !!PLATFORM_ICONS[link.platform]
                );
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={PLATFORM_LABELS[link.platform] ?? link.platform}
                    className="w-8 h-8 rounded-[3px] bg-[#004e24] flex items-center justify-center text-white hover:bg-[#006830] transition-colors"
                  >
                    {PLATFORM_ICONS[link.platform] ?? <Share2 className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: QUICK LINKS */}
          <div className="space-y-4 lg:pt-[68px] flex flex-col items-start text-left">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-[3px] h-4 bg-[#c8102e] inline-block flex-shrink-0" />
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                QUICK LINKS
              </h4>
            </div>

            <ul className="space-y-3 text-xs md:text-sm text-[#9ca396] flex flex-col items-start">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Our Team", href: "/team" },
                { name: "Services", href: "/services" },
                { name: "Branches", href: "/branches" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#9ca396] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: OUR SERVICES */}
          <div className="space-y-4 lg:pt-[68px] flex flex-col items-start text-left">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-[3px] h-4 bg-[#c8102e] inline-block flex-shrink-0" />
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                OUR SERVICES
              </h4>
            </div>

            <ul className="space-y-3 text-xs md:text-sm text-[#9ca396] flex flex-col items-start">
              <li>
                <Link href="/services" className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
                  <Shield className="w-4 h-4 text-[#008e43] flex-shrink-0" />
                  <span>Security Guard Services</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
                  <UserCheck className="w-4 h-4 text-[#008e43] flex-shrink-0" />
                  <span>VIP Protection</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
                  <Video className="w-4 h-4 text-[#008e43] flex-shrink-0" />
                  <span>CCTV &amp; Surveillance</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
                  <Calendar className="w-4 h-4 text-[#008e43] flex-shrink-0" />
                  <span>Event Security</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
                  <Truck className="w-4 h-4 text-[#008e43] flex-shrink-0" />
                  <span>Vehicle Fleet Management</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: CONTACT INFO */}
          <div className="space-y-4 lg:pt-[68px] flex flex-col items-start text-left">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-[3px] h-4 bg-[#c8102e] inline-block flex-shrink-0" />
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                CONTACT INFO
              </h4>
            </div>

            <ul className="space-y-3 text-xs md:text-sm text-[#9ca396] flex flex-col items-start">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#008e43] flex-shrink-0 mt-0.5" />
                <span>
                  HQ: Chandol-4, Kathmandu, Nepal, 44600
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <GraduationCap className="w-4 h-4 text-[#008e43] flex-shrink-0 mt-0.5" />
                <span>Training Center: Chandol-4, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#008e43] flex-shrink-0" />
                <span>01-4542880</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#008e43] flex-shrink-0" />
                <a
                  href="mailto:info@sevenstarsecurity.com.np"
                  className="hover:text-white transition-colors"
                >
                  info@sevenstarsecurity.com.np
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-[#1e231b] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#8b9186] text-center md:text-left">
  <p>© {new Date().getFullYear()} SEVEN STAR SECURITY SERVICE PVT. LTD. ALL RIGHTS RESERVED.</p>
  <div className="text-[#deb853]">
    Design &amp; Developed by:{" "}
    
    <a  href="https://www.kreativemandu.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline hover:text-[#f0c040] transition-colors duration-200"
    >
      KREATIVEMANDU TECHNOLOGIES
    </a>
  </div>
</div>
      </div>
    </footer>
  );
};


