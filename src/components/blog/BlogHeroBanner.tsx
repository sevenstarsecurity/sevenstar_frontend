"use client";

import React from "react";
import { PageHeroBanner } from "../ui/PageHeroBanner";

export const BlogHeroBanner: React.FC = () => {
  return (
    <PageHeroBanner 
      label="BLOG"
      title="SECURITY NEWS AND UPDATES"
      breadcrumbTitle="Blog"
      disableGlow
    />
  );
};
