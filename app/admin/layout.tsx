"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isAuthenticated } from "@/services/auth";
import { AdminRouteGuard } from "@/src/components/admin/AdminRouteGuard";
import { AdminSidebar } from "@/src/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const isRoot = pathname === "/admin";

  useEffect(() => {
    if (isRoot && isAuthenticated()) {
      router.replace("/admin/dashboard");
    }
  }, [isRoot, router]);

  return (
    <AdminRouteGuard>
      <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f4f6f3] text-gray-800 font-sans selection:bg-[#0b4226] selection:text-white">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">{children}</div>
      </div>
    </AdminRouteGuard>
  );
}
