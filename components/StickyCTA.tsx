"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAffiliateUrl } from "@/lib/settingsContext";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { affiliateUrl, isDisabled } = useAffiliateUrl({
    utm_source: "website",
    utm_medium: "sticky_cta"
  });

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 600;
      const pricingSection = document.getElementById("pricing-section");
      
      let isOverPricing = false;
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        // If pricing section is currently visible in viewport or scrolled past, hide sticky cta
        isOverPricing = rect.top < window.innerHeight && rect.bottom > 0;
      }

      if (window.scrollY > heroHeight && !isOverPricing) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-navy-100 shadow-2xl transition-all duration-300 py-3.5 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left Side: Supplement Thumbnail and Info */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg bg-brand-primary-50 text-brand-primary-700">
            <span className="font-display font-extrabold text-sm">JG</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-sm font-extrabold text-brand-navy-900 leading-none">
                Joint Genesis™
              </span>
              <div className="flex items-center gap-0.5 text-brand-accent-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-bold text-brand-navy-700">4.9</span>
              </div>
            </div>
            <p className="text-xs text-brand-navy-500 font-semibold mt-0.5">
              Save up to $180 + Free Shipping
            </p>
          </div>
        </div>

        {/* Right Side: CTA Button */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <span className="text-[10px] text-brand-navy-400 font-bold uppercase tracking-wider block">
              Special Affiliate Offer
            </span>
            <span className="text-sm font-extrabold text-brand-primary-800">
              Only $49 / Bottle
            </span>
          </div>
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
              "inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-brand-accent-600 hover:bg-brand-accent-700 active:bg-brand-accent-800 shadow-md shadow-brand-accent-600/10 active:scale-98 transition-all duration-200",
              isDisabled && "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
            )}
            id="sticky-cta-btn"
          >
            Order Now
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
