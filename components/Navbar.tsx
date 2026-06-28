"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Activity } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#ingredients", label: "Ingredients" },
  { href: "/#benefits", label: "Benefits" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/#faqs", label: "FAQs" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glassmorphism shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-primary-700 text-white shadow-lg shadow-brand-primary-700/20 group-hover:scale-105 transition-transform duration-300">
              <Activity className="w-5 h-5 text-brand-primary-100" />
            </div>
            <div>
              <span className="font-display text-xl font-extrabold tracking-tight text-brand-navy-900 group-hover:text-brand-primary-700 transition-colors duration-300">
                Joint Genesis<span className="text-brand-primary-600 font-bold">™</span>
              </span>
              <p className="text-[10px] text-brand-navy-500 font-medium tracking-widest uppercase -mt-1">
                by BioDynamix
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 relative group",
                    isActive
                      ? "text-brand-primary-800 bg-brand-primary-50 font-bold"
                      : "text-brand-navy-700 hover:text-brand-primary-700 hover:bg-brand-navy-100/50"
                  )}
                >
                  {link.label}
                  {!isActive && (
                    <span className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-brand-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href={CONFIG.AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-brand-accent-600 hover:bg-brand-accent-700 active:bg-brand-accent-800 shadow-md shadow-brand-accent-600/10 hover:shadow-lg hover:shadow-brand-accent-600/20 active:scale-98 transition-all duration-200"
              id="desktop-nav-cta"
            >
              Order Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer inline-flex items-center justify-center p-2 rounded-xl text-brand-navy-700 hover:text-brand-primary-700 hover:bg-brand-navy-100/50 transition-colors"
              aria-expanded="false"
              aria-label="Toggle main menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-[65px] z-40 bg-brand-navy-950/20 backdrop-blur-sm lg:hidden transition-all duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={cn(
            "absolute top-0 right-0 w-full max-w-sm bg-white h-screen shadow-xl p-6 transition-transform duration-300 ease-out flex flex-col justify-between pb-24",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-brand-navy-400 tracking-wider uppercase mb-2">
              Navigation
            </p>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-xl text-base font-bold transition-all duration-200",
                    isActive
                      ? "text-brand-primary-800 bg-brand-primary-100"
                      : "text-brand-navy-700 hover:text-brand-primary-700 hover:bg-brand-navy-50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile CTA */}
          <div className="flex flex-col gap-4 border-t border-brand-navy-100 pt-6">
            <div className="text-center">
              <span className="text-sm font-semibold text-brand-navy-500">
                Restore Joint Comfort Today
              </span>
            </div>
            <a
              href={CONFIG.AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-base font-bold text-white bg-brand-accent-600 hover:bg-brand-accent-700 shadow-lg shadow-brand-accent-600/10 active:scale-98 transition-all duration-200"
              id="mobile-nav-cta"
            >
              Order Now
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
