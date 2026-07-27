"use client";

import React, { useState } from "react";

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section className="bg-[#0b4226] text-white py-10 px-4 md:px-10 lg:px-12 border-b border-emerald-950">

      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left Side Info */}
        <div className="space-y-1 text-center md:text-left">

          <h3 className="text-[24px] font-bold tracking-wider uppercase">
            STAY INFORMED
          </h3>


          <p
            className="
              font-['Public_Sans']
              font-normal
              text-[16px]
              leading-[24px]
              tracking-[0px]
              w-[439.81px]
              h-[24px]
              text-[#FFFFFF]
              flex
              items-center
            "
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

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto"
            >

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS"
                required
                className="bg-white text-gray-900 placeholder-gray-400 text-xs font-semibold px-4 py-3 rounded-xs w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />


              <button
                type="submit"
                className="bg-[#c8102e] hover:bg-[#a60d25] text-white font-extrabold text-xs uppercase px-6 py-3 rounded-xs transition-colors tracking-wider w-full sm:w-auto flex-shrink-0"
              >
                SUBSCRIBE
              </button>


            </form>

          )}

        </div>

      </div>

    </section>
  );
};