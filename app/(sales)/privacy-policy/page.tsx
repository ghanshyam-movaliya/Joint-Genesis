import React from "react";
import type { Metadata } from "next";
import { CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy | Joint Genesis™",
  description: "Read the Privacy Policy for Joint Genesis™. Learn how we collect, use, and protect your information when visiting our website.",
  keywords: ["Privacy Policy", "Joint Genesis privacy", "data protection"],
};

export default function PrivacyPolicyPage() {
  const domainName = CONFIG.domain.replace("https://", "");

  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-b from-brand-primary-50/30 via-white to-brand-navy-50/20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest mb-4">
            Legal Information
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 leading-tight tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-brand-navy-500 mt-2 font-bold uppercase tracking-wider">
            Joint Genesis™
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-brand-navy-100 rounded-[32px] p-6 sm:p-10 md:p-12 shadow-sm text-brand-navy-700 text-sm sm:text-base leading-relaxed flex flex-col gap-8">
          
          <p>
            At Joint Genesis™ accessible from {domainName} , one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Joint Genesis™ and how we use it.
          </p>
          
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
          </p>

          <div className="h-px bg-brand-navy-100/80 my-2" />

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              Log Files
            </h2>
            <p>
              Joint Genesis™ follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              Privacy Policies
            </h2>
            <p>
              You may consult this list to find the Privacy Policy for each of the advertising partners of Joint Genesis™.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              Joint Genesis™
            </h2>
            <p className="mb-4">
              Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Joint Genesis™, which are sent directly to users&apos; browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
            </p>
            <p>
              Note that Joint Genesis™ has no access to or control over these cookies that are used by third-party advertisers.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              Third Party Privacy Policies
            </h2>
            <p className="mb-4">
              Joint Genesis™ &apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. You may find a complete list of these Privacy Policies and their links here: Privacy Policy Links.
            </p>
            <p>
              You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers&apos; respective websites. What Are Cookies?
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              Children&apos;s Information
            </h2>
            <p className="mb-4">
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p>
              Joint Genesis™ does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to Contact immediately and we will do our best efforts to promptly remove such information from our records.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              Online Privacy Policy Only
            </h2>
            <p>
              This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Joint Genesis™ . This policy is not applicable to any information collected offline or via channels other than this website.
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

          <div className="border-t border-brand-navy-100 pt-6">
            <h2 className="font-display font-bold text-lg sm:text-xl text-brand-navy-900 mb-3">
              Consent
            </h2>
            <p className="mb-4">
              By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
            </p>
            <p className="text-xs text-brand-navy-400 mt-8 text-center">
              Copyright 2026 - Joint Genesis™ All Rights Reserved.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
