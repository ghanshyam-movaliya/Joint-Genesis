import React from "react";
import type { Metadata } from "next";
import { CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Disclaimer | Joint Genesis™",
  description: "Read the Disclaimer statement for Joint Genesis™. Learn about informational use and affiliate disclosures.",
  keywords: ["Disclaimer", "Joint Genesis disclaimer", "affiliate disclosure"],
};

export default function DisclaimerPage() {
  const domainName = CONFIG.domain.replace("https://", "");

  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-b from-brand-primary-50/30 via-white to-brand-navy-50/20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest mb-4">
            Legal Disclosures
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 leading-tight tracking-tight">
            Disclaimer
          </h1>
          <p className="text-xs sm:text-sm text-brand-navy-500 mt-2 font-bold uppercase tracking-wider">
            Joint Genesis™
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-brand-navy-100 rounded-[32px] p-6 sm:p-10 md:p-12 shadow-sm text-brand-navy-700 text-sm sm:text-base leading-relaxed flex flex-col gap-8">
          
          <p>
            If you require any more information or have any questions about our site&apos;s disclaimer, please feel free to contact us by website at {domainName} . All the information on this website – {domainName} is published in good faith and for general information purpose only. Joint Genesis™ does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website
          </p>

          <p>
            ( Joint Genesis™ ), is strictly at your own risk. Joint Genesis™ will not be liable for any losses and/or damages in connection with the use of our website. Our Disclaimer was generated with the help of the Disclaimer Generator and the Disclaimer Generator.
          </p>
          
          <p>
            From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone &apos;bad&apos;.
          </p>

          <p>
            Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control.
          </p>

          <p>
            Please be sure to check the Privacy Policies of these sites as well as their &ldquo;Terms of Service&rdquo; before engaging in any business or uploading any information.
          </p>

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              Consent
            </h2>
            <p>
              By using our website, you hereby consent to our disclaimer and agree to its terms.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              Updates
            </h2>
            <p>
              Should we update, amend or make any changes to this document, those changes will be prominently posted here.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              Affiliate Disclosure
            </h2>
            <p>
              This site may use affiliate links and earn a commission from certain links. This does not affect your purchases or the price you may pay.
            </p>
          </div>

          <div className="border-t border-brand-navy-100 pt-6 text-center text-xs text-brand-navy-400">
            Copyright 2026 - Joint Genesis™ All Rights Reserved.
          </div>

        </div>

      </div>
    </section>
  );
}
