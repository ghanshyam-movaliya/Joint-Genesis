"use client";

import React from "react";
import { 
  Zap, 
  Droplet, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Heart, 
  Footprints, 
  Move,
  ArrowRight 
} from "lucide-react";
import { motion } from "framer-motion";

export default function Benefits() {
  const benefitCards = [
    {
      title: "Fast-Acting Relief",
      description: "Targets inflammation at the source, helping you feel lighter and more comfortable in as little as 7 days.",
      icon: <Zap className="w-5 h-5 text-brand-primary-700" />
    },
    {
      title: "Deep Joint Lubrication",
      description: "Helps support healthy synovial fluid production, promoting smoother movement and reducing joint friction for lasting comfort.",
      icon: <Droplet className="w-5 h-5 text-brand-primary-700" />
    },
    {
      title: "Full-Body Joint Care",
      description: "Supports knees, hips, shoulders, hands, and other major joints throughout the body.",
      icon: <Heart className="w-5 h-5 text-brand-primary-700" />
    },
    {
      title: "Long-Term Protection",
      description: "Protects your cartilage from future wear and tear by maintaining a healthy joint environment.",
      icon: <ShieldCheck className="w-5 h-5 text-brand-primary-700" />
    },
    {
      title: "Enhanced Mobility & Flexibility",
      description: "Supports healthy joint function, making it easier to stay active, flexible, and comfortable throughout the day.",
      icon: <Activity className="w-5 h-5 text-brand-primary-700" />
    },
    {
      title: "Youthful Vitality",
      description: "Don't let age slow you down. Reclaim the active lifestyle you love, from gardening to playing with grandkids.",
      icon: <Sparkles className="w-5 h-5 text-brand-primary-700" />
    },
    {
      title: "Active Lifestyle Support",
      description: "Helps keep you moving comfortably during walks, exercise, and daily activities.",
      icon: <Footprints className="w-5 h-5 text-brand-primary-700" />
    },
    {
      title: "Improved Movement Quality",
      description: "Helps joints glide more smoothly for greater ease and comfort throughout the day.",
      icon: <Move className="w-5 h-5 text-brand-primary-700" />
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-white" id="benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest mb-4">
            Exclusive Benefits
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 leading-tight tracking-tight">
            Exclusive Benefits of <br />
            <span className="text-brand-primary-700">Joint Genesis™</span>
          </h2>
          <p className="text-sm sm:text-base text-brand-navy-600 leading-relaxed mt-4">
            Joint Genesis doesn&apos;t just mask the pain. It revitalizes your entire joint system, giving you the freedom to live life on your terms.
          </p>
        </div>

        {/* 8 Grid Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefitCards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-brand-navy-50/40 border border-brand-navy-100 rounded-3xl p-6 flex flex-col gap-4 hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-brand-navy-100 flex items-center justify-center shadow-sm shrink-0">
                {card.icon}
              </div>
              <div>
                <h3 className="font-display font-extrabold text-sm sm:text-base text-brand-navy-900 leading-tight mb-2">
                  {card.title}
                </h3>
                <p className="text-[11px] sm:text-xs leading-relaxed text-brand-navy-600">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Subheading & Button */}
        <div className="flex flex-col items-center gap-6 mt-12">
          <h4 className="font-display font-extrabold text-lg sm:text-xl text-brand-navy-900 text-center">
            Experience Benefits That Go Beyond Basic Joint Support
          </h4>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-black text-white bg-brand-accent-600 hover:bg-brand-accent-700 shadow-lg shadow-brand-accent-600/10 active:scale-98 transition-all duration-200"
          >
            GET STARTED!
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

      </div>
    </section>
  );
}
