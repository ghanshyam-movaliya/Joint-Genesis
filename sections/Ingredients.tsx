"use client";

import { FlaskConical, ArrowRight } from "lucide-react";

export default function Ingredients() {
  const ingredients = [
    {
      name: "Mobilee® (Patented Complex)",
      description: "Mobilee® helps support joint lubrication, joint flexibility, and healthy mobility by promoting the natural cushioning system within the joints. This patented complex is designed to help maintain smooth, comfortable movement and long-term joint wellness.",
      image: "/images/joint genesis-image/Joint Genesis Ingredients/Mobilee®-Patented-Complex.png"
    },
    {
      name: "French Maritime Pine Bark",
      description: "French Maritime Pine Bark provides powerful antioxidants that support joint health and overall wellness. It helps protect cells from oxidative stress while promoting an active, healthy lifestyle.",
      image: "/images/joint genesis-image/Joint Genesis Ingredients/French-Maritime-Pine-Bark.png"
    },
    {
      name: "Ginger Root Extract",
      description: "Ginger Root Extract is known for supporting joint comfort, flexibility, and a healthy inflammatory response. It helps maintain everyday mobility so you can stay active with confidence.",
      image: "/images/joint genesis-image/Joint Genesis Ingredients/Ginger-Root-Extract.png"
    },
    {
      name: "Boswellia Serrata Extract",
      description: "Boswellia Serrata is a traditional herbal ingredient that supports joint mobility, flexibility, and physical comfort. It helps promote healthy movement and long-term joint support.",
      image: "/images/joint genesis-image/Joint Genesis Ingredients/Boswellia-Serrata-Extract.png"
    },
    {
      name: "BioPerine® (Black Pepper Extract)",
      description: "BioPerine® enhances nutrient absorption, helping the body maximize the benefits of important joint support ingredients. This improves the overall effectiveness of the formula.",
      image: "/images/joint genesis-image/Joint Genesis Ingredients/BioPerine®-Black-Pepper-Extract.png"
    },
    {
      name: "Hyaluronic Acid Support Nutrients",
      description: "These nutrients help maintain joint hydration, cushioning, and lubrication for smoother movement. Healthy levels of hyaluronic acid are important for joint flexibility, comfort, and mobility.",
      image: "/images/joint genesis-image/Joint Genesis Ingredients/Hyaluronic-Acid-Support-Nutrients.png"
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-brand-navy-50/50 border-y border-brand-navy-100" id="ingredients">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest mb-4">
            <FlaskConical className="w-3.5 h-3.5" />
            Core Ingredients
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 leading-tight tracking-tight">
            Joint Genesis Ingredients: <br />
            <span className="text-brand-primary-700">What&apos;s Actually Inside</span>
          </h2>
          <p className="text-sm sm:text-base text-brand-navy-600 leading-relaxed mt-4">
            Joint Genesis™ combines research-backed ingredients in a carefully crafted formula designed to support joint hydration, cushioning, and flexibility. Working from within, it helps maintain smooth joint movement and long-term mobility.
          </p>
        </div>

        {/* Center Tagline */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-brand-navy-500 uppercase tracking-wider">
            Below is a detailed explanation of each key ingredient in Joint Genesis :
          </p>
        </div>

        {/* 6 Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {ingredients.map((ing, idx) => (
            <div 
              key={idx}
              className="bg-white border border-brand-navy-100 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Ingredient Image Thumbnail */}
              <div className="relative w-full h-44 rounded-2xl bg-brand-navy-50/50 border border-brand-navy-100/50 overflow-hidden flex justify-center items-center">
                <img
                  src={ing.image}
                  alt={ing.name}
                  className="h-36 w-auto object-contain hover:scale-105 transition-transform duration-300 drop-shadow-md"
                />
                
                {/* Number Badge overlay */}
                <span className="absolute top-3 left-3 bg-brand-primary-700 text-white font-black text-xs px-2.5 py-1 rounded-lg">
                  {idx + 1}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-display font-extrabold text-base sm:text-lg text-brand-navy-900 leading-tight">
                  {ing.name}
                </h3>
                <p className="text-xs sm:text-sm text-brand-navy-600 leading-relaxed">
                  {ing.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Subheading & Button */}
        <div className="flex flex-col items-center gap-6 mt-12">
          <h4 className="font-display font-extrabold text-lg sm:text-xl text-brand-navy-900 text-center">
            Support Your Joints with Science-Backed Ingredients
          </h4>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-black text-white bg-brand-accent-600 hover:bg-brand-accent-700 shadow-lg shadow-brand-accent-600/10 active:scale-98 transition-all duration-200"
          >
            ORDER NOW!
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

      </div>
    </section>
  );
}
