import React from "react";
import type { Metadata } from "next";
import { CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms and Conditions | Joint Genesis™",
  description: "Read the Terms and Conditions for utilizing the Joint Genesis™ website and products.",
  keywords: ["Terms and Conditions", "Joint Genesis terms", "legal agreement"],
};

export default function TermsAndConditionsPage() {
  const domainName = CONFIG.domain.replace("https://", "");

  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-b from-brand-primary-50/30 via-white to-brand-navy-50/20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest mb-4">
            Legal Agreement
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 leading-tight tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-xs sm:text-sm text-brand-navy-500 mt-2 font-bold uppercase tracking-wider">
            Joint Genesis™
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-brand-navy-100 rounded-[32px] p-6 sm:p-10 md:p-12 shadow-sm text-brand-navy-700 text-sm sm:text-base leading-relaxed flex flex-col gap-8">
          
          <p>
            These terms and conditions outline the rules and regulations for the use of Joint Genesis™ Website {domainName} By accessing this website we assume you accept these terms and conditions. Do not continue to use Joint Genesis™ if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <div className="h-px bg-brand-navy-100/80 my-2" />

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              1. Product Information
            </h2>
            <p className="mb-4">
              Joint Genesis™ is a natural, dietary supplement designed to support healthy sleep &amp; Weight Loss patterns and promote relaxation using science-backed, plant-based ingredients. It is not intended to diagnose, treat, cure, or prevent any disease. The statements made on this website have not been evaluated by the Food and Drug Administration (FDA).
            </p>
            <p>
              Results may vary from person to person based on factors like age, health status, lifestyle, and diet. Please read all product labels and usage instructions carefully before use.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              2. Use of Website
            </h2>
            <p className="mb-4">
              You agree to use the Joint Genesis™ website solely for lawful purposes and in a manner that does not infringe upon the rights or restrict the use and enjoyment of the website by any third party. You may not use this site in any way that could damage, disable, overburden, or impair its functionality, or interfere with any other user&apos;s access and experience.
            </p>
            <p>
              We reserve the right to terminate or restrict your access if we believe you have violated these Terms.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              3. Orders and Payment
            </h2>
            <p className="mb-4">
              By placing an order through this website, you confirm that all information you provide is accurate, current, and complete. You agree to pay all charges incurred by you or any users of your account and credit card (or other applicable payment method) at the prices in effect when such charges are incurred.
            </p>
            <p>
              Joint Genesis™ reserves the right to refuse, limit, or cancel any order at our sole discretion. We may limit or prohibit orders that appear to be placed by dealers, resellers, or distributors.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              4. Returns and Refunds
            </h2>
            <p>
              We stand behind our product and your satisfaction is important to us. If you are not fully satisfied with your purchase of Joint Genesis™, please refer to our Return and Refund Policy for information on how to initiate a return or request a refund. Conditions may apply, and refunds are issued in accordance with our policy guidelines.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              5. Health Disclaimer
            </h2>
            <p className="mb-4">
              Joint Genesis™ is not intended to replace professional medical advice, diagnosis, or treatment. Always consult your healthcare provider before starting any new supplement—especially if you are pregnant, nursing, taking medication, or have any pre-existing health conditions.
            </p>
            <p>
              Do not exceed the recommended dose. Discontinue use and consult a healthcare professional if you experience any adverse reaction.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              6. Intellectual Property
            </h2>
            <p>
              All content on the Joint Genesis™ website—including but not limited to text, images, logos, graphics, audio, video, and trademarks—is the property of sleep lean or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or modify any content without prior written consent from us.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              7. Limitation of Liability
            </h2>
            <p className="mb-4">
              To the fullest extent permitted by law, Joint Genesis™ and its owners, partners, affiliates, and employees shall not be liable for any damages—whether direct, indirect, incidental, special, or consequential—that result from the use of, or inability to use, our products or website.
            </p>
            <p>
              This includes, but is not limited to, damages related to loss of profits, data, or goodwill, and any health or physical complications alleged to be caused by the use or misuse of the product.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              8. Modifications to Terms
            </h2>
            <p className="mb-4">
              We reserve the right to update or modify these Terms and Conditions at any time, without prior notice. Any changes will become effective immediately upon being posted to this page. Your continued use of the website or products after any such updates signifies your acceptance of the revised Terms.
            </p>
            <p>
              We recommend reviewing this page regularly to stay informed of any updates.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              9. Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites or services that are not owned or controlled by Joint Genesis™. We are not responsible for the content, privacy policies, or practices of any third-party sites. Accessing those links is at your own risk.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              10. Governing Law
            </h2>
            <p>
              These Terms shall be governed by, and interpreted in accordance with, the laws of the state or jurisdiction in which Joint Genesis™ operates, without regard to conflict of law principles. Any disputes arising under these Terms will be resolved in accordance with applicable laws and in the appropriate courts of that jurisdiction.
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
