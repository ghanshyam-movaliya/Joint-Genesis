"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail("");
    }, 1200);
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary-200/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-brand-navy-900 to-brand-navy-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl border border-white/10 overflow-hidden">
          {/* Subtle pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-primary-900/30 via-transparent to-transparent opacity-60 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
            <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-400 bg-brand-primary-950/80 border border-brand-primary-800 uppercase tracking-widest mb-4">
              Joint Health Newsletter
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3.5xl text-white tracking-tight leading-tight mb-4">
              Get Scientific Joint Care Tips
            </h2>
            <p className="text-sm sm:text-base text-brand-navy-300 leading-relaxed mb-8">
              Join 12,000+ readers. Get verified medical tips for maintaining synovial fluid, flexibility, and cartilage health directly to your inbox.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center gap-3 bg-brand-primary-950/50 border border-brand-primary-500/30 rounded-2xl p-6 w-full max-w-md animate-fade-in">
                <CheckCircle2 className="w-8 h-8 text-brand-primary-400" />
                <div>
                  <h4 className="font-display font-bold text-base text-white">
                    Subscription Confirmed!
                  </h4>
                  <p className="text-xs text-brand-navy-300 mt-1">
                    Thank you for subscribing. Check your inbox for your first newsletter soon.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="flex flex-col sm:flex-row gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl focus-within:border-brand-primary-500/50 focus-within:ring-2 focus-within:ring-brand-primary-500/20 transition-all">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="flex-1 px-4 py-3 bg-transparent border-0 outline-none text-sm text-white placeholder-brand-navy-400 focus:ring-0 w-full"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-brand-navy-950 bg-brand-primary-400 hover:bg-brand-primary-300 active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-brand-navy-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Subscribe
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[10px] text-brand-navy-400 mt-3">
                  We respect your privacy. Unsubscribe at any time. No spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
