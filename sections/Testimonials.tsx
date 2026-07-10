"use client";

import React, { useRef, useState, useEffect } from "react";
import { Star, CheckCircle2, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const { scrollLeft, clientWidth } = container;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.scrollWidth / reviews.length;
      container.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center">
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

        {/* Testimonials Slider Wrapper */}
        <div className="relative group px-0 sm:px-12">
          
          {/* Scroll Container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth pb-6"
            style={{ scrollbarWidth: "none" }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start bg-brand-navy-50/40 border border-brand-navy-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative hover:shadow-lg transition-shadow duration-300"
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
              </div>
            ))}
          </div>

          {/* Slider Controls */}
          <button 
            onClick={() => scroll("left")}
            className="absolute -left-2 lg:left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-brand-navy-200 text-brand-navy-700 shadow-md hover:bg-brand-navy-50 hover:text-brand-primary-700 active:scale-95 transition-all z-20 cursor-pointer hidden sm:flex"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="absolute -right-2 lg:right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-brand-navy-200 text-brand-navy-700 shadow-md hover:bg-brand-navy-50 hover:text-brand-primary-700 active:scale-95 transition-all z-20 cursor-pointer hidden sm:flex"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Indicators Dots */}
        <div className="flex justify-center gap-2 mt-4 mb-12">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                activeIndex === index 
                  ? "bg-brand-primary-700 w-6" 
                  : "bg-brand-navy-200 hover:bg-brand-navy-300"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
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
