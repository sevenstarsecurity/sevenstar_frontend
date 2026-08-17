"use client";

import { usePathname } from "next/navigation";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

export const FloatingWhatsAppWrapper: React.FC = () => {
  const pathname = usePathname();

  // Hide on all admin panel routes and the netbus login page
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/netbus")) return null;

  return <FloatingWhatsApp />;
};
