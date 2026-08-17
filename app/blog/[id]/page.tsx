import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TopBar } from "@/src/components/layout/TopBar";
import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { ImageFallback } from "@/src/components/ui/ImageFallback";
import { blogPosts } from "@/src/data/blogPosts";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  ShieldCheck,
  PhoneCall,
  Share2,
  CheckCircle2,
} from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

const BASE_URL = "https://www.sevenstarsecurity.com.np";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return {
      title: "Article Not Found | Seven Star Security Services",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${post.title} | Seven Star Security Services`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.id}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/blog/${post.id}`,
      siteName: "Seven Star Security Services",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author.name],
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f0f5ea] text-gray-900 selection:bg-[#004E24] selection:text-white">
      {/* Top Bar & Navbar */}
      <TopBar />
      <Navbar />

      <main className="flex-grow pb-16">
        {/* Breadcrumb & Navigation Strip */}
        <div className="bg-[#e6f0e4] border-b border-emerald-900/10 py-4">
          <div className="max-w-[1400px] mx-auto px-4 md:px-10 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 text-xs font-extrabold text-[#004E24] hover:text-[#003318] tracking-wider uppercase group"
              style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Back to Articles</span>
            </Link>

            <nav className="text-xs text-gray-600 flex items-center space-x-2 font-medium">
              <Link href="/" className="hover:text-[#004E24]">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#004E24]">
                Blog
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-bold line-clamp-1 max-w-[200px] sm:max-w-[300px]">
                {post.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Main Article Container */}
        <article className="max-w-[1200px] mx-auto px-4 md:px-8 pt-8 md:pt-12">
          {/* Article Header */}
          <div className="bg-white rounded-t-2xl border border-gray-200/80 p-6 sm:p-10 md:p-12 shadow-xs border-t-4 border-t-[#c8102e]">
            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
              <span
                className="bg-[#e6f0e4] text-[#004E24] text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-sm"
                style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
              >
                {post.category}
              </span>
              <div className="flex items-center space-x-1.5 text-xs text-gray-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#004E24]" />
                <span>{post.date}</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center space-x-1.5 text-xs text-gray-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#004E24]" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Title */}
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#181D18] leading-tight mb-6"
              style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
            >
              {post.title}
            </h1>

            {/* Author Profile Bar */}
            <div className="flex items-center justify-between border-t border-b border-gray-100 py-4 my-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#004E24]/20 flex-shrink-0">
                  <ImageFallback
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-full h-full object-cover"
                    fallbackText={post.author.name}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{post.author.name}</h4>
                  <p className="text-xs text-gray-500 font-medium">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="hidden sm:inline text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Share:
                </span>
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-[#004E24] hover:bg-emerald-50 rounded-full transition-colors"
                  title="Share Article"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Featured Main Image */}
            <div className="relative rounded-xl overflow-hidden shadow-md my-8 h-[240px] sm:h-[320px] md:h-[380px] w-full bg-gray-900 flex items-center justify-center">
              <ImageFallback
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover object-center"
                fallbackText={post.fallback}
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6 text-white text-xs sm:text-sm">
                <p className="font-medium tracking-wide">
                  Seven Star Security — Professional guarding, ATM security, and tactical surveillance.
                </p>
              </div>
            </div>

            {/* Article Body Content */}
            <div className="prose prose-emerald max-w-none space-y-8 text-gray-700 leading-relaxed pt-4">
              {/* Intro Lead Paragraph */}
              <p className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed bg-[#f8faf6] border-l-4 border-[#004E24] p-5 rounded-r-lg">
                {post.content.intro}
              </p>

              {/* Sections */}
              {post.content.sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h2
                    className="text-xl sm:text-2xl font-bold text-gray-900 pt-2 border-b border-gray-100 pb-2"
                    style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                  >
                    {section.heading}
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                    {section.body}
                  </p>
                  {section.bulletPoints && (
                    <ul className="space-y-2 my-4 pl-2">
                      {section.bulletPoints.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start space-x-3 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#004E24] mt-1 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Highlighted Quote Box */}
              {post.content.quote && (
                <blockquote className="bg-[#004E24] text-white p-6 sm:p-8 rounded-xl shadow-lg relative overflow-hidden my-8">
                  <div className="relative z-10 space-y-3">
                    <p className="text-base sm:text-lg font-serif italic leading-relaxed">
                      &ldquo;{post.content.quote.text}&rdquo;
                    </p>
                    <footer className="text-xs uppercase tracking-widest text-emerald-200 font-bold">
                      — {post.content.quote.author}
                    </footer>
                  </div>
                  <div className="absolute -bottom-6 -right-6 opacity-10 text-white font-serif text-9xl select-none">
                    &rdquo;
                  </div>
                </blockquote>
              )}

              {/* Key Takeaways Card */}
              {post.content.keyTakeaways && (
                <div className="bg-[#e6f0e4] border border-[#004E24]/20 rounded-xl p-6 my-8">
                  <div className="flex items-center space-x-2 text-[#004E24] font-bold text-sm uppercase tracking-wider mb-4">
                    <ShieldCheck className="w-5 h-5" />
                    <span>Key Takeaways for Security Officers & Facility Managers</span>
                  </div>
                  <ul className="space-y-2.5">
                    {post.content.keyTakeaways.map((takeaway, tIdx) => (
                      <li key={tIdx} className="flex items-start space-x-3 text-xs sm:text-sm text-gray-800 font-medium">
                        <span className="w-2 h-2 rounded-full bg-[#c8102e] mt-2 flex-shrink-0" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTA Banner inside Article */}
            <div className="mt-12 bg-gradient-to-r from-[#003d1c] to-[#004E24] text-white p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-lg font-bold">Need Security Coverage for Your Bank or Commercial Site?</h3>
                <p className="text-xs text-emerald-100">
                  Seven Star Security delivers trained guards, 24/7 mobile response, and AI surveillance solutions across Nepal.
                </p>
              </div>
              <Link
                href="/contact"
                className="bg-[#c8102e] hover:bg-[#a60d25] text-white text-xs font-extrabold tracking-wider uppercase px-6 py-3.5 rounded-md shadow-md transition-all flex items-center space-x-2 flex-shrink-0"
              >
                <PhoneCall className="w-4 h-4" />
                <span>REQUEST SECURITY CONSULTATION</span>
              </Link>
            </div>
          </div>

          {/* Related Articles Section */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2
                  className="text-xl sm:text-2xl font-extrabold text-gray-900"
                  style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                >
                  More Security Articles & News
                </h2>
                <p className="text-xs text-gray-600">Explore more security insights from Seven Star specialists</p>
              </div>
              <Link
                href="/blog"
                className="text-xs font-bold text-[#004E24] hover:text-[#003318] inline-flex items-center space-x-1"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <article
                  key={rPost.id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-44 overflow-hidden bg-gray-100">
                    <Link href={`/blog/${rPost.id}`} className="block w-full h-full">
                      <ImageFallback
                        src={rPost.image}
                        alt={rPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        fallbackText={rPost.fallback}
                      />
                    </Link>
                    <div className="absolute top-3 left-3 bg-[#004E24] text-white text-[9px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-xs">
                      {rPost.category}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#004E24] transition-colors leading-snug mb-2 line-clamp-2">
                        <Link href={`/blog/${rPost.id}`}>{rPost.title}</Link>
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">{rPost.excerpt}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                      <span className="text-gray-500 text-[11px] font-medium">{rPost.date}</span>
                      <Link
                        href={`/blog/${rPost.id}`}
                        className="text-[#004E24] hover:text-[#0b4226] font-bold inline-flex items-center space-x-1 group/btn bg-emerald-50 hover:bg-[#004E24] hover:text-white p-1.5 rounded-full transition-all"
                        aria-label={`Read ${rPost.title}`}
                      >
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
            {
              "@type": "BreadcrumbList",
              "@id": `${BASE_URL}/blog/${post.id}/#breadcrumb`,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: BASE_URL,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Blog",
                  item: `${BASE_URL}/blog`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: post.title,
                  item: `${BASE_URL}/blog/${post.id}`,
                },
              ],
            },
            {
              "@type": "BlogPosting",
              "@id": `${BASE_URL}/blog/${post.id}#article`,
              mainEntityOfPage: `${BASE_URL}/blog/${post.id}`,
              headline: post.title,
              description: post.excerpt,
              image: `${BASE_URL}${post.image}`,
              datePublished: new Date(post.date).toISOString(),
              dateModified: new Date(post.date).toISOString(),
              author: {
                "@type": "Person",
                name: post.author.name,
                jobTitle: post.author.role,
              },
              publisher: {
                "@type": "Organization",
                name: "Seven Star Security Services",
                url: BASE_URL,
                logo: {
                  "@type": "ImageObject",
                  url: `${BASE_URL}/images/sevenstarlogo.webp`,
                },
              },
              category: post.category,
              inLanguage: "en",
            },
            ],
          }),
        }}
      />
    </div>
  );
}
