"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception silently for telemetry
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-navy-50 px-4 py-20">
      <div className="max-w-md w-full bg-white border border-brand-navy-100 rounded-3xl p-8 shadow-sm text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 text-red-600 mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-navy-900 tracking-tight mb-2">
          Something went wrong
        </h1>

        <p className="text-sm text-brand-navy-600 mb-8 leading-relaxed">
          We encountered an unexpected error while loading this page. Please try refreshing or return home.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-brand-primary-700 hover:bg-brand-primary-800 transition-colors shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-brand-navy-700 bg-brand-navy-100/70 hover:bg-brand-navy-200/70 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
