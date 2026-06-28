"use client";

import React, { useState } from "react";
import { Link2, Check } from "lucide-react";

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: "twitter" | "facebook" | "linkedin") => {
    if (typeof window === "undefined") return;

    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(window.location.href);

    const shareLinks = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    window.open(shareLinks[platform], "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy url: ", err);
    }
  };

  return (
    <div className="flex flex-col gap-3 py-6 border-y border-brand-navy-100 my-8">
      <span className="text-xs font-bold text-brand-navy-400 uppercase tracking-wider">
        Share Article
      </span>
      <div className="flex items-center gap-2">
        {/* Twitter */}
        <button
          onClick={() => handleShare("twitter")}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-navy-100 text-brand-navy-700 hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-sm cursor-pointer"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
        </button>

        {/* Facebook */}
        <button
          onClick={() => handleShare("facebook")}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-navy-100 text-brand-navy-700 hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-sm cursor-pointer"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => handleShare("linkedin")}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-navy-100 text-brand-navy-700 hover:bg-[#0077B5] hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-sm cursor-pointer"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-navy-100 text-brand-navy-700 hover:bg-brand-primary-700 hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-sm cursor-pointer"
          aria-label="Copy page link"
        >
          {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
