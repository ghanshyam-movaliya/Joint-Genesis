"use client";

import React from "react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-US">
      <body className="min-h-screen flex items-center justify-center bg-gray-50 font-sans p-6 text-gray-900">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Application Error</h1>
          <p className="text-sm text-gray-600 mb-6">
            A critical system error occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow"
          >
            Refresh Application
          </button>
        </div>
      </body>
    </html>
  );
}
