"use client";

import { Award, ShieldCheck, Heart, Sparkles, Activity, ArrowRight } from "lucide-react";
import { useAffiliateUrl } from "@/lib/settingsContext";
import { cn } from "@/lib/utils";

export default function Science() {
  const { affiliateUrl, isDisabled } = useAffiliateUrl({
    utm_source: "website",
    utm_medium: "science"
  });

  const points = [
    {
      title: "Enhanced Cushioning",
      description: "Helps maintain the protective cushioning within joints, promoting smoother movement and reducing everyday stress on joint surfaces.",
      icon: <ShieldCheck className="w-5 h-5 text-brand-primary-700" />
    },
    {
      title: "Improved Mobility",
      description: "Supports flexibility and range of motion, making daily activities feel more comfortable and natural.",
      icon: <Activity className="w-5 h-5 text-brand-primary-700" />
    },
    {
      title: "Joint Recovery Support",
      description: "Helps promote a healthy inflammatory response and supports the body's natural ability to maintain joint tissues over time.",
      icon: <Heart className="w-5 h-5 text-brand-primary-700" />
    },
    {
      title: "Healing",
      description: "Targets the source of inflammation, allowing your body to naturally repair cartilage.",
      icon: <Sparkles className="w-5 h-5 text-brand-primary-700" />
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-brand-navy-50/50 border-y border-brand-navy-100" id="science">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Lead Alert Banner */}
        <div className="bg-brand-primary-50/70 border border-brand-primary-100 rounded-3xl p-6 sm:p-8 text-center max-w-4xl mx-auto mb-16 shadow-sm">
          <p className="font-display font-extrabold text-lg sm:text-xl text-brand-navy-900 leading-relaxed">
            &ldquo;If you’ve noticed your knees <span className="text-brand-primary-700">Clicking</span>, your back <span className="text-brand-primary-700">Aching</span>, or your hands <span className="text-brand-primary-700">Stiffening up</span> in the morning... it’s not just age.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Scientific Explanation */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest self-start">
              <Award className="w-3.5 h-3.5" />
              Scientific Breakthrough
            </span>
            
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 leading-tight tracking-tight">
              The Science Behind <br />
              <span className="text-brand-primary-700">Joint Genesis™</span>
            </h2>
            
            <p className="text-sm sm:text-base text-brand-navy-600 leading-relaxed font-semibold">
              Recent scientific research suggests that joint discomfort is often linked to changes in the body&apos;s natural joint lubrication system. Healthy joints rely on a specialized fluid called synovial fluid, which helps bones move smoothly against one another and reduces everyday friction.
            </p>

            <div className="h-px bg-brand-navy-100 my-2" />

            <h3 className="font-display font-extrabold text-lg text-brand-navy-900">
              Why Joint Lubrication Matters
            </h3>
            
            <div className="text-sm text-brand-navy-600 flex flex-col gap-4 leading-relaxed">
              <p>
                Think of your joints like a well-maintained machine. Just as an engine requires proper lubrication to operate efficiently, your joints depend on synovial fluid to support smooth, comfortable movement.
              </p>
              <p>
                As we age, the body may produce lower amounts of hyaluronan, a naturally occurring substance that helps keep joint fluid thick, cushioning, and effective. When lubrication levels decline, joints can experience increased friction, reduced flexibility, and greater stress during daily activities.
              </p>
            </div>

            {/* Science Diagrams */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-brand-navy-100 rounded-3xl p-3 flex justify-center items-center shadow-sm">
                <img 
                  src="/images/joint genesis-image/The Science Behind Joint Genesis/daigrma joint genesis.webp" 
                  alt="Joint lubrication diagram" 
                  className="rounded-2xl max-h-[180px] w-auto object-contain hover:scale-102 transition-transform duration-300"
                />
              </div>
              <div className="bg-white border border-brand-navy-100 rounded-3xl p-3 flex justify-center items-center shadow-sm">
                <img 
                  src="/images/joint genesis-image/The Science Behind Joint Genesis/diagram.jpg" 
                  alt="Synovial fluid research diagram" 
                  className="rounded-2xl max-h-[180px] w-auto object-contain hover:scale-102 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Right Column: 4 Boxes Graphic & Action */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="text-center lg:text-left">
              <h3 className="font-display font-extrabold text-xl text-brand-navy-900 tracking-tight">
                The &ldquo;Internal Lubricant&rdquo; Breakthrough
              </h3>
              <p className="text-xs text-brand-navy-500 font-bold uppercase tracking-wider mt-1">
                4-way targeted structural nourishment
              </p>
            </div>

            {/* Grid of 4 Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {points.map((point, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-brand-navy-100 rounded-3xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-primary-50 flex items-center justify-center">
                    {point.icon}
                  </div>
                  <h4 className="font-display font-extrabold text-sm text-brand-navy-900 leading-tight">
                    {point.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-brand-navy-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Area (Updated layout) */}
            <div className="flex flex-col items-center gap-6 mt-12 text-center">
              <h4 className="font-display font-extrabold text-lg sm:text-xl text-brand-navy-900">
                Experience Full Joint Recovery
              </h4>
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
                {isDisabled ? "CURRENTLY UNAVAILABLE" : "BUY NOW!"}
                {!isDisabled && <ArrowRight className="w-5 h-5" />}
              </a>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
