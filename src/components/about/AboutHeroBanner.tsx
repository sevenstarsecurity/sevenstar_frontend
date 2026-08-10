"use client";

import React from "react";
import { PageHeroBanner } from "../ui/PageHeroBanner";

export const AboutHeroBanner: React.FC = () => {
  return (
    <PageHeroBanner 
      label="ABOUT"
      title="ABOUT SEVEN STAR SECURITY PVT. LTD. "
      breadcrumbTitle="About Us"
      disableGlow
    />
  );
};
