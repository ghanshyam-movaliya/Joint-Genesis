"use client";

import React, { useState, useEffect } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TOCProps {
  headings: HeadingItem[];
}

export default function TOC({ headings }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -60% 0px", // Trigger when heading is in the upper half
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-white border border-brand-navy-100 rounded-2xl p-6 shadow-sm sticky top-24 max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="flex items-center gap-2 border-b border-brand-navy-100 pb-3 mb-4">
        <List className="w-4.5 h-4.5 text-brand-primary-700" />
        <h3 className="font-display font-bold text-sm text-brand-navy-900 uppercase tracking-wider">
          Table of Contents
        </h3>
      </div>
      <nav className="flex flex-col gap-2">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                setActiveId(heading.id);
              }}
              className={cn(
                "block text-xs font-semibold leading-relaxed transition-all duration-200 hover:text-brand-primary-700",
                heading.level === 3 ? "pl-4 text-brand-navy-500" : "text-brand-navy-700",
                isActive
                  ? "text-brand-primary-700 font-extrabold border-l-2 border-brand-primary-600 pl-2 -ml-2"
                  : "border-l border-transparent"
              )}
            >
              {heading.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
