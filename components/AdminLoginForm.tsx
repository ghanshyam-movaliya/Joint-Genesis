"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, AlertTriangle } from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Authentication failed. Incorrect password.");
      }
    } catch (err) {
      console.error("Login request failed:", err);
      setError("An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-brand-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient radial lights */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary-950/40 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-accent-950/20 blur-3xl rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <span className="font-display font-black text-2xl tracking-wider text-white">
          Joint Genesis™
        </span>
        <h2 className="mt-4 text-center font-display font-extrabold text-3xl text-white tracking-tight leading-tight">
          Admin Dashboard
        </h2>
        <p className="mt-2 text-center text-xs sm:text-sm text-brand-navy-300">
          Enter your administrator password to unlock website settings.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white border border-brand-navy-900/50 py-10 px-6 sm:px-10 rounded-[32px] shadow-2xl">
          
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-700 text-xs font-bold rounded-2xl flex gap-2.5 items-start">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col items-center gap-4 text-center mb-2">
              <div className="w-16 h-16 rounded-2xl bg-brand-primary-50 flex items-center justify-center text-brand-primary-700 shadow-inner">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-brand-navy-900 uppercase tracking-wide">
                  Password Required
                </h4>
                <p className="text-xs text-brand-navy-500 mt-1 max-w-[240px] mx-auto leading-relaxed">
                  Provide your `ADMIN_PASSWORD` credential to authenticate.
                </p>
              </div>
            </div>

            {/* Password input */}
            <div className="flex flex-col gap-1.5">
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-2xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner text-center"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-primary-850 rounded-2xl bg-brand-primary-700 hover:bg-brand-primary-800 text-sm font-extrabold text-white transition-all shadow-sm hover:shadow-md active:scale-98 disabled:bg-brand-primary-400"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Unlock Dashboard"
              )}
            </button>

          </form>

        </div>
      </div>
    </section>
  );
}
