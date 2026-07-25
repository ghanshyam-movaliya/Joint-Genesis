import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, AlertCircle, CheckCircle2, HeartHandshake } from "lucide-react";
import SupplementFacts from "@/sections/SupplementFacts";
import FAQ from "@/sections/FAQ";
import Pricing from "@/sections/Pricing";
import Guarantee from "@/sections/Guarantee";
import InternalLinkBanner from "@/components/InternalLinkBanner";
import { BreadcrumbSchema, ProductSchema, FAQSchema, WebPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Joint Genesis Side Effects & Safety: Ingredients, Dosage & Precautions",
  description: "Are there any side effects with Joint Genesis? Read our complete safety evaluation. Learn about cGMP manufacturing, non-GMO ingredients, allergen info, and recommended dosage instructions.",
  keywords: [
    "Joint Genesis side effects",
    "is Joint Genesis safe",
    "Joint Genesis safety review",
    "Joint Genesis warnings",
    "Joint Genesis dosage instructions",
    "Joint Genesis ingredients safety",
    "BioDynamix supplement safety"
  ],
  alternates: {
    canonical: "/joint-genesis-side-effects",
  },
  openGraph: {
    title: "Joint Genesis Side Effects & Safety Audit",
    description: "Detailed safety analysis of Joint Genesis. Ingredients, purity testing, dosage recommendations, and allergen breakdown.",
    url: "https://en-jointgenesis.com/joint-genesis-side-effects",
    type: "article",
    images: [
      {
        url: "https://en-jointgenesis.com/images/joint genesis-image/MAIN HEADING (HERO SECTION)/hero.png",
        width: 1200,
        height: 630,
        alt: "Joint Genesis Safety & Bottle Mockup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joint Genesis Side Effects & Safety Guide",
    description: "Complete safety and allergen breakdown of doctor-formulated Joint Genesis supplement.",
  },
};

export default function JointGenesisSideEffectsPage() {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Joint Genesis Side Effects", url: "/joint-genesis-side-effects" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ProductSchema />
      <FAQSchema />
      <WebPageSchema
        name="Joint Genesis Side Effects & Safety Audit"
        description="Comprehensive safety report on Joint Genesis ingredients, allergen profile, and dosage guidelines."
        url="/joint-genesis-side-effects"
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
              <li className="text-brand-navy-800 font-bold" aria-current="page">Side Effects & Safety</li>
            </ol>
          </nav>

          {/* Hero Header */}
          <header className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-200 rounded-full px-4 py-1.5 mb-4 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                Official Safety & Purity Audit
              </span>
            </div>

            <h1 className="font-display font-extrabold text-3.5xl sm:text-4.5xl lg:text-5xl text-brand-navy-900 leading-tight tracking-tight mb-6">
              Joint Genesis™ Side Effects & Safety: <br />
              <span className="gradient-text bg-gradient-to-r from-brand-primary-700 to-brand-primary-900">
                Is It Safe for Daily Long-Term Use?
              </span>
            </h1>

            <p className="text-base sm:text-lg text-brand-navy-600 leading-relaxed max-w-3xl mx-auto">
              Safety is a top priority when choosing a daily health supplement. Joint Genesis™ is formulated by Dr. Mark Weis using 100% natural, vegetarian-friendly ingredients. Here is everything you need to know about side effects, allergen standards, and dosage instructions.
            </p>
          </header>

          {/* Safety Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div className="bg-white border border-brand-navy-100 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 w-fit">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="font-display font-bold text-lg text-brand-navy-900">
                Zero Reported Adverse Effects
              </h2>
              <p className="text-xs text-brand-navy-600 leading-relaxed">
                Formulated with gentle botanical extracts and vegetarian hyaluronan complex. Free from artificial fillers, drugs, or habit-forming substances.
              </p>
            </div>

            <div className="bg-white border border-brand-navy-100 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 w-fit">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h2 className="font-display font-bold text-lg text-brand-navy-900">
                Free of Common Allergens
              </h2>
              <p className="text-xs text-brand-navy-600 leading-relaxed">
                Contains no soy, dairy, gluten, shellfish, nuts, or eggs. Suitable for vegetarians and individuals with sensitive digestive systems.
              </p>
            </div>

            <div className="bg-white border border-brand-navy-100 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="font-display font-bold text-lg text-brand-navy-900">
                cGMP Certified Production
              </h2>
              <p className="text-xs text-brand-navy-600 leading-relaxed">
                Manufactured in the USA in an FDA-inspected facility following rigorous Good Manufacturing Practices (cGMP) and third-party purity testing.
              </p>
            </div>
          </div>

          {/* Usage Instructions Callout */}
          <div className="max-w-4xl mx-auto bg-white border border-brand-navy-100 rounded-3xl p-8 shadow-sm mb-16">
            <h2 className="font-display font-bold text-2xl text-brand-navy-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-brand-primary-600" />
              Recommended Usage & Precautions
            </h2>
            <div className="space-y-4 text-sm text-brand-navy-700 leading-relaxed">
              <p>
                <strong>Dosage:</strong> Take two (2) capsules daily with a glass of water, preferably with your morning meal for optimal digestion and nutrient absorption.
              </p>
              <p>
                <strong>Precautions:</strong> While Joint Genesis™ is safe for most healthy adults, if you are pregnant, nursing, under 18, taking prescription blood thinners, or have a pre-existing medical condition, consult your healthcare provider before beginning any new dietary supplement.
              </p>
            </div>
          </div>

          <InternalLinkBanner currentPath="/joint-genesis-side-effects" />

        </div>
      </article>

      <SupplementFacts />
      <Pricing />
      <Guarantee />
      <FAQ />
    </>
  );
}
