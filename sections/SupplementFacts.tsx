"use client";

import React from "react";
import { ClipboardList, Shield } from "lucide-react";

export default function SupplementFacts() {
  const facts = [
    { name: "Mobilee® (Patented Hyaluronic Acid Rich Extract)", amount: "80 mg" },
    { name: "French Maritime Pine Bark Extract (Pinus pinaster)", amount: "150 mg" },
    { name: "Ginger Root Extract (Zingiber officinale)", amount: "200 mg" },
    { name: "Boswellia Serrata Extract", amount: "100 mg" },
    { name: "BioPerine® (Black Pepper Extract)", amount: "5 mg" }
  ];

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden" id="supplement-facts">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Descriptions */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest self-start">
              <ClipboardList className="w-3.5 h-3.5" />
              Formula Transparency
            </span>
            
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 leading-tight tracking-tight">
              Joint Genesis™ <br />
              <span className="text-brand-primary-700">Supplement Facts</span>
            </h2>
            
            <div className="text-sm sm:text-base text-brand-navy-600 flex flex-col gap-4 leading-relaxed">
              <p>
                Every capsule of Joint Genesis™ is crafted to deliver specialized nutritional support for individuals who want to maintain an active lifestyle. The formula contains carefully selected ingredients that work together to help support joint performance, ease everyday movement, and promote overall joint function as part of a healthy routine.
              </p>
              <p>
                Unlike ordinary supplements that focus on a single ingredient, Joint Genesis™ combines multiple joint-support nutrients in one convenient formula. This comprehensive approach helps nourish the structures that contribute to comfortable movement, making it an excellent choice for those seeking long-term support for flexibility, mobility, and joint wellness.
              </p>
            </div>

            {/* Quality check list */}
            <div className="flex gap-4 border-l-2 border-brand-primary-600 pl-4 mt-2">
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
            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left mt-6">
              <img 
                src="/images/joint genesis-image/Joint Genesis Supplement Facts/cGMP_symbol.png" 
                alt="cGMP Certified Symbol" 
                className="w-40 sm:w-56 h-auto object-contain shrink-0 drop-shadow-sm"
              />
              <div>
                <h5 className="font-display font-extrabold text-sm text-brand-navy-900 uppercase tracking-wider">cGMP Certified Quality</h5>
                <p className="text-xs text-brand-navy-500 mt-1 leading-relaxed max-w-[280px]">Strict Good Manufacturing Practice regulations certified facility.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Supplement Facts Panel */}
          <div className="lg:col-span-6 flex flex-col gap-6 items-center w-full">
            
            {/* Supplement Facts Card */}
            <div className="w-full max-w-md bg-white border-4 border-black p-6 font-sans text-black shadow-lg">
              {/* Header */}
              <h3 className="font-sans font-black text-3xl tracking-tight leading-none text-center">
                Supplement Facts
              </h3>
              <p className="text-xs mt-1 text-center font-bold">
                Serving Size: 1 Capsule &nbsp;|&nbsp; Servings Per Container: 30
              </p>
              
              <div className="h-2 bg-black my-3" />

              {/* Table Column Headers */}
              <div className="flex justify-between text-xs font-black pb-1 border-b border-black">
                <span>Amount Per Serving</span>
                <span>% Daily Value</span>
              </div>

              {/* Facts List */}
              <div className="flex flex-col">
                {facts.map((fact, idx) => (
                  <div key={idx} className="flex flex-col border-b border-black py-2.5">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="font-bold">{fact.name}</span>
                      <span className="font-bold">{fact.amount}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 italic mt-0.5">* Daily Value not established.</span>
                  </div>
                ))}
              </div>

              <div className="h-4 bg-black my-3" />

              {/* Other Ingredients */}
              <div className="text-[10px] leading-relaxed">
                <span className="font-bold">Other Ingredients:</span> Vegetarian Capsule (Hypromellose), Microcrystalline Cellulose, Magnesium Stearate, Silicon Dioxide.
              </div>

              <div className="border-t border-black mt-2 pt-2 text-[9px] text-gray-600 italic leading-snug">
                Distributed by BioDynamix. Mobilee® is a registered trademark of Bioiberica S.A.U. BioPerine® is a registered trademark of Sabinsa Corporation.
              </div>
            </div>

            {/* Actual Supplement Label Image */}
            <div className="w-full max-w-md bg-brand-navy-50/50 border border-brand-navy-100 rounded-3xl p-4 flex justify-center shadow-sm">
              <img 
                src="/images/joint genesis-image/Joint Genesis Supplement Facts/label_jointgenesis.jpg" 
                alt="Joint Genesis Supplement Facts Label" 
                className="rounded-2xl max-h-[220px] w-auto object-contain shadow-sm border border-brand-navy-100/40"
              />
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
