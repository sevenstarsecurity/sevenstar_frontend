import { Footer } from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";
import { TopBar } from "@/src/components/layout/TopBar";

import { BlogGrid } from "@/src/components/blog/BlogGrid";
import { BlogHeroBanner } from "@/src/components/blog/BlogHeroBanner";
import { FeaturedPost } from "@/src/components/blog/FeaturedPost";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Seven Star Security Services",
  description:
    "Security news, tips & updates from Seven Star Security — exploring rapid response hubs, AI surveillance, tactical workshops, and industry insights.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f0f5ea] text-gray-900 selection:bg-[#004E24] selection:text-white">
      {/* Top Bar Strip */}
      <TopBar />

      {/* Main Header / Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* 1. Hero Banner */}
        <BlogHeroBanner />

        {/* 2. Featured Article Banner */}
        <FeaturedPost />

        {/* 3. Filterable Blog Grid + Load More */}
        <BlogGrid />
      </main>

      {/* Newsletter Bar */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
