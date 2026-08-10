"use client";

import React from "react";
import { PageHeroBanner } from "../ui/PageHeroBanner";

export const ServicesHeroBanner: React.FC = () => {
  return (
    <PageHeroBanner 
      label="SERVICES"
      title="COMPLETE SECURITY SOLUTIONS"
      breadcrumbTitle="Services"
      disableGlow
    />
  );
};
