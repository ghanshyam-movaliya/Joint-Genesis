import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ShieldCheck, Activity, Zap, Layers } from "lucide-react";
import Benefits from "@/sections/Benefits";
import Science from "@/sections/Science";
import HowItWorks from "@/sections/HowItWorks";
import Ingredients from "@/sections/Ingredients";
import Pricing from "@/sections/Pricing";
import Guarantee from "@/sections/Guarantee";
import FAQ from "@/sections/FAQ";
import InternalLinkBanner from "@/components/InternalLinkBanner";
import { BreadcrumbSchema, ProductSchema, FAQSchema, WebPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Joint Genesis Benefits: Synovial Fluid, Mobility & Joint Lubrication",
  description: "Explore the full health benefits of Joint Genesis by BioDynamix. Learn how patented Mobilee® restores synovial fluid, improves knee flexibility, reduces morning stiffness, and protects cartilage.",
  keywords: [
    "Joint Genesis benefits",
    "joint lubrication supplement",
    "Mobilee hyaluronic acid benefits",
    "synovial fluid support",
    "knee pain relief supplement",
    "joint flexibility benefits",
    "BioDynamix joint health"
  ],
  alternates: {
    canonical: "/joint-genesis-benefits",
  },
  openGraph: {
    title: "Joint Genesis Benefits: Complete Joint Lubrication & Flexibility Guide",
    description: "Discover how Joint Genesis restores thick synovial fluid and rejuvenates joint mobility after 40.",
    url: "https://en-jointgenesis.com/joint-genesis-benefits",
    type: "article",
    images: [
      {
        url: "https://en-jointgenesis.com/images/joint genesis-image/The Science Behind Joint Genesis/daigrma joint genesis.webp",
        width: 1200,
        height: 630,
        alt: "Synovial Fluid Cushioning Diagram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joint Genesis Benefits & Science Explained",
    description: "Learn how Mobilee® and Pine Bark restore synovial fluid hyaluronan for smooth joint movement.",
  },
};

export default function JointGenesisBenefitsPage() {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Joint Genesis Benefits", url: "/joint-genesis-benefits" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ProductSchema />
      <FAQSchema />
      <WebPageSchema
        name="Joint Genesis Benefits: Complete Joint Lubrication & Flexibility Guide"
        description="Comprehensive guide to the joint lubrication, flexibility, and mobility benefits of Joint Genesis."
        url="/joint-genesis-benefits"
      />

      <article className="pt-28 pb-20 bg-brand-navy-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-semibold text-brand-navy-500">
              <li>
                <Link href="/" className="hover:text-brand-primary-700 transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li className="text-brand-navy-800 font-bold" aria-current="page">Joint Genesis Benefits</li>
            </ol>
          </nav>

          {/* Hero Header */}
          <header className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-primary-100/80 border border-brand-primary-200 rounded-full px-4 py-1.5 mb-4 shadow-sm">
              <Sparkles className="w-4 h-4 text-brand-primary-700" />
              <span className="text-xs font-extrabold text-brand-primary-800 uppercase tracking-wider">
                Comprehensive Benefit Analysis
              </span>
            </div>

            <h1 className="font-display font-extrabold text-3.5xl sm:text-4.5xl lg:text-5xl text-brand-navy-900 leading-tight tracking-tight mb-6">
              The Proven Benefits of Joint Genesis™: <br />
              <span className="gradient-text bg-gradient-to-r from-brand-primary-700 to-brand-primary-900">
                Rejuvenate Joint Fluid & Restore Youthful Mobility
              </span>
            </h1>

            <p className="text-base sm:text-lg text-brand-navy-600 leading-relaxed max-w-3xl mx-auto">
              As we age, our bodies produce less hyaluronan, causing joint fluid to lose its thickness. Joint Genesis™ works from within to replenish your biological lubricant, resulting in smoother, friction-free movement.
            </p>
          </header>

          {/* 4 Core Benefit Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            <div className="bg-white border border-brand-navy-100 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
              <div className="p-3 rounded-xl bg-brand-primary-50 text-brand-primary-700 w-fit">
                <Activity className="w-6 h-6" />
              </div>
              <h2 className="font-display font-bold text-lg text-brand-navy-900">
                Restores Synovial Fluid
              </h2>
              <p className="text-xs text-brand-navy-600 leading-relaxed">
                Mobilee® multiplies hyaluronan concentration by 10x, making joint fluid thick, slippery, and shock-absorbing again.
              </p>
            </div>

            <div className="bg-white border border-brand-navy-100 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
              <div className="p-3 rounded-xl bg-brand-primary-50 text-brand-primary-700 w-fit">
                <Zap className="w-6 h-6" />
              </div>
              <h2 className="font-display font-bold text-lg text-brand-navy-900">
                Eliminates Morning Stiffness
              </h2>
              <p className="text-xs text-brand-navy-600 leading-relaxed">
                Keeps cartilage surfaces separated, allowing knees, hips, and fingers to bend and flex effortlessly upon waking.
              </p>
            </div>

            <div className="bg-white border border-brand-navy-100 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
              <div className="p-3 rounded-xl bg-brand-primary-50 text-brand-primary-700 w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="font-display font-bold text-lg text-brand-navy-900">
                Protects Cartilage Tissue
              </h2>
              <p className="text-xs text-brand-navy-600 leading-relaxed">
                French Maritime Pine Bark and Boswellia Serrata neutralize cartilage-degrading enzymes and inflammatory cytokines.
              </p>
            </div>

            <div className="bg-white border border-brand-navy-100 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
              <div className="p-3 rounded-xl bg-brand-primary-50 text-brand-primary-700 w-fit">
                <Layers className="w-6 h-6" />
              </div>
              <h2 className="font-display font-bold text-lg text-brand-navy-900">
                Maximum Absorption
              </h2>
              <p className="text-xs text-brand-navy-600 leading-relaxed">
                Standardized BioPerine® increases nutrient absorption by up to 60%, delivering active compounds directly to joint tissue.
              </p>
            </div>
          </div>

          <InternalLinkBanner currentPath="/joint-genesis-benefits" />

        </div>
      </article>

      <Benefits />
      <Science />
      <HowItWorks />
      <Ingredients />
      <Pricing />
      <Guarantee />
      <FAQ />
    </>
  );
}
