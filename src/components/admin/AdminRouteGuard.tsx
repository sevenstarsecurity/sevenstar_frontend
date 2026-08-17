"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/services/auth";
import { NotFoundUI } from "../ui/NotFoundUI";

interface AdminRouteGuardProps {
  children?: React.ReactNode;
  redirectAuthenticatedTo?: string;
}

export const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({
  children,
  redirectAuthenticatedTo,
}) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && redirectAuthenticatedTo && isAuthenticated()) {
      router.replace(redirectAuthenticatedTo);
    }
  }, [mounted, redirectAuthenticatedTo, router]);

  if (!mounted) {
    return null;
  }

  if (!isAuthenticated()) {
    return <NotFoundUI />;
  }

  if (redirectAuthenticatedTo) {
    return null;
  }

  return <>{children}</>;
};
