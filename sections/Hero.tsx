"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Star, ShieldCheck, CheckCircle2, Leaf } from "lucide-react";
import { useAffiliateUrl } from "@/lib/settingsContext";
import { cn } from "@/lib/utils";

export default function Hero() {
  const { affiliateUrl, isDisabled } = useAffiliateUrl({
    utm_source: "website",
    utm_medium: "hero_cta"
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-brand-primary-50/70 via-white to-brand-navy-50/30">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand-primary-200/30 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-brand-accent-200/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Sales Pitch */}
          <motion.div 
            className="lg:col-span-7 flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Rating badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white border border-brand-navy-100 rounded-full px-3 py-1.5 self-start shadow-sm"
            >
              <div className="flex items-center gap-0.5 text-brand-accent-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-brand-navy-800">
                4.9/5 Rating (1,847+ Customer Reviews)
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              className="font-display font-extrabold text-3.5xl sm:text-4.5xl lg:text-5xl text-brand-navy-900 leading-[1.15] tracking-tight"
            >
              Joint Genesis™ – <br />
              <span className="gradient-text bg-gradient-to-r from-brand-primary-700 to-brand-primary-900 drop-shadow-sm">
                Advanced Joint Health Supplement
              </span> <br />
              <span className="text-xl sm:text-2xl font-bold text-brand-navy-600 block mt-2">
                Designed To Support Mobility, Flexibility & Joint Lubrication
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p 
              variants={itemVariants}
              className="text-sm sm:text-base text-brand-navy-600 leading-relaxed max-w-xl"
            >
              Struggling with joint pain as you age? Joint Genesis™ is a premium Joint Health Supplement formulated to support healthy movement, flexibility, and long-term joint wellness. Powered by carefully selected ingredients that help maintain Synovial Fluid Support, Joint Lubrication, and Cartilage Health, Joint Genesis™ provides comprehensive daily support for active adults seeking better mobility and comfort.
            </motion.p>

            {/* Value bullets */}
            <motion.ul variants={itemVariants} className="flex flex-col gap-3.5">
              {[
                "Supports Healthy Joint Lubrication",
                "Restore Youthful Mobility",
                "Clinically Proven Ingredients",
                "Features Advanced Hyaluronic Acid Support",
                "100% Drug-Free Formula"
              ].map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-brand-navy-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-brand-primary-700 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </motion.ul>

            {/* Actions */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2"
            >
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
                  "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-black text-white bg-brand-accent-600 hover:bg-brand-accent-700 shadow-lg shadow-brand-accent-600/10 hover:shadow-xl hover:shadow-brand-accent-600/20 hover:-translate-y-0.5 active:scale-98 transition-all duration-200",
                  isDisabled && "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                )}
                id="hero-primary-cta"
              >
                {isDisabled ? "Currently Unavailable" : "Get Your Discount Today!"}
                {!isDisabled && <ArrowRight className="w-5 h-5" />}
              </a>
              <button
                onClick={() => {
                  document.getElementById("science")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-brand-navy-700 bg-white hover:bg-brand-navy-100/50 border border-brand-navy-200 shadow-sm transition-all duration-200 cursor-pointer"
              >
                See the Science
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Premium Bottle mockup container */}
          {/* Right Column: Premium Bottle mockup container */}
          <motion.div 
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.3 }}
          >
            <div className="relative w-full max-w-[420px] flex items-center justify-center">
              {/* Radial glow background */}
              <div className="absolute inset-0 bg-brand-primary-600/10 blur-3xl rounded-full scale-90 pointer-events-none" />
              
              <img
                src="/images/joint genesis-image/MAIN HEADING (HERO SECTION)/hero.png"
                alt="Joint Genesis supplement bottles"
                className="w-full h-auto object-contain relative z-10 drop-shadow-2xl hover:scale-102 transition-transform duration-300"
              />

              {/* Bonus badges floating */}
              <motion.div
                className="absolute -top-4 right-0 bg-brand-accent-600 text-white font-black text-[10px] uppercase tracking-widest py-2 px-3 rounded-2xl shadow-lg border border-brand-accent-500 flex flex-col items-center leading-none z-20"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <span>Save</span>
                <span className="text-sm font-black mt-0.5">$180</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-2 left-0 bg-white text-brand-navy-900 font-bold text-[10px] py-2 px-3 rounded-2xl shadow-lg border border-brand-navy-100 flex items-center gap-1.5 z-20"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span>In Stock & Ready to Ship</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


