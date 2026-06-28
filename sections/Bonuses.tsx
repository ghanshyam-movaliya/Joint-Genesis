"use client";

import React from "react";
import { Gift, ArrowRight } from "lucide-react";

export default function Bonuses() {
  const bonuses = [
    {
      title: "17 Joint Supporting Smoothies",
      tagline: "Delicious breakfast recipes designed to reduce inflammation naturally.",
      bg: "from-emerald-600 to-teal-800",
      icon: "🥤"
    },
    {
      title: "Youthful Joints For Life",
      tagline: "The 5-minute morning routine to keep your joints lubricated all day.",
      bg: "from-brand-primary-700 to-brand-primary-900",
      icon: "🧘"
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden" id="bonuses">
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
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-black text-white bg-brand-accent-600 hover:bg-brand-accent-700 shadow-lg shadow-brand-accent-600/10 hover:shadow-xl active:scale-98 transition-all duration-200"
              >
                Claim Your Free Bonuses Now !
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Beautiful Visual Ebook Mockups */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {bonuses.map((bonus, idx) => (
              <div 
                key={idx}
                className="bg-brand-navy-50/50 border border-brand-navy-100 rounded-3xl p-6 flex flex-col gap-6 items-center shadow-sm relative group hover:shadow-md transition-all duration-300"
              >
                {/* 3D-like Book Cover mockup using pure CSS gradients */}
                <div className={`w-40 h-56 rounded-r-2xl bg-gradient-to-br ${bonus.bg} shadow-lg relative overflow-hidden flex flex-col justify-between p-4 text-white border-l-4 border-black/20 group-hover:scale-102 transition-transform duration-300`}>
                  {/* Purity shine shine */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent" />
                  
                  <div className="flex justify-between items-center relative z-10">
                    <span className="text-[9px] font-black tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded">
                      Ebook
                    </span>
                    <span className="text-xl">{bonus.icon}</span>
                  </div>

                  <div className="relative z-10 my-auto text-center">
                    <h3 className="font-display font-black text-sm sm:text-base leading-tight tracking-tight drop-shadow-md">
                      {bonus.title}
                    </h3>
                  </div>

                  <div className="relative z-10 border-t border-white/20 pt-2 flex justify-between items-center text-[9px] font-black tracking-wider uppercase">
                    <span>Joint Genesis™</span>
                    <span className="bg-brand-accent-600 px-1.5 py-0.5 rounded text-white font-bold">
                      FREE
                    </span>
                  </div>
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
