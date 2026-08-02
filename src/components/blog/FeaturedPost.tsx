"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ImageFallback } from "../ui/ImageFallback";
import { blogPosts } from "@/src/data/blogPosts";

export const FeaturedPost: React.FC = () => {
  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];

  return (
    <section className="bg-[#f0f5ea] pt-12 md:pt-16 pb-8">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-12">
        {/* Featured Card Wrapper with Top Red Line */}
        <div className="relative bg-white shadow-md border border-gray-200/80 overflow-hidden border-t-4 border-t-[#c8102e] group transition-all duration-300 hover:shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Image Column (Spans 6 cols on lg) */}
            <div className="lg:col-span-6 relative h-[240px] sm:h-[300px] lg:h-[360px] overflow-hidden bg-gray-100">
              <Link href={`/blog/${featuredPost.id}`} className="block w-full h-full">
                <ImageFallback
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  fallbackText={featuredPost.fallback}
                />
              </Link>
              {/* Featured Badge */}
              <div className="absolute top-4 left-4 bg-[#004E24] text-white text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-xs shadow-xs">
                FEATURED
              </div>
            </div>

            {/* Right Content Column (Spans 6 cols on lg) */}
            <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
              <div>
                {/* Meta Row: Category + Date */}
                <div className="flex items-center space-x-3 mb-4">
                  <span
                    className="bg-[#e6f0e4] text-[#004E24] text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-xs"
                    style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                  >
                    {featuredPost.category}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">{featuredPost.date}</span>
                </div>

                {/* Title */}
                <h2
                  className="text-xl sm:text-2xl lg:text-[32px] font-bold text-[#181D18] group-hover:text-[#004E24] transition-colors leading-tight mb-4"
                  style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                >
                  <Link href={`/blog/${featuredPost.id}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p
                  className="text-gray-600 text-xs sm:text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                >
                  {featuredPost.excerpt}
                </p>
              </div>

              {/* Author & CTA Row */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                {/* Author Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                    <ImageFallback
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-full h-full object-cover"
                      fallbackText={featuredPost.author.name}
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{featuredPost.author.name}</h4>
                    <p className="text-[11px] text-gray-500">{featuredPost.author.role}</p>
                  </div>
                </div>

                {/* Read Story Link */}
                <Link
                  href={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-[#004E24] hover:text-[#0b4226] tracking-wider uppercase group/link"
                  style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                >
                  <span>READ STORY</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

