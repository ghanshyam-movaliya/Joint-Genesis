"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": CONFIG.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section className="py-20 sm:py-28 bg-brand-navy-50/50 border-t border-brand-navy-100" id="faqs">
      {/* FAQ Schema Injection for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest mb-4">
            Help & Information
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 leading-tight tracking-tight">
            FAQs
          </h2>
          <p className="text-sm sm:text-base text-brand-navy-600 leading-relaxed mt-4">
            Have questions about Joint Genesis™? Find quick, direct answers below. If you need further help, reach out to our customer support.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {CONFIG.faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={cn(
                  "bg-white border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm",
                  isOpen ? "border-brand-primary-500 shadow-md" : "border-brand-navy-100"
                )}
              >
                {/* Accordion Header Button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex items-center justify-between text-left w-full px-6 py-5 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-extrabold text-sm sm:text-base text-brand-navy-900 pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center bg-brand-navy-100 text-brand-navy-700 transition-colors shrink-0",
                      isOpen && "bg-brand-primary-600 text-white"
                    )}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Accordion Panel Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm leading-relaxed text-brand-navy-600 border-t border-brand-navy-50/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
