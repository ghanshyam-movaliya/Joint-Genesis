import React from "react";
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

export default function Home() {
  return (
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
  );
}
