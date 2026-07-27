"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ImageFallback } from "../ui/ImageFallback";
import { ArrowRight, ChevronDown } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  fallback: string;
}

const initialPosts: BlogPost[] = [
  {
    id: 1,
    category: "SECURITY TIPS",
    title: "5 Signs Your Property Needs Better Security Coverage",
    excerpt:
      "Protecting your assets starts with identifying vulnerabilities before they are exploited. Here is...",
    date: "Oct 16, 2024",
    image: "/images/mic123.png",
    fallback: "mic123.png",
  },
  {
    id: 2,
    category: "INDUSTRY INSIGHTS",
    title: "The Future of AI-Driven Surveillance in Kathmandu",
    excerpt:
      "Exploring how neural networks and facial recognition are transforming urban safety and...",
    date: "Oct 12, 2024",
    image: "/images/stand.png",
    fallback: "stand.png",
  },
  {
    id: 3,
    category: "EVENTS",
    title: "Recap: Quarterly Tactical Training Workshop 2024",
    excerpt:
      "A look inside our rigorous training protocols that ensure every Seven Star operative is prepared...",
    date: "Oct 05, 2024",
    image: "/images/salam.png",
    fallback: "salam.png",
  },
  {
    id: 4,
    category: "CASE STUDIES",
    title: "Securing the Hetauda Industrial District: A Study",
    excerpt:
      "How Seven Star implemented a 360-degree security ecosystem for one of Nepal's largest...",
    date: "Sep 28, 2024",
    image: "/images/Security Operations Background.png",
    fallback: "Security Operations Background.png",
  },
  {
    id: 5,
    category: "SECURITY TIPS",
    title: "Corporate Lobby Security: First Line of Defense",
    excerpt:
      "Best practices for visitor management and entry point control in high-traffic commercial...",
    date: "Sep 20, 2024",
    image: "/images/our story.jpg",
    fallback: "our story.jpg",
  },
  {
    id: 6,
    category: "COMPANY NEWS",
    title: "Celebrating 15 Years of Unrivaled Security Excellence",
    excerpt:
      "A milestone event honoring the dedication of our staff and the continued trust of our valued...",
    date: "Sep 15, 2024",
    image: "/images/majorganesh.png",
    fallback: "majorganesh.png",
  },
];

const morePosts: BlogPost[] = [
  {
    id: 7,
    category: "SECURITY TIPS",
    title: "Essential Night Patrol Protocols for High-Risk Venues",
    excerpt:
      "Key tactical approaches to maintaining impenetrable night security perimeters in commercial zones...",
    date: "Sep 08, 2024",
    image: "/images/ramesh.png",
    fallback: "ramesh.png",
  },
  {
    id: 8,
    category: "INDUSTRY INSIGHTS",
    title: "Evaluating Risk Profiles for Financial Institutions",
    excerpt:
      "Comprehensive analysis framework used by Seven Star specialists to assess banking security readiness...",
    date: "Sep 01, 2024",
    image: "/images/purna.png",
    fallback: "purna.png",
  },
  {
    id: 9,
    category: "COMPANY NEWS",
    title: "Seven Star Security Expands Executive Protection Unit",
    excerpt:
      "Introducing specialized diplomatic and high-net-worth individual escort services across major hubs...",
    date: "Aug 24, 2024",
    image: "/images/mic123.png",
    fallback: "mic123.png",
  },
];

export const BlogGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [postsList, setPostsList] = useState<BlogPost[]>(initialPosts);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);

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
      ? postsList
      : postsList.filter((post) => post.category === activeTab);

  const handleLoadMore = () => {
    if (!hasLoadedMore) {
      setPostsList((prev) => [...prev, ...morePosts]);
      setHasLoadedMore(true);
    }
  };

  return (
    <section className="bg-[#f0f5ea] py-10 md:py-16">
      <div className="max-w-[1152px] mx-auto px-6 md:px-10 lg:px-12">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
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
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Image Frame */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-100">
                <ImageFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  fallbackText={post.fallback}
                />
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
                    <Link href={`#post-${post.id}`}>{post.title}</Link>
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
                    href={`#post-${post.id}`}
                    className="text-[#004E24] hover:text-[#0b4226] font-bold inline-flex items-center space-x-1 group/btn"
                    aria-label={`Read ${post.title}`}
                  >
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Articles Button */}
        {!hasLoadedMore && (
          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              className="bg-[#004E24] hover:bg-[#003d1c] text-white font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 rounded-md shadow-sm hover:shadow-md transition-all duration-200 flex items-center space-x-2"
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
