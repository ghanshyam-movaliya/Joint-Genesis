"use client";

import React, { useState } from "react";
import { RefreshCw, Check } from "lucide-react";
import { revalidateCacheAction } from "@/actions/blog";

export default function RevalidateButton() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRevalidate = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      const res = await revalidateCacheAction();
      if (res.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert(res.error || "Failed to clear website cache.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during revalidation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRevalidate}
      disabled={loading}
      className={`inline-flex items-center gap-1.5 px-4 py-2 border rounded-xl text-xs font-bold transition-all shadow-sm ${
        success
          ? "bg-emerald-50 border-emerald-200 text-emerald-700 font-extrabold"
          : "bg-brand-primary-700 hover:bg-brand-primary-800 border-brand-primary-800 text-white hover:shadow"
      }`}
    >
      {success ? (
        <>
          <Check className="w-3.5 h-3.5" />
          Cache Revalidated!
        </>
      ) : (
        <>
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Revalidating..." : "Clear Cache / Revalidate"}
        </>
      )}
    </button>
  );
}
