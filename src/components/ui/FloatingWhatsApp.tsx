"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  message?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+9779800000000",
  message = "Hello! I am reaching out from Seven Star Security website.",
}) => {
  // Format clean digits for URL
  const cleanPhone = phoneNumber.replace(/[^\d+]/g, "").replace(/^\+/, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center select-none">
      {/* Main WhatsApp Button with Crisp Solid Color & Outward Pulse */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp Chat"
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-lg whatsapp-glow hover:scale-110 active:scale-95 transition-all duration-300 group focus:outline-none"
      >
        {/* Online Indicator Badge */}
        <span className="absolute top-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-400 border-2 border-white rounded-full z-10" />

        {/* WhatsApp Icon */}
        <FaWhatsapp className="relative z-10 w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:rotate-12" />
      </a>
    </div>
  );
};
