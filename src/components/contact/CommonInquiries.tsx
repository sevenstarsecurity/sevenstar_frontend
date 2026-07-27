"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: 1,
    question: "HOW QUICKLY CAN YOU DEPLOY SECURITY PERSONNEL?",
    answer:
      "Our rapid response units can deploy emergency security personnel within 15 minutes across major urban corridors, and standard corporate guard placements are fully operational within 24 hours.",
  },
  {
    id: 2,
    question: "ARE YOUR FIELD AGENTS EX-MILITARY?",
    answer:
      "Yes, a significant percentage of our senior operatives and tactical team leads are honorably discharged ex-military and armed forces veterans, trained extensively in threat mitigation and physical defense.",
  },
  {
    id: 3,
    question: "DO YOU OFFER INTERNATIONAL EXECUTIVE PROTECTION?",
    answer:
      "Absolutely. We provide seamless cross-border VIP escort, international event security, and diplomatic protection across South Asia and global partner networks.",
  },
];

export const CommonInquiries: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-[#f0f5ea] py-16 md:py-24">
      <div className="max-w-[840px] mx-auto px-6 md:px-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h2
            className="text-2xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-tight mb-3"
            style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
          >
            COMMON INQUIRIES
          </h2>
          <div className="w-16 h-[3px] bg-[#004E24] mx-auto" />
        </div>

        {/* Accordion Rectangular Cards */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-none border border-gray-200/80 shadow-2xs overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-xs sm:text-sm font-extrabold text-gray-900 group-hover:text-[#004E24] transition-colors uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-public-sans), 'Public Sans', sans-serif" }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#004E24]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 md:px-6 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 animate-fadeIn">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
