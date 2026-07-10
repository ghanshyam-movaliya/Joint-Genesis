"use client";

import React from "react";
import { BookOpen, ShieldAlert, Award, FileSpreadsheet, Leaf, ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    {
      title: "Scientific Backing",
      description: "Joint Genesis™ is built on modern nutritional science and research-backed ingredients selected to support joint health, mobility, and flexibility. Every ingredient is chosen for its role in promoting long-term joint wellness and everyday comfort.",
      icon: <BookOpen className="w-5 h-5 text-brand-primary-700" />
    },
    {
      title: "100% Drug-Free",
      description: "This advanced joint support supplement contains no prescription drugs or harsh stimulants. Instead, it relies on carefully selected natural ingredients to support healthy movement and an active lifestyle.",
      icon: <ShieldAlert className="w-5 h-5 text-brand-primary-700" />
    },
    {
      title: "Doctor Formulated",
      description: "Joint Genesis™ is developed using scientific principles and expert formulation standards. The formula is designed to support healthy joint function, lubrication, and mobility as part of a daily wellness routine.",
      icon: <Award className="w-5 h-5 text-brand-primary-700" />
    },
    {
      title: "Clinically Validated",
      description: "Key ingredients in Joint Genesis™ have been studied for their potential benefits in supporting joint mobility, flexibility, and overall joint wellness. This science-based approach helps ensure a high-quality formula you can trust.",
      icon: <FileSpreadsheet className="w-5 h-5 text-brand-primary-700" />
    },
    {
      title: "100% Natural & Safe",
      description: "Made with premium ingredients and manufactured to strict quality standards, Joint Genesis™ is designed for daily use. The formula is non-GMO and crafted to support healthy joints naturally.",
      icon: <Leaf className="w-5 h-5 text-brand-primary-700" />
    },
    {
      title: "180-Day Guarantee",
      description: "Your satisfaction matters. That's why Joint Genesis™ is backed by a 180-day money-back guarantee, giving you the confidence to try the formula and experience its benefits with peace of mind.",
      icon: <ShieldCheck className="w-5 h-5 text-brand-primary-700" />
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest mb-4">
            Quality Assurance
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 leading-tight tracking-tight">
            Why Choose <span className="text-brand-primary-700">Joint Genesis™?</span>
          </h2>
          <p className="text-sm sm:text-base text-brand-navy-600 leading-relaxed mt-4">
            Joint Genesis™ brings together advanced nutritional science and carefully selected ingredients to support healthy joints from within. Designed to promote joint mobility, flexibility, and everyday comfort, it helps you stay active and move with greater confidence.
          </p>
        </div>

        {/* 6 Grid Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((point, idx) => (
            <div 
              key={idx}
              className="bg-brand-navy-50/40 border border-brand-navy-100 rounded-3xl p-6 sm:p-8 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-brand-navy-100 flex items-center justify-center shadow-sm shrink-0">
                {point.icon}
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base sm:text-lg text-brand-navy-900 leading-tight mb-2">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-navy-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
