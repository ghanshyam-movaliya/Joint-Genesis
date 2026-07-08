import React from "react";
import Link from "next/link";
import { Activity } from "lucide-react";
import { CONFIG } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-brand-navy-950 text-brand-navy-300 border-t border-brand-navy-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand details */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-primary-700 text-white shadow-lg">
                <Activity className="w-5 h-5 text-brand-primary-100" />
              </div>
              <div>
                <span className="font-display text-xl font-extrabold tracking-tight text-white">
                  Joint Genesis<span className="text-brand-primary-500 font-bold">™</span>
                </span>
                <p className="text-[10px] text-brand-navy-400 font-medium tracking-widest uppercase -mt-1">
                  by BioDynamix
                </p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-brand-navy-400 mt-2">
              Doctor-formulated dietary supplement engineered to target the root cause of age-related joint issues by supporting healthy synovial fluid.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Product Info
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-brand-primary-400 transition-colors">
                  About the Formula
                </Link>
              </li>
              <li>
                <Link href="/benefits" className="hover:text-brand-primary-400 transition-colors">
                  Health Benefits
                </Link>
              </li>
              <li>
                <Link href="/ingredients" className="hover:text-brand-primary-400 transition-colors">
                  Active Ingredients
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-brand-primary-400 transition-colors">
                  Pricing & Offers
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-brand-primary-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-primary-400 transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-brand-primary-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-brand-primary-400 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>



          {/* Guarantee Badges */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Quality Assurance
            </h3>
            <p className="text-sm text-brand-navy-400 leading-relaxed">
              Proudly manufactured in a state-of-the-art facility in the USA following strict GMP (Good Manufacturing Practices) guidelines.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-brand-navy-900 border border-brand-navy-800 text-xs font-bold text-brand-primary-400 uppercase tracking-widest">
                GMP Certified
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-brand-navy-900 border border-brand-navy-800 text-xs font-bold text-brand-primary-400 uppercase tracking-widest">
                Made in USA
              </span>
            </div>
          </div>
        </div>

        {/* Legal disclosures & Affiliation disclaimer */}
        <div className="border-t border-brand-navy-900 pt-8 mt-8 text-center text-[10px] leading-relaxed text-brand-navy-500 flex flex-col gap-4 max-w-5xl mx-auto">
          <p>
            ClickBank is the retailer of products on this site. CLICKBANK is a registered trademark of Click Sales, Inc., a Delaware corporation located at 1444 S. Entertainment Ave., Suite 410 Boise, ID 83709, USA and used by permission.
          </p>
          <p>
            Statements on this website have not been evaluated by the Food and Drug Administration. Products are not intended to diagnose, treat, cure or prevent any disease. If you are pregnant, nursing, taking medication, or have a medical condition, consult your physician before using our products.
          </p>
          <p>
            The website’s content and the product for sale is based upon the author’s opinion and is provided solely on an “AS IS” and “AS AVAILABLE” basis. You should do your own research and confirm the information with other sources when searching for information regarding health issues and always review the information carefully with your professional health care provider before using any of the protocols presented on this website and/or in the product sold here.
          </p>
          <p>
            Neither ClickBank nor the author are engaged in rendering medical or similar professional services or advice via this website or in the product, and the information provided is not intended to replace medical advice offered by a physician or other licensed healthcare provider. You should not construe ClickBank’s sale of this product as an endorsement by ClickBank of the views expressed herein, or any warranty or guarantee of any strategy, recommendation, treatment, action, or application of advice made by the author of the product.
          </p>
          <p>
            The information, including but not limited to, text, graphics, video, images & other material, contained on this website is for educational & entertainment purposes only. The content is not intended in any way as a substitute for professional medical advice, diagnosis or treatment. Regardless of your current state of health, always seek the advice of your physician or other qualified health care provider with any questions you may have regarding your current health condition.
          </p>

          {/* Footer Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-brand-navy-900/50 pt-8 mt-8 text-xs text-brand-navy-400">
            <p>Copyright 2026 - Joint Genesis™ All Rights Reserved.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms and Conditions
              </Link>
              <Link href="/disclaimer" className="hover:text-white transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
