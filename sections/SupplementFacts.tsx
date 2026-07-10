"use client";

import React from "react";
import { ClipboardList, Shield } from "lucide-react";

export default function SupplementFacts() {
  return (
    <section className="py-12 sm:py-16 bg-white overflow-hidden" id="supplement-facts">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-10">
        
        {/* Header Block (Centered) */}
        <div className="text-center flex flex-col items-center gap-4 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest">
            <ClipboardList className="w-3.5 h-3.5" />
            Formula Transparency
          </span>
          
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 leading-tight tracking-tight">
            Joint Genesis™ <span className="text-brand-primary-700">Supplement Facts</span>
          </h2>
          
          <div className="text-sm sm:text-base text-brand-navy-600 flex flex-col gap-3 leading-relaxed">
            <p>
              Every capsule of Joint Genesis™ is crafted to deliver specialized nutritional support for individuals who want to maintain an active lifestyle. The formula contains carefully selected ingredients that work together to help support joint performance, ease everyday movement, and promote overall joint function as part of a healthy routine.
            </p>
            <p>
              Unlike ordinary supplements that focus on a single ingredient, Joint Genesis™ combines multiple joint-support nutrients in one convenient formula. This comprehensive approach helps nourish the structures that contribute to comfortable movement.
            </p>
          </div>
        </div>

        {/* Center: Actual Supplement Label Image (Framed beautifully) */}
        <div className="w-full max-w-md bg-brand-navy-50/50 border border-brand-navy-100 rounded-[32px] p-6 sm:p-8 flex justify-center shadow-md">
          <img 
            src="/images/joint genesis-image/Joint Genesis Supplement Facts/label_jointgenesis.jpg" 
            alt="Joint Genesis Supplement Facts Label" 
            className="rounded-2xl max-h-[300px] sm:max-h-[360px] w-auto object-contain shadow-lg border border-brand-navy-100/40 hover:scale-102 transition-transform duration-300"
          />
        </div>

        {/* Bottom Details (Side by Side on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl border-t border-brand-navy-100 pt-8">
          
          {/* Quality check list */}
          <div className="flex gap-4 items-start bg-brand-navy-50/30 border border-brand-navy-100/50 rounded-2xl p-5 shadow-sm">
            <Shield className="w-6 h-6 text-brand-primary-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display font-bold text-sm text-brand-navy-900">
                Clean & Premium Formulation
              </h4>
              <p className="text-xs text-brand-navy-500 mt-1 leading-relaxed">
                Manufactured in a state-of-the-art facility in the USA following strict GMP (Good Manufacturing Practices) guidelines. Tested by third-party laboratories to ensure 100% purity, potency, and safety.
              </p>
            </div>
          </div>

          {/* Quality badges */}
          <div className="flex gap-4 items-start bg-brand-navy-50/30 border border-brand-navy-100/50 rounded-2xl p-5 shadow-sm">
            <img 
              src="/images/joint genesis-image/Joint Genesis Supplement Facts/cGMP_symbol.png" 
              alt="cGMP Certified Symbol" 
              className="w-16 h-auto object-contain shrink-0 drop-shadow-sm mt-1"
            />
            <div>
              <h5 className="font-display font-bold text-sm text-brand-navy-900">cGMP Certified Quality</h5>
              <p className="text-xs text-brand-navy-500 mt-1 leading-relaxed">
                Strict Good Manufacturing Practice regulations certified facility ensuring safety, consistency, and premium product quality.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
