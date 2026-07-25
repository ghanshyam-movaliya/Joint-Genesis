import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { AlertCircle, Home, FileText, Sparkles, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "404 Page Not Found | Joint Genesis™",
  description: "The page you are looking for could not be found. Return to Joint Genesis official home or explore our joint health guides.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-navy-50">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full bg-white border border-brand-navy-100 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mb-6">
            <AlertCircle className="w-8 h-8" />
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 tracking-tight mb-3">
            404 - Page Not Found
          </h1>

          <p className="text-base text-brand-navy-600 max-w-lg mx-auto mb-8 leading-relaxed">
            Sorry, we couldn&apos;t find the page you were looking for. It might have been moved, renamed, or is temporarily unavailable.
          </p>

          {/* Quick links navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-10 text-left">
            <Link
              href="/"
              className="flex items-center gap-3 p-4 rounded-2xl bg-brand-navy-50/70 border border-brand-navy-100 hover:border-brand-primary-300 hover:bg-white transition-all group"
            >
              <div className="p-2 rounded-xl bg-brand-primary-100 text-brand-primary-700">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm text-brand-navy-900 block group-hover:text-brand-primary-700">
                  Homepage
                </span>
                <span className="text-xs text-brand-navy-500">Official site & store</span>
              </div>
            </Link>

            <Link
              href="/joint-genesis-review"
              className="flex items-center gap-3 p-4 rounded-2xl bg-brand-navy-50/70 border border-brand-navy-100 hover:border-brand-primary-300 hover:bg-white transition-all group"
            >
              <div className="p-2 rounded-xl bg-brand-primary-100 text-brand-primary-700">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm text-brand-navy-900 block group-hover:text-brand-primary-700">
                  Product Review
                </span>
                <span className="text-xs text-brand-navy-500">Comprehensive review 2026</span>
              </div>
            </Link>

            <Link
              href="/joint-genesis-benefits"
              className="flex items-center gap-3 p-4 rounded-2xl bg-brand-navy-50/70 border border-brand-navy-100 hover:border-brand-primary-300 hover:bg-white transition-all group"
            >
              <div className="p-2 rounded-xl bg-brand-primary-100 text-brand-primary-700">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm text-brand-navy-900 block group-hover:text-brand-primary-700">
                  Benefits & Science
                </span>
                <span className="text-xs text-brand-navy-500">Mobilee® & formula details</span>
              </div>
            </Link>

            <Link
              href="/blog"
              className="flex items-center gap-3 p-4 rounded-2xl bg-brand-navy-50/70 border border-brand-navy-100 hover:border-brand-primary-300 hover:bg-white transition-all group"
            >
              <div className="p-2 rounded-xl bg-brand-primary-100 text-brand-primary-700">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm text-brand-navy-900 block group-hover:text-brand-primary-700">
                  Health Blog
                </span>
                <span className="text-xs text-brand-navy-500">Mobility & joint health tips</span>
              </div>
            </Link>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-brand-primary-700 hover:bg-brand-primary-800 transition-colors shadow-md"
          >
            Return to Homepage
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
