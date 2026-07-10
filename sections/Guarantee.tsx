import React from "react";
import { CONFIG } from "@/lib/config";

export default function Guarantee() {
  return (
    <section className="py-12 sm:py-16 bg-brand-navy-950 text-white border-t border-brand-navy-900 relative overflow-hidden" id="guarantee-section">
      {/* Background ambient radial light */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-brand-accent-950/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Shield Graphic */}
          <div className="lg:col-span-4 flex justify-center">
            {/* Guarantee Badge Image */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
              <div className="absolute inset-0 bg-brand-accent-600/10 blur-xl rounded-full animate-pulse" />
              <img
                src="/images/joint genesis-image/Your Mobility Guaranteed For 180 FULL DAYS/guarantee-badge-180-days.webp"
                alt="180 Day Money Back Guarantee"
                className="w-full h-full object-contain relative z-10 drop-shadow-xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-8 flex flex-col gap-5 text-center lg:text-left">
            <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black text-brand-accent-400 bg-brand-accent-950/80 border border-brand-accent-800 uppercase tracking-widest self-center lg:self-start">
              180-DAY MONEY-BACK GUARANTEE
            </span>
            <h2 className="font-display font-extrabold text-2.5xl sm:text-3.5xl text-white tracking-tight leading-tight">
              Your Mobility Guaranteed <br />
              <span className="text-brand-accent-500">For 180 FULL DAYS</span>
            </h2>
            <p className="text-xs sm:text-sm text-brand-navy-200 leading-relaxed font-semibold">
              Joint Genesis comes with a 100% money-back guarantee – 180 full days from your original purchase. If you&apos;re not totally and completely satisfied with our product or your results within the first 180 days, simply let us know, and we&apos;ll gladly give you a full refund within 48 hours of the product being returned.
            </p>

            <div className="h-px bg-brand-navy-800 my-2" />

            <div className="text-center lg:text-left">
              <p className="font-display font-black text-lg text-brand-accent-400">
                Zero Risk. Total Freedom.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
