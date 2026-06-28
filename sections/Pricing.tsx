"use client";

import React from "react";
import { Check, Shield, AlertCircle } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function Pricing() {
  // Sort packages so they display in a neat order: 1 Bottle, 6 Bottles (highlighted), 3 Bottles
  // Or display 1 Bottle (left), 3 Bottles (center), 6 Bottles (right).
  // Let's layout: 1 Bottle (left), 6 Bottles (center - Best Value), 3 Bottles (right - Popular).
  // The packages are pre-arranged in lib/config.ts in order: 1-bottle, 6-bottles, 3-bottles. Let's use that exact order!
  const packages = CONFIG.packages;

  return (
    <section className="py-20 sm:py-28 bg-white scroll-mt-12" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest mb-4">
            Order & Pricing
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 leading-tight tracking-tight">
            Limited Time Special Offer - Act Now !
          </h2>
          <p className="text-sm sm:text-base text-brand-primary-700 font-extrabold mt-2 uppercase tracking-wide">
            Choose Your Discount Joint Genesis™ Package
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {packages.map((pkg) => {
            const isBestValue = pkg.bestValue;
            const isPopular = pkg.popular;
            const hasSavings = pkg.savings > 0;

            return (
              <div
                key={pkg.id}
                className={cn(
                  "relative bg-white border rounded-[32px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-sm",
                  isBestValue
                    ? "border-brand-accent-500 ring-2 ring-brand-accent-500/20 shadow-xl md:-translate-y-2 scale-102"
                    : isPopular
                    ? "border-brand-primary-600 shadow-md"
                    : "border-brand-navy-100 hover:shadow-md"
                )}
              >
                {/* Visual highlights */}
                {isBestValue && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex px-4 py-1.5 rounded-full text-xs font-black text-white bg-brand-accent-600 uppercase tracking-widest shadow-md">
                      Best Value - Save 70%
                    </span>
                  </div>
                )}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex px-4 py-1.5 rounded-full text-xs font-black text-white bg-brand-primary-700 uppercase tracking-widest shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Package Head */}
                <div className="text-center pb-6 border-b border-brand-navy-100/50">
                  <h3 className="font-display font-extrabold text-xl text-brand-navy-900">
                    {pkg.name}
                  </h3>
                  <span className="inline-flex px-2.5 py-0.5 rounded bg-brand-navy-100 text-brand-navy-700 text-[10px] font-bold uppercase tracking-wider mt-1.5">
                    {pkg.supply}
                  </span>
                  
                  {/* Price display */}
                  <div className="mt-5 flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-extrabold text-brand-navy-500">$</span>
                    <span className="text-5xl font-black text-brand-navy-900 tracking-tight">
                      {pkg.pricePerBottle}
                    </span>
                    <span className="text-xs font-bold text-brand-navy-500">/ bottle</span>
                  </div>

                  {/* Original price / Savings comparison */}
                  {hasSavings && (
                    <p className="text-xs text-brand-navy-500 mt-2 font-medium">
                      Retail: <span className="line-through">${pkg.originalPrice}</span>
                      <span className="text-brand-primary-700 font-bold ml-1.5">
                        Save ${pkg.savings}!
                      </span>
                    </p>
                  )}
                </div>

                {/* Pricing Details */}
                <div className="py-6 flex-1 flex flex-col justify-between">
                  <div className="flex flex-col gap-4">
                    <p className="text-xs sm:text-sm text-brand-navy-600 leading-relaxed text-center">
                      {pkg.description}
                    </p>

                    {/* Features checklist */}
                    <ul className="flex flex-col gap-2.5 text-xs font-semibold text-brand-navy-700 mt-2">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-brand-primary-700 shrink-0" />
                        <span>Clinical doses of all 5 ingredients</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-brand-primary-700 shrink-0" />
                        <span>Doctor formulated & approved</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-brand-primary-700 shrink-0" />
                        <span className="capitalize">{pkg.shipping}</span>
                      </li>
                    </ul>

                    {/* Bonuses callout if present */}
                    {pkg.bonuses.length > 0 && (
                      <div className="bg-brand-primary-50/50 border border-brand-primary-100 rounded-2xl p-4 mt-2">
                        <span className="text-[9px] font-black text-brand-primary-800 uppercase tracking-widest block mb-1.5">
                          🎁 Includes 2 Free Bonuses:
                        </span>
                        <ul className="flex flex-col gap-1.5 text-[11px] font-bold text-brand-navy-600">
                          {pkg.bonuses.map((bonus, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-brand-primary-700 shrink-0" />
                              <span>{bonus.replace("Free Bonus Ebook 1: ", "").replace("Free Bonus Ebook 2: ", "")}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Total price display */}
                  <div className="mt-6 text-center">
                    <span className="text-[10px] text-brand-navy-400 font-bold uppercase tracking-wider block">
                      Total Order Price
                    </span>
                    <span className="text-2xl font-black text-brand-navy-900">
                      ${pkg.totalPrice}
                    </span>
                    {pkg.shippingFee > 0 && (
                      <span className="text-[10px] text-brand-navy-500 block font-medium">
                        + ${pkg.shippingFee} shipping & handling
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <a
                    href={CONFIG.AFFILIATE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center justify-center w-full py-4 rounded-2xl text-sm font-black transition-all shadow-md active:scale-98",
                      isBestValue
                        ? "text-white bg-brand-accent-600 hover:bg-brand-accent-700 shadow-brand-accent-600/10 hover:shadow-lg hover:shadow-brand-accent-600/20"
                        : isPopular
                        ? "text-white bg-brand-primary-700 hover:bg-brand-primary-800"
                        : "text-brand-navy-900 bg-brand-navy-100 hover:bg-brand-navy-200"
                    )}
                    id={`pricing-cta-${pkg.id}`}
                  >
                    Add to Cart & Order
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Checkout badges and shipping notices */}
        <div className="border border-brand-navy-100 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 bg-brand-navy-50/30">
          <div className="flex flex-col gap-1 max-w-xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-bold text-brand-navy-700">
              <Shield className="w-4 h-4 text-brand-primary-700" />
              100% Secure Checkout Guaranteed
            </div>
            <p className="text-[11px] text-brand-navy-500 leading-relaxed mt-1">
              Your security is our priority. We protect your billing transaction with standard 256-bit SSL encryption protocols, securing your private information fully.
            </p>
          </div>
          {/* Card list mockups */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {["Visa", "MasterCard", "Discover", "Amex", "PayPal"].map((cardName, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-white border border-brand-navy-100 text-[10px] font-black text-brand-navy-500 uppercase tracking-widest shadow-sm"
              >
                {cardName}
              </span>
            ))}
          </div>
        </div>

        {/* Free shipping & supply notice */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-brand-navy-600">
          <AlertCircle className="w-4 h-4 text-brand-primary-700 shrink-0" />
          <span>Due to viral demand, stock is extremely limited. We recommend the 6-bottle package.</span>
        </div>
      </div>
    </section>
  );
}
