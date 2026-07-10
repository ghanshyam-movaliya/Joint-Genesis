"use client";

import React from "react";
import { Pill, Droplets, Dumbbell, Apple, ArrowRight } from "lucide-react";
import { useAffiliateUrl } from "@/lib/settingsContext";
import { cn } from "@/lib/utils";

export default function HowToConsume() {
  const { affiliateUrl, isDisabled } = useAffiliateUrl({
    utm_source: "website",
    utm_medium: "how_to_consume"
  });

  const steps = [
    {
      title: "1. Take Joint Genesis™ Correctly Every Day",
      description: "Take one capsule of Joint Genesis™ daily with a full glass of water. For the best absorption of key ingredients such as hyaluronic acid, glucosamine, and botanical extracts, it is recommended to take your capsule with a meal, preferably breakfast. This helps your body absorb and utilize the nutrients more effectively throughout the day.",
      icon: <Pill className="w-6 h-6 text-brand-primary-700" />
    },
    {
      title: "2. Stay Consistent and Keep Your Body Hydrated",
      description: "Consistency is essential for achieving the best results. Make Joint Genesis™ part of your daily routine by taking it at the same time each day. Staying hydrated is equally important, as drinking 8–10 glasses of water daily helps support healthy synovial fluid production and allows the formula to better maintain joint lubrication and comfort over time.",
      icon: <Droplets className="w-6 h-6 text-brand-primary-700" />
    },
    {
      title: "3. Support Your Joints with an Active Lifestyle",
      description: "For optimal results, use Joint Genesis™ consistently for at least 45–90 days while maintaining regular physical activity. Low-impact exercises such as walking, swimming, and gentle stretching can complement the formula's benefits by helping improve mobility, flexibility, and overall joint function.",
      icon: <Dumbbell className="w-6 h-6 text-brand-primary-700" />
    },
    {
      title: "4. Follow a Joint-Friendly Diet",
      description: "A balanced diet rich in omega-3 fatty acids, antioxidants, and vitamin C can further support healthy joints. Foods such as salmon, flaxseed, berries, leafy greens, and citrus fruits provide nutrients that work alongside Joint Genesis™ to promote flexibility, reduce stiffness, and support long-term joint health.",
      icon: <Apple className="w-6 h-6 text-brand-primary-700" />
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-brand-navy-50/50 border-y border-brand-navy-100" id="how-to-consume">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest mb-4">
            Usage Instructions
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 leading-tight tracking-tight">
            HOW TO CONSUME JOINT GENESIS <br />
            <span className="text-brand-primary-700">for Best Results</span>
          </h2>
          <p className="text-sm sm:text-base text-brand-navy-600 leading-relaxed mt-4">
            Follow these daily usage tips to maximize the absorption of the active ingredients and support long-term joint comfort and hydration.
          </p>
        </div>

        {/* 2x2 Grid of Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-white border border-brand-navy-100 rounded-3xl p-8 flex gap-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-primary-50 flex items-center justify-center shrink-0 shadow-sm">
                {step.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-display font-extrabold text-base sm:text-lg text-brand-navy-900 leading-tight">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-navy-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="flex justify-center mt-12">
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
              "inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-black text-white bg-brand-accent-600 hover:bg-brand-accent-700 shadow-lg shadow-brand-accent-600/10 active:scale-98 transition-all duration-200",
              isDisabled && "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
            )}
          >
            {isDisabled ? "CURRENTLY UNAVAILABLE" : "TRY NOW!"}
            {!isDisabled && <ArrowRight className="w-5 h-5" />}
          </a>
        </div>

      </div>
    </section>
  );
}
