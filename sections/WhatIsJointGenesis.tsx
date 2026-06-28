"use client";

import { ShieldCheck, Heart, Sparkles, CheckCircle2 } from "lucide-react";

export default function WhatIsJointGenesis() {
  const badges = ["Non-GMO", "Gluten Free", "Dairy Free", "Soy Free", "Nut Free"];

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copywriting & Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest self-start">
              <ShieldCheck className="w-3.5 h-3.5" />
              Doctor-Formulated Joint Relief
            </span>
            
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 leading-tight tracking-tight">
              What Is <span className="text-brand-primary-700">Joint Genesis™?</span>
            </h2>
            
            <div className="text-sm sm:text-base text-brand-navy-600 flex flex-col gap-4 leading-relaxed">
              <p>
                Joint Genesis™ is an advanced joint wellness supplement formulated to help support mobility, flexibility, and everyday movement. Unlike traditional joint formulas that focus only on cartilage support, Joint Genesis™ is designed to support one of the most important components of joint function—healthy joint lubrication.
              </p>
              <p>
                Healthy joints rely on a combination of cushioning, flexibility, and lubrication to move comfortably. As the body ages, natural changes may affect these processes, making everyday activities feel more challenging. Joint Genesis™ was developed to provide targeted nutritional support for individuals seeking to maintain active lifestyles and healthy joint function.
              </p>
            </div>

            {/* Special Highlighted Box Area 1 */}
            <div className="bg-brand-primary-50/50 border border-brand-primary-100 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary-100/30 blur-xl rounded-full" />
              <h3 className="font-display font-extrabold text-base text-brand-primary-900 mb-2 flex items-center gap-2">
                <Heart className="w-5 h-5 text-brand-primary-700" />
                Advanced Support For Everyday Mobility
              </h3>
              <p className="text-xs sm:text-sm text-brand-navy-700 leading-relaxed">
                Whether you&apos;re walking, exercising, traveling, or enjoying time with family, comfortable movement plays a vital role in quality of life. Joint Genesis™ contains carefully selected ingredients that work together to support healthy joints from multiple angles, helping you stay active and move with confidence.
              </p>
            </div>
          </div>

          {/* Right Column: Visual Container & Extra Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Visual Graphic Representation */}
            <div className="relative bg-gradient-to-tr from-brand-navy-50 to-brand-primary-50 border border-brand-navy-100 rounded-[40px] p-8 shadow-sm flex flex-col justify-center items-center overflow-hidden min-h-[300px]">
              {/* Abstract structural joint lines */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Dynamic Graphic */}
              <div className="relative flex flex-col items-center gap-4 text-center">
                <div className="w-24 h-24 rounded-full bg-white border border-brand-primary-200 flex items-center justify-center shadow-md animate-pulse">
                  <Sparkles className="w-10 h-10 text-brand-primary-600" />
                </div>
                <div>
                  <h4 className="font-display font-black text-brand-navy-900 tracking-tight text-lg">
                    Synovial Gel Buffer
                  </h4>
                  <p className="text-[11px] text-brand-navy-500 font-bold uppercase tracking-wider mt-1">
                    Cushions Joint Membranes
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="h-1.5 w-6 bg-brand-primary-600 rounded-full" />
                  <span className="h-1.5 w-1.5 bg-brand-primary-400 rounded-full animate-bounce" />
                  <span className="h-1.5 w-1.5 bg-brand-primary-200 rounded-full" />
                </div>
              </div>
            </div>

            {/* Special Highlighted Box Area 2 */}
            <div className="bg-brand-navy-50/70 border border-brand-navy-100 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <p className="text-xs sm:text-sm text-brand-navy-700 leading-relaxed font-medium">
                With its plant-based, non-GMO, and carefully tested ingredients, Joint Genesis offers more than just temporary relief. It provides complete joint nourishment, protecting against age-related decline and empowering you to enjoy an active, pain-free lifestyle at any stage of life.
              </p>
            </div>

            {/* 5 Badges / Buttons row */}
            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
              {badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold text-brand-navy-700 bg-brand-navy-50 border border-brand-navy-100 hover:bg-white hover:border-brand-primary-600 hover:text-brand-primary-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary-600" />
                  {badge}
                </span>
              ))}
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
