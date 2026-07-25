import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, HelpCircle, ShoppingBag, FileText } from "lucide-react";

interface InternalLinkBannerProps {
  currentPath?: string;
}

export default function InternalLinkBanner({ currentPath }: InternalLinkBannerProps) {
  const links = [
    {
      href: "/joint-genesis-review",
      label: "Full Joint Genesis™ Review (2026)",
      desc: "Complete breakdown of formula, clinical trials & real results",
      icon: FileText,
    },
    {
      href: "/joint-genesis-benefits",
      label: "Joint Genesis™ Benefits & Science",
      desc: "How Mobilee® multiplies synovial fluid hyaluronan by 10x",
      icon: Sparkles,
    },
    {
      href: "/joint-genesis-side-effects",
      label: "Side Effects & Safety Analysis",
      desc: "cGMP manufacturing, non-GMO, allergen-free safety audit",
      icon: ShieldCheck,
    },
    {
      href: "/#faqs",
      label: "Frequently Asked Questions",
      desc: "Answers to common questions regarding dosage & shipping",
      icon: HelpCircle,
    },
    {
      href: "/#pricing",
      label: "Official Store & Buying Guide",
      desc: "Check latest discount availability and 180-day guarantee",
      icon: ShoppingBag,
    },
  ].filter((link) => link.href !== currentPath);

  return (
    <section aria-label="Related Joint Genesis Resources" className="my-12 p-6 sm:p-8 bg-gradient-to-br from-brand-primary-50/80 via-white to-brand-navy-50/50 border border-brand-navy-100 rounded-3xl shadow-sm">
      <div className="flex items-center gap-2 text-brand-primary-700 font-extrabold text-xs uppercase tracking-wider mb-2">
        <Sparkles className="w-4 h-4" />
        <span>Explore Related Resources</span>
      </div>
      <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-navy-900 mb-6">
        Recommended Joint Genesis™ Links
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((link, idx) => {
          const IconComponent = link.icon;
          return (
            <Link
              key={idx}
              href={link.href}
              className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-brand-navy-100 hover:border-brand-primary-300 hover:shadow-md transition-all duration-200 group"
            >
              <div className="p-2.5 rounded-xl bg-brand-primary-50 text-brand-primary-700 group-hover:bg-brand-primary-600 group-hover:text-white transition-colors">
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-sm text-brand-navy-900 group-hover:text-brand-primary-700 flex items-center gap-1 transition-colors">
                  {link.label}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </span>
                <span className="text-xs text-brand-navy-600 font-normal">
                  {link.desc}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
