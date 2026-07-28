"use client";

import React from "react";
import { PageHeroBanner } from "../ui/PageHeroBanner";

export const BlogHeroBanner: React.FC = () => {
  return (
    <PageHeroBanner 
      label="COMPANY"
      title="Security news, tips & updates"
      breadcrumbTitle="Blog"
    />
  );
};
