import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Star, ShieldCheck, CheckCircle2, ArrowRight, Clock, Award } from "lucide-react";
import Ingredients from "@/sections/Ingredients";
import Pricing from "@/sections/Pricing";
import Guarantee from "@/sections/Guarantee";
import FAQ from "@/sections/FAQ";
import Testimonials from "@/sections/Testimonials";
import SupplementFacts from "@/sections/SupplementFacts";
import { BreadcrumbSchema, ProductSchema, ReviewSchema, FAQSchema, WebPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Joint Genesis Review (2026): Is It Worth Buying? Real Results & Ingredients Audit",
  description: "Read our comprehensive 2026 Joint Genesis review. Discover how Dr. Mark Weis's doctor-formulated supplement uses Mobilee® to restore synovial fluid, reduce joint stiffness, and support long-term mobility.",
  keywords: [
    "Joint Genesis review",
    "Joint Genesis supplement reviews",
    "does Joint Genesis work",
    "Joint Genesis results",
    "BioDynamix Joint Genesis review",
    "Joint Genesis ingredients audit",
    "Mobilee joint review"
  ],
  alternates: {
    canonical: "/joint-genesis-review",
  },
  openGraph: {
    title: "Joint Genesis Review (2026): Is It Worth Buying?",
    description: "In-depth review of Joint Genesis by BioDynamix. Ingredients, clinical proof, real customer results, and where to buy at the best price.",
    url: "https://en-jointgenesis.com/joint-genesis-review",
    type: "article",
    images: [
      {
        url: "https://en-jointgenesis.com/images/joint genesis-image/MAIN HEADING (HERO SECTION)/hero.png",
        width: 1200,
        height: 630,
        alt: "Joint Genesis Supplement Review Bottle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joint Genesis Review (2026): Real Results & Formula Breakdown",
    description: "Comprehensive 2026 review of Joint Genesis doctor-formulated joint supplement.",
  },
};

export default function JointGenesisReviewPage() {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Joint Genesis Review", url: "/joint-genesis-review" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ProductSchema />
      <ReviewSchema />
      <FAQSchema />
      <WebPageSchema
        name="Joint Genesis Review (2026): Is It Worth Buying?"
        description="Comprehensive review of Joint Genesis supplement by BioDynamix."
        url="/joint-genesis-review"
      />

      <article className="pt-28 pb-20 bg-brand-navy-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-semibold text-brand-navy-500">
              <li>
                <Link href="/" className="hover:text-brand-primary-700 transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li className="text-brand-navy-800 font-bold" aria-current="page">Joint Genesis Review</li>
            </ol>
          </nav>

          {/* Hero Header */}
          <header className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-primary-100/80 border border-brand-primary-200 rounded-full px-4 py-1.5 mb-4 shadow-sm">
              <Star className="w-4 h-4 text-brand-accent-500 fill-current" />
              <span className="text-xs font-extrabold text-brand-primary-800 uppercase tracking-wider">
                2026 Official Product Audit & Review
              </span>
            </div>

            <h1 className="font-display font-extrabold text-3.5xl sm:text-4.5xl lg:text-5xl text-brand-navy-900 leading-tight tracking-tight mb-6">
              Joint Genesis™ Review: <br />
              <span className="gradient-text bg-gradient-to-r from-brand-primary-700 to-brand-primary-900">
                Does It Truly Restore Joint Lubrication & Flexibility?
              </span>
            </h1>

            <p className="text-base sm:text-lg text-brand-navy-600 leading-relaxed max-w-3xl mx-auto">
              If you suffer from morning knee stiffness, joint friction, or declining mobility after age 40, Joint Genesis™ promises to target the underlying root cause: **thinning synovial fluid**. In this detailed review, we analyze its ingredients, patented Mobilee® complex, clinical evidence, and real customer experiences.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-brand-navy-500 mt-6 pt-6 border-t border-brand-navy-100">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-brand-primary-600" />
                Medical Director: Dr. Mark Weis
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-primary-600" />
                180-Day Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-primary-600" />
                Updated July 2026
              </span>
            </div>
          </header>

          {/* Key Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            <div className="bg-white border border-brand-navy-100 rounded-2xl p-6 shadow-sm">
              <span className="text-xs font-bold text-brand-primary-700 uppercase tracking-wider block mb-1">Formula Rating</span>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-display font-black text-3xl text-brand-navy-900">4.9</span>
                <div className="flex text-brand-accent-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-brand-navy-600">Based on 1,847+ verified user evaluations</p>
            </div>

            <div className="bg-white border border-brand-navy-100 rounded-2xl p-6 shadow-sm">
              <span className="text-xs font-bold text-brand-primary-700 uppercase tracking-wider block mb-1">Key Innovation</span>
              <span className="font-display font-bold text-xl text-brand-navy-900 block mb-2">Mobilee® Matrix</span>
              <p className="text-xs text-brand-navy-600">Proven to multiply joint fluid hyaluronan by up to 10x</p>
            </div>

            <div className="bg-white border border-brand-navy-100 rounded-2xl p-6 shadow-sm">
              <span className="text-xs font-bold text-brand-primary-700 uppercase tracking-wider block mb-1">Safety Standard</span>
              <span className="font-display font-bold text-xl text-brand-navy-900 block mb-2">100% Non-GMO</span>
              <p className="text-xs text-brand-navy-600">cGMP facility certified, soy-free, dairy-free & shellfish-free</p>
            </div>
          </div>

          {/* Product Image & Verdict Callout */}
          <div className="max-w-4xl mx-auto bg-white border border-brand-navy-100 rounded-3xl p-8 sm:p-10 shadow-sm mb-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 relative aspect-square w-full max-w-[280px] mx-auto">
              <Image
                src="/images/joint genesis-image/MAIN HEADING (HERO SECTION)/hero.png"
                alt="Joint Genesis bottle review"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="md:col-span-7 flex flex-col gap-4">
              <h2 className="font-display font-bold text-2xl text-brand-navy-900">
                Our Expert Verdict on Joint Genesis™
              </h2>
              <p className="text-sm text-brand-navy-600 leading-relaxed">
                Joint Genesis™ stands out in the joint supplement market because it does not simply focus on cartilage wear. Instead, it directly targets the loss of **hyaluronan in synovial fluid**—the primary cause of joint friction in aging adults. Combined with French Maritime Pine Bark and Boswellia Serrata, it provides superior, long-lasting comfort.
              </p>
              <ul className="flex flex-col gap-2 my-2">
                {[
                  "Targets root cause: Synovial fluid thinning",
                  "Restores joint hyaluronan for cushion & bounce",
                  "Backed by a risk-free 180-day money-back guarantee",
                  "Easy daily dosage (2 small capsules per day)"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-bold text-brand-navy-800">
                    <CheckCircle2 className="w-4 h-4 text-brand-primary-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-brand-accent-600 hover:bg-brand-accent-700 shadow-md transition-all self-start mt-2"
              >
                Check Pricing & Available Discounts
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </article>

      {/* Embedded Component Sections */}
      <Ingredients />
      <SupplementFacts />
      <Testimonials />
      <Pricing />
      <Guarantee />
      <FAQ />
    </>
  );
}
