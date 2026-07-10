"use client";

import React from "react";
import { Gift, ArrowRight } from "lucide-react";
import { useAffiliateUrl } from "@/lib/settingsContext";
import { cn } from "@/lib/utils";

export default function Bonuses() {
  const { affiliateUrl, isDisabled } = useAffiliateUrl({
    utm_source: "website",
    utm_medium: "bonuses"
  });

  const bonuses = [
    {
      title: "17 Joint Supporting Smoothies",
      tagline: "Delicious breakfast recipes designed to reduce inflammation naturally.",
      image: "/images/joint genesis-image/Get 2 FREE Digital Bonuses/ebook_1 new 1 jg.webp"
    },
    {
      title: "Youthful Joints For Life",
      tagline: "The 5-minute morning routine to keep your joints lubricated all day.",
      image: "/images/joint genesis-image/Get 2 FREE Digital Bonuses/ebook_2 (1) jg.webp"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white overflow-hidden" id="bonuses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Offer Content */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest self-start">
              <Gift className="w-3.5 h-3.5" />
              Exclusive Free Gift
            </span>
            
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 leading-tight tracking-tight">
              Get <span className="text-brand-primary-700">2 FREE</span> Digital Bonuses
            </h2>
            
            <div className="text-sm sm:text-base text-brand-navy-600 leading-relaxed flex flex-col gap-3">
              <p className="font-semibold text-brand-navy-900">
                Below are the exclusive bonuses included with Joint Genesis:
              </p>
              <p>
                Order a 3-bottle or 6-bottle bundle today, and you&apos;ll instantly unlock two best-selling digital guides containing science-backed recipes and morning stretches designed to multiply the supplement&apos;s lubrication benefits.
              </p>
            </div>

            <div className="inline-flex px-4 py-2 bg-brand-primary-50 border border-brand-primary-100 rounded-2xl self-start text-xs font-bold text-brand-primary-800">
              Included FREE with Bundle Plans
            </div>

            <div className="mt-4">
              <a
                href={isDisabled ? "#" : affiliateUrl}
                target={isDisabled ? undefined : "_blank"}
                rel={isDisabled ? undefined : "noopener noreferrer sponsored"}
                onClick={(e) => {
                  if (isDisabled) {
                    e.preventDefault();
                  }
                }}
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-black text-white bg-brand-accent-600 hover:bg-brand-accent-700 shadow-lg shadow-brand-accent-600/10 hover:shadow-xl active:scale-98 transition-all duration-200",
                  isDisabled && "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                )}
              >
                {isDisabled ? "Currently Unavailable" : "Claim Your Free Bonuses Now !"}
                {!isDisabled && <ArrowRight className="w-5 h-5" />}
              </a>
            </div>

            {/* Visual Ebooks Group Photos */}
            <div className="mt-6 flex flex-wrap gap-4 max-w-lg">
              <div className="border border-brand-navy-100 rounded-3xl p-3 bg-brand-navy-50/50 flex justify-center items-center shadow-sm w-[200px] shrink-0">
                <img 
                  src="/images/joint genesis-image/Get 2 FREE Digital Bonuses/Exclusive-Bonuses-with-Joint-Genesis-copy.png" 
                  alt="Joint Genesis Exclusive Bonuses Banner" 
                  className="rounded-2xl max-h-[140px] object-contain hover:scale-102 transition-transform duration-300"
                />
              </div>
              <div className="border border-brand-navy-100 rounded-3xl p-3 bg-brand-navy-50/50 flex justify-center items-center shadow-sm w-[200px] shrink-0">
                <img 
                  src="/images/joint genesis-image/Get 2 FREE Digital Bonuses/bonus.png" 
                  alt="Joint Genesis Ebooks Pack" 
                  className="rounded-2xl max-h-[140px] object-contain hover:scale-102 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Beautiful Visual Ebook Mockups */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {bonuses.map((bonus, idx) => (
              <div 
                key={idx}
                className="bg-brand-navy-50/50 border border-brand-navy-100 rounded-3xl p-6 flex flex-col gap-6 items-center shadow-sm relative group hover:shadow-md transition-all duration-300"
              >
                {/* Book Cover Image */}
                <div className="w-40 h-56 rounded-2xl shadow-lg relative overflow-hidden group-hover:scale-102 transition-transform duration-300 border border-brand-navy-100 bg-white">
                  <img
                    src={bonus.image}
                    alt={bonus.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  {/* Floating FREE Badge */}
                  <span className="absolute top-2 right-2 bg-brand-accent-600 border border-brand-accent-500 px-2 py-0.5 rounded text-[9px] font-black tracking-widest text-white shadow-sm">
                    FREE
                  </span>
                </div>

                <div className="text-center flex flex-col gap-1.5">
                  <h4 className="font-display font-extrabold text-sm text-brand-navy-900 leading-snug">
                    {bonus.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-brand-navy-600 leading-relaxed max-w-[200px] mx-auto">
                    {bonus.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
