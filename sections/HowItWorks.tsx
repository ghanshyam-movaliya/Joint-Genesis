"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useAffiliateUrl } from "@/lib/settingsContext";
import { cn } from "@/lib/utils";

export default function HowItWorks() {
  const { affiliateUrl, isDisabled } = useAffiliateUrl({
    utm_source: "website",
    utm_medium: "how_it_works"
  });

  const steps = [
    {
      title: "Rebuilds Hyaluronan Levels Inside the Joints",
      description: "Hyaluronan is an essential component of healthy joints that naturally declines with age. Joint Genesis™ is formulated to support the body's natural production of this important compound, helping maintain joint lubrication, flexibility, and overall joint health for comfortable daily movement.",
      image: "/images/joint genesis-image/How Is Joint Genesis Supposed to Work/Rebuilds-Hyaluronan-Levels-Inside-the-Joints.jpg"
    },
    {
      title: "Rehydrates and Thickens Synovial Fluid",
      description: "Synovial fluid acts as the body's natural joint lubricant, helping joints move smoothly and comfortably. By supporting healthy fluid quality and hydration, Joint Genesis™ helps promote better cushioning and mobility throughout everyday activities.",
      image: "/images/joint genesis-image/How Is Joint Genesis Supposed to Work/Rehydrates-and-Thickens-Synovial-Fluid.jpg"
    },
    {
      title: "Nourishes Cartilage and Joint Tissues",
      description: "Healthy cartilage and connective tissues play a vital role in joint function. Joint Genesis™ provides targeted nutritional support to help nourish these structures, promoting long-term joint wellness, flexibility, and active living.",
      image: "/images/joint genesis-image/How Is Joint Genesis Supposed to Work/Nourishes-Cartilage-and-Joint-Tissues.jpg"
    },
    {
      title: "Supports a Healthy Inflammatory Response",
      description: "Occasional joint stiffness can affect comfort and mobility. With carefully selected ingredients, Joint Genesis™ helps support a healthy inflammatory response, promoting joint comfort and helping you stay active with confidence.",
      image: "/images/joint genesis-image/How Is Joint Genesis Supposed to Work/Supports-a-Healthy-Inflammatory-Response.jpg"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-brand-navy-50/50 border-y border-brand-navy-100" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest mb-4">
            Mechanism of Action
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 leading-tight tracking-tight">
            How Is Joint Genesis Supposed to Work?
          </h2>
          <div className="text-sm sm:text-base text-brand-navy-600 leading-relaxed mt-4 flex flex-col gap-4">
            <p>
              As you age, your body naturally loses hyaluronan, the primary molecule responsible for the thickness and lubrication of your synovial fluid. Without this vital lubricant, your joints become dehydrated, leading to &ldquo;Bone-on-Bone&rdquo; friction, stiffness, and chronic pain.
            </p>
            <p>
              Joint Genesis™ is formulated to help maintain healthy joint cushioning and natural mobility as you age. Its advanced blend supports joint hydration and flexibility, helping your joints move more smoothly throughout the day. With consistent use, it promotes long-term joint comfort and an active lifestyle.
            </p>
          </div>
        </div>

        {/* Step-by-Step Block */}
        <div className="mt-12 text-center max-w-xl mx-auto mb-12">
          <h3 className="font-display font-extrabold text-lg text-brand-navy-900">
            How It Supports Your Joints
          </h3>
          <p className="text-xs text-brand-navy-500 font-bold uppercase tracking-wider mt-1">
            step-by-step explanation of how Joint Genesis works in your body.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-white border border-brand-navy-100 rounded-3xl p-6 sm:p-8 flex gap-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
            >
              {/* Decorative Number */}
              <div className="absolute top-4 right-6 font-display font-black text-5xl text-brand-navy-100/50 group-hover:text-brand-primary-100 transition-colors">
                {`0${idx + 1}`}
              </div>

              <img
                src={step.image}
                alt={step.title}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-brand-navy-100 shadow-sm shrink-0 relative z-10"
              />
              <div className="flex flex-col gap-2 relative z-10">
                <h4 className="font-display font-extrabold text-base sm:text-lg text-brand-navy-900 leading-tight">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-brand-navy-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA (Updated layout) */}
        <div className="flex flex-col items-center gap-4 mt-12 text-center">
          <h4 className="font-display font-extrabold text-lg sm:text-2xl text-brand-navy-900">
            Support Your Joints at Every Level
          </h4>
          <p className="text-xs sm:text-sm text-brand-navy-600 max-w-lg leading-relaxed font-semibold">
            Give your body the vital hyaluronan it needs to restore youthful fluid cushioning.
          </p>
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
              "inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-black text-white bg-brand-accent-600 hover:bg-brand-accent-700 shadow-lg shadow-brand-accent-600/10 active:scale-98 transition-all duration-200 mt-2",
              isDisabled && "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
            )}
          >
            {isDisabled ? "CURRENTLY UNAVAILABLE" : "GET JOINT GENESIS NOW!"}
            {!isDisabled && <ArrowRight className="w-5 h-5" />}
          </a>
        </div>

      </div>
    </section>
  );
}
