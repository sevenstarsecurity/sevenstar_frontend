"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ImageFallback } from "../ui/ImageFallback";
import { ArrowRight, ChevronDown } from "lucide-react";
import { blogPosts, BlogPost } from "@/src/data/blogPosts";

export const BlogGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  // Exclude featured post from grid if desired, or show posts 2..n initial + load more
  const initialSliceCount = 6;
  const [visibleCount, setVisibleCount] = useState(initialSliceCount);

  const categories = [
    "ALL",
    "COMPANY NEWS",
    "SECURITY TIPS",
    "INDUSTRY INSIGHTS",
    "CASE STUDIES",
    "EVENTS",
  ];

  const filteredPosts =
    activeTab === "ALL"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeTab);

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section className="bg-[#f0f5ea] py-10 md:py-16">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveTab(cat);
                setVisibleCount(initialSliceCount);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                activeTab === cat
                  ? "bg-[#004E24] text-white shadow-xs"
                  : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-[#004E24] border border-gray-200/80"
              }`}
              style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Image Frame */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-100">
                <Link href={`/blog/${post.id}`} className="block w-full h-full">
                  <ImageFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    fallbackText={post.fallback}
                  />
                </Link>
                {/* Category Badge on Top-Left */}
                <div className="absolute top-3 left-3 bg-[#004E24] text-white text-[9px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-xs">
                  {post.category}
                </div>
                {/* Red Accent Line below image */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#c8102e]" />
              </div>

              {/* Content Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3
                    className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#004E24] transition-colors leading-snug mb-2"
                    style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                  >
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p
                    className="text-gray-600 text-xs leading-relaxed line-clamp-2"
                    style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                  >
                    {post.excerpt}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                  <span className="text-gray-500 font-medium">{post.date}</span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-[#004E24] hover:text-[#0b4226] font-bold inline-flex items-center space-x-1.5 group/btn bg-emerald-50 hover:bg-[#004E24] hover:text-white p-2 rounded-full transition-all duration-200"
                    aria-label={`Read full story: ${post.title}`}
                  >
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Articles Button */}
        {visibleCount < filteredPosts.length && (
          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              className="bg-[#004E24] hover:bg-[#003d1c] text-white font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 rounded-md shadow-sm hover:shadow-md transition-all duration-200 flex items-center space-x-2 cursor-pointer"
              style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
            >
              <span>LOAD MORE ARTICLES</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

