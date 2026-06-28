"use client";

import React from "react";
import { ArrowRight, Star } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 bg-brand-navy-50/50 border-t border-brand-navy-100" id="final-cta">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-navy-900 via-brand-navy-950 to-brand-navy-950 text-white rounded-[40px] p-8 sm:p-12 md:p-16 border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary-800/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Stars rating badge */}
            <div className="flex items-center gap-1 text-brand-accent-500 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-xs font-bold text-white ml-1">4.9/5 Rating</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight max-w-2xl">
              Order Your Discounted Joint Genesis Bottle Now!
            </h2>

            <div className="h-0.5 w-16 bg-brand-accent-500 my-2" />

            <h3 className="font-display font-black text-2xl sm:text-3xl text-brand-accent-400">
              Today&apos;s Price: $39/per bottle
            </h3>

            <p className="text-sm text-brand-navy-300 max-w-md leading-relaxed">
              Do not let joint stiffness slow you down. Rehydrate your synovial fluid, lubricate your joints, and experience complete movement freedom risk-free for 180 days!
            </p>

            <div className="mt-4">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-black text-white bg-brand-accent-600 hover:bg-brand-accent-700 shadow-lg shadow-brand-accent-600/10 hover:shadow-xl hover:shadow-brand-accent-600/20 hover:-translate-y-0.5 active:scale-98 transition-all duration-200"
              >
                Get 70% Discount Now!
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <p className="text-[10px] text-brand-navy-400 font-bold uppercase tracking-widest mt-2">
              Backed by our 180-day 100% money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
