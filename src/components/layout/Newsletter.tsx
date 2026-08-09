"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { subscribeToNewsletter } from "@/services/newsletter"; // adjust path to match your project

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setError("");

    try {
      await subscribeToNewsletter(email.trim());
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to subscribe. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#0b4226] text-white py-10 px-4 md:px-10 lg:px-12 border-b border-emerald-950">

      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left Side Info */}
        <div className="space-y-1 text-center md:text-left">

          <h3 className="text-base md:text-2xl font-bold tracking-wider uppercase">
            STAY INFORMED
          </h3>


          <p
            className="text-sm md:text-base font-['Public_Sans'] font-normal leading-6 tracking-normal w-full max-w-110 text-[#FFFFFF] flex items-center"
          >
            Subscribe to our security advisories and corporate updates.
          </p>

        </div>


        {/* Right Side Subscription Form */}
        <div className="w-full md:w-auto">

          {subscribed ? (

            <div className="bg-emerald-800/80 text-emerald-100 text-xs px-6 py-3 rounded-xs font-semibold text-center border border-emerald-600">
              ✓ Thank you for subscribing!
            </div>

          ) : (

            <div className="w-full md:w-auto space-y-2">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto"
                // Browser extensions (password managers, Grammarly, etc.)
                // inject attributes like style="position:relative" onto
                // <form> elements before React hydrates, causing a
                // harmless hydration-mismatch warning. This tells React
                // to ignore attribute diffs on this element instead of
                // warning about them.
                suppressHydrationWarning
              >

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="EMAIL ADDRESS"
                  required
                  disabled={isSubmitting}
                  className="bg-white text-gray-900 placeholder-gray-400 text-xs font-semibold px-4 py-3 rounded-xs w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-70"
                />


                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#c8102e] hover:bg-[#a60d25] disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold text-xs uppercase px-6 py-3 rounded-xs transition-colors tracking-wider w-full sm:w-auto shrink-0 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>SUBSCRIBING...</span>
                    </>
                  ) : (
                    "SUBSCRIBE"
                  )}
                </button>
              </form>
              {error && (
                <p className="text-[11px] text-red-200 font-semibold text-center md:text-left">
                  {error}
                </p>
              )}
            </div>

          )}

        </div>

      </div>

    </section>
  );
};