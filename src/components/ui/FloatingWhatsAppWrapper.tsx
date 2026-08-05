"use client";

import { usePathname } from "next/navigation";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

export const FloatingWhatsAppWrapper: React.FC = () => {
  const pathname = usePathname();

  // Hide on all admin panel routes
  if (pathname?.startsWith("/admin")) return null;

  return <FloatingWhatsApp />;
};
