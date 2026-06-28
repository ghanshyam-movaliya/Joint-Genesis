"use client";

import React from "react";
import { Star, CheckCircle2, Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function Testimonials() {
  const reviews = [
    {
      name: "Ashley K.",
      location: "Los Angeles, USA",
      content: "Sitting for long hours affected my hips and lower back. Joint Genesis helped support my joints from within. I feel more flexible and less uncomfortable after a full workday. It has become part of my daily routine.",
      rating: 5
    },
    {
      name: "Leona B.",
      location: "Florida, USA",
      content: "“Once I hit 65, joint stiffness became a regular part of my life. But since I started using Joint Genesis, my flexibility has really improved, and the discomfort has eased up a lot. I’ve ditched the pain relievers and now feel more energetic during my walks, stretching, and light exercises throughout the day.”",
      rating: 5
    },
    {
      name: "Robert M.",
      location: "Chicago, USA",
      content: "When I first stumbled upon this remarkable product I was in a state of desperation and willing to try anything to relieve my knee pain. To my great relief, it has restored the mobility and comfort of my knees to how they felt 20 years ago.",
      rating: 5
    },
    {
      name: "James K.",
      location: "Louisiana, USA",
      content: "\"After trying many joint supplements, Joint Genesis is the one that truly made a difference. Within a few weeks, my knees felt stronger, inflammation decreased, and moving became much easier. I can finally stay active with greater comfort and confidence.\"",
      rating: 5
    },
    {
      name: "Sarah D.",
      location: "Louisiana, USA",
      content: "\"Since starting Joint Genesis, my joint flexibility has improved significantly, and daily discomfort has greatly reduced. I feel more energetic during walks and exercise, and I can stay active with much greater comfort.\"",
      rating: 5
    },
    {
      name: "William S.",
      location: "Ohio, USA",
      content: "\"Joint Genesis focuses on long-term joint health, not just temporary relief. With consistent use, my joints feel better lubricated, movement is smoother, and everyday activities are much easier and more comfortable.\"",
      rating: 5
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest mb-4">
            Testimonials
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 leading-tight tracking-tight">
            Joint Genesis Reviews: <br />
            <span className="text-brand-primary-700">What Are Buyers Actually Saying?</span>
          </h2>
          <p className="text-sm sm:text-base text-brand-navy-600 leading-relaxed mt-4">
            Thousands of adults across the United States are choosing Joint Genesis as part of their daily joint health routine. Many of them were looking for a natural way to support joint comfort, flexibility, and mobility without relying on harsh solutions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-brand-navy-50/40 border border-brand-navy-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Quote bubble absolute icon */}
              <div className="absolute top-6 right-6 text-brand-primary-100/50">
                <Quote className="w-8 h-8 rotate-180 fill-current" />
              </div>

              <div className="flex flex-col gap-4">
                {/* Rating stars */}
                <div className="flex items-center gap-0.5 text-brand-accent-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-current" />
                  ))}
                </div>

                {/* Review content */}
                <p className="text-xs sm:text-sm text-brand-navy-700 leading-relaxed italic">
                  {review.content}
                </p>
              </div>

              {/* Reviewer info */}
              <div className="flex items-center justify-between border-t border-brand-navy-100/50 pt-4 mt-6">
                <div className="flex items-center gap-3">
                  {/* Styled Avatar Initial */}
                  <div className="w-10 h-10 rounded-full bg-brand-primary-100 text-brand-primary-800 font-display font-black text-sm flex items-center justify-center">
                    {review.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-brand-navy-900 leading-none">
                      {review.name}
                    </h4>
                    <span className="text-[10px] text-brand-navy-500 font-semibold mt-1 block">
                      {review.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 px-2.5 py-1 rounded-lg border border-brand-primary-100">
                  <CheckCircle2 className="w-3.5 h-3.5 fill-current text-brand-primary-600" />
                  Verified Buyer
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global review stats banner */}
        <div className="mt-16 text-center bg-brand-primary-50/30 border border-brand-primary-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-black text-2xl text-brand-navy-900">4.9</span>
            <div className="flex items-center gap-0.5 text-brand-accent-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>
          <p className="text-xs sm:text-sm text-brand-navy-700 font-bold max-w-lg text-center sm:text-left">
            Our average rating is 4.9 out of 5 stars based on customer feedback compiled across telephone sales and online orders.
          </p>
        </div>
      </div>
    </section>
  );
}
