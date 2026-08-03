"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { submitContactForm } from "@/services/contact";

export const InitiateInquiry: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sector: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        sector: formData.sector,
        details: formData.message.trim(),
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", phone: "", sector: "", message: "" });
      }, 4000);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } }; message?: string })?.response
          ?.data?.message ||
        (err as { message?: string })?.message ||
        "Failed to send your inquiry. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#f0f5ea] pt-44 md:pt-52 pb-16 border-b border-[#e2ebd9]">
      <div className="max-w-[1152px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Underline Style Form (Spans 7 cols on lg) */}
          <div className="lg:col-span-7">
            {/* Heading with Vertical Green Accent Bar */}
            <div className="flex items-center space-x-3 mb-10">
              <div className="w-[4px] h-7 bg-[#004E24]" />
              <h2
                className="text-2xl md:text-3xl font-extrabold text-gray-900 uppercase tracking-tight"
                style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
              >
                INITIATE INQUIRY
              </h2>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-none p-6 text-center text-[#004E24]">
                <h3 className="text-lg font-bold mb-2">INTELLIGENCE TRANSMITTED</h3>
                <p className="text-xs text-gray-600">
                  Thank you. Our tactical response desk will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-4 py-3">
                    {error}
                  </div>
                )}

                {/* 2 Underline Inputs Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Full Operational Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-gray-400 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#004E24] transition-colors"
                      style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Secure Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-gray-400 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#004E24] transition-colors"
                      style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Phone + Sector Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="Contact Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-gray-400 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#004E24] transition-colors"
                      style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Primary Sector (e.g. Banking, Healthcare)"
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full bg-transparent border-b border-gray-400 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#004E24] transition-colors"
                      style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Textarea with Underline */}
                <div className="relative">
                  <textarea
                    rows={4}
                    required
                    placeholder="Mission Specifics / Inquiry Details"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-gray-400 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#004E24] transition-colors resize-none"
                    style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                  />
                </div>

                {/* Sharp Rectangle Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#004E24] hover:bg-[#003d1c] disabled:opacity-60 text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-none shadow-sm hover:shadow-md transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer"
                    style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                  >
                    {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    {submitting ? "TRANSMITTING..." : "SUBMIT INTELLIGENCE"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Google Map & ISO Certificates (Spans 5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Interactive Google Map Embed */}
            <div className="bg-white rounded-none border border-gray-300 shadow-sm h-[260px] md:h-[280px] overflow-hidden relative">
              <iframe
                title="Seven Star Security Headquarters Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0627072978184!2d85.3345464!3d27.7153403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1965b38a74e5%3A0xb355152919864278!2sChandol%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* ISO Certificates — commented out
            <div className="space-y-5 pt-3">
              ISO 9001 Card
              <div className="flex items-center gap-5">
                <div className="w-[84px] h-[84px] rounded-[22px] border-[1.5px] border-[#6b6228] bg-[#fbfdf8] p-2 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=160&q=80"
                    alt="ISO 9001 Certificate"
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                </div>
                <div>
                  <h4 className="text-[17px] font-bold text-[#6a5e20] uppercase tracking-wide leading-snug">
                    ISO 9001 CERTIFIED
                  </h4>
                  <p className="text-sm md:text-[15px] text-[#5c6459] font-medium mt-0.5">
                    Quality Management Systems
                  </p>
                </div>
              </div>

              ISO 14001 Card
              <div className="flex items-center gap-5">
                <div className="w-[84px] h-[84px] rounded-[22px] border-[1.5px] border-[#6b6228] bg-[#fbfdf8] p-2 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=160&q=80"
                    alt="ISO 14001 Certificate"
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                </div>
                <div>
                  <h4 className="text-[17px] font-bold text-[#6a5e20] uppercase tracking-wide leading-snug">
                    ISO 14001 CERTIFIED
                  </h4>
                  <p className="text-sm md:text-[15px] text-[#5c6459] font-medium mt-0.5">
                    Environmental Management
                  </p>
                </div>
              </div>
            </div>
            */}
          </div>
        </div>
      </div>
    </section>
  );
};