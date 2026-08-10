"use client";

import React from "react";
import { PageHeroBanner } from "../ui/PageHeroBanner";

export const GalleryHeroBanner: React.FC = () => {
  return (
    <PageHeroBanner 
      label="GALLERY"
      title="A LOOK INSIDE SEVEN STAR SECURITY PVT. LTD."
      breadcrumbTitle="Gallery"
      disableGlow
    />
  );
};
