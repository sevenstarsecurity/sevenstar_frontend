"use client";

import { MapPin } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { ImageFallback } from "../ui/ImageFallback";

export const FeaturedBranches: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const cardStyle = (delay: number): React.CSSProperties => ({
    border: "2.2px solid #543F00",
    // borderRadius: "12px",
    overflow: "hidden",
    background: "#fff",
    display: "flex",
    flexDirection: "row",
    transition: "opacity 0.7s ease, transform 0.7s ease",
    transitionDelay: `${delay}ms`,
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
  });

  return (
    <section
      className="bg-[#f0f5ea] py-10"
      ref={ref}
    >
      <div
        style={{ maxWidth: "1152px" }}
        className="mx-auto px-6 space-y-6"
      >

        {/* ── Card 1: Kathmandu Head Office ── */}
        <div style={cardStyle(0)}>

          {/* Left: Building photo */}
          <div style={{ width: "42%", flexShrink: 0, overflow: "hidden" }}>
            <ImageFallback
              src="/images/our story.jpg"
              alt="Kathmandu Head Office"
              className="w-full h-full object-cover object-center"
              fallbackText="our story.jpg"
            />
          </div>

          {/* Right: Content */}
          <div style={{ flex: 1, padding: "36px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>

            {/* Badge */}
            <span style={{
              display: "inline-block",
              alignSelf: "flex-start",
              background: "#6B4F1A",
              color: "#fff",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "3px 10px",
              borderRadius: "3px",
              marginBottom: "12px",
              fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
            }}>
              GLOBAL HQ
            </span>

            {/* Heading */}
            <h3 style={{
              fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
              fontWeight: 700,
              fontSize: "28px",
              lineHeight: "34px",
              color: "#004E24",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}>
              KATHMANDU HEAD OFFICE
            </h3>

            {/* Address */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
              <MapPin size={14} color="#C8102E" />
              <span style={{
                fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
                fontSize: "13px",
                color: "#3F4940",
              }}>
                Chandol-04, Kathmandu, Nepal (Near Kundalini Health Club)
              </span>
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #E5E7EB", marginBottom: "16px" }} />

            {/* Contact + Operations row */}
            <div style={{ display: "flex", gap: "48px" }}>
              <div>
                <p style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: "4px" }}>
                  CONTACT
                </p>
                <p style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif", fontSize: "15px", fontWeight: 700, color: "#111827" }}>
                  +977-1-4411111
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: "4px" }}>
                  OPERATIONS
                </p>
                <p style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif", fontSize: "15px", fontWeight: 700, color: "#004E24" }}>
                  24/7 Command Center
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 2: S3 Training Academy ── */}
        <div style={cardStyle(150)}>

          {/* Left: Content */}
          <div style={{ flex: 1, padding: "36px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>

            {/* Badge */}
            <span style={{
              display: "inline-block",
              alignSelf: "flex-start",
              background: "#004E24",
              color: "#fff",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "3px 10px",
              borderRadius: "3px",
              marginBottom: "12px",
              fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
            }}>
              CENTER OF EXCELLENCE
            </span>

            {/* Heading */}
            <h3 style={{
              fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
              fontWeight: 700,
              fontSize: "28px",
              lineHeight: "34px",
              color: "#004E24",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}>
              S3 TRAINING ACADEMY
            </h3>

            {/* Address */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
              <MapPin size={14} color="#C8102E" />
              <span style={{
                fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
                fontSize: "13px",
                color: "#3F4940",
              }}>
                Swoyambhu, Kathmandu (Tactical Training Complex)
              </span>
            </div>

            {/* Quote */}
            <blockquote style={{
              borderLeft: "3px solid #C8102E",
              paddingLeft: "14px",
              marginBottom: "24px",
              fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
              fontSize: "13px",
              lineHeight: "20px",
              color: "#3F4940",
              fontStyle: "normal",
            }}>
              "Forging professionals through rigorous physical and psychological conditioning since 2012."
            </blockquote>

            {/* CTA Button */}
            <div>
              <a
                href="#training"
                style={{
                  display: "inline-block",
                  background: "#004E24",
                  color: "#fff",
                  fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "11px 22px",
                  borderRadius: "4px",
                  textDecoration: "none",
                }}
              >
                TRAINING PROGRAMS
              </a>
            </div>
          </div>

          {/* Right: Training photo */}
          <div style={{ width: "42%", flexShrink: 0, overflow: "hidden" }}>
            <ImageFallback
              src="/images/s3training.jpg"
              alt="S3 Training Academy"
              className="w-full h-full object-cover object-center"
              fallbackText="mic123.png"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
