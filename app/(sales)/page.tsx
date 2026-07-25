import React from "react";
import type { Metadata } from "next";
import Hero from "@/sections/Hero";
import WhatIsJointGenesis from "@/sections/WhatIsJointGenesis";
import Science from "@/sections/Science";
import SupplementFacts from "@/sections/SupplementFacts";
import HowItWorks from "@/sections/HowItWorks";
import Testimonials from "@/sections/Testimonials";
import Ingredients from "@/sections/Ingredients";
import WhyChooseUs from "@/sections/WhyChooseUs";
import Benefits from "@/sections/Benefits";
import HowToConsume from "@/sections/HowToConsume";
import Bonuses from "@/sections/Bonuses";
import Pricing from "@/sections/Pricing";
import Guarantee from "@/sections/Guarantee";
import FAQ from "@/sections/FAQ";
import FinalCTA from "@/sections/FinalCTA";
import { ProductSchema, FAQSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Joint Genesis™ Official Store | Restore Synovial Fluid & Joint Mobility",
  description: "Official site for Joint Genesis™ by BioDynamix. Doctor-formulated joint supplement powered by Mobilee® to target synovial fluid loss, reduce stiffness, and restore youthful mobility.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Joint Genesis™ | Support Rejuvenated Joint Comfort & Mobility",
    description: "Doctor-formulated supplement that targets age-related joint decay by supporting healthy synovial fluid.",
    url: "https://www.jointgeneshis.com",
    type: "website",
    images: [
      {
        url: "https://www.jointgeneshis.com/images/joint genesis-image/MAIN HEADING (HERO SECTION)/hero.png",
        width: 1200,
        height: 630,
        alt: "Joint Genesis Supplement Bottle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joint Genesis™ | Rejuvenate Your Joint Health",
    description: "Doctor-formulated joint health supplement targeting synovial fluid support.",
  },
};

export default function Home() {
  return (
    <>
      <ProductSchema />
      <FAQSchema />
      <div className="flex flex-col w-full overflow-hidden">
        <Hero />
        <WhatIsJointGenesis />
        <Science />
        <SupplementFacts />
        <HowItWorks />
        <Testimonials />
        <Ingredients />
        <WhyChooseUs />
        <Benefits />
        <HowToConsume />
        <Bonuses />
        <Pricing />
        <Guarantee />
        <FAQ />
        <FinalCTA />
      </div>
    </>
  );
}
