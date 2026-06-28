"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save, Check } from "lucide-react";
import Link from "next/link";
import { WebsiteSettings } from "@/lib/settingsService";
import { SeoSettings } from "@/lib/seoService";
import { saveSettingsAction } from "@/actions/blog";

interface SettingsFormProps {
  settings: WebsiteSettings;
  seo: SeoSettings;
}

export default function SettingsForm({ settings, seo }: SettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Settings State
  const [websiteName, setWebsiteName] = useState(settings.websiteName);
  const [domain, setDomain] = useState(settings.domain);
  const [affiliateLink, setAffiliateLink] = useState(settings.affiliateLink);
  const [supportEmail, setSupportEmail] = useState(settings.supportEmail);
  const [supportPhone, setSupportPhone] = useState(settings.supportPhone);
  const [footerText, setFooterText] = useState(settings.footerText);
  const [defaultAuthor, setDefaultAuthor] = useState(settings.defaultAuthor);

  // SEO State
  const [defaultTitle, setDefaultTitle] = useState(seo.defaultTitle);
  const [defaultDescription, setDefaultDescription] = useState(seo.defaultDescription);
  const [defaultKeywords, setDefaultKeywords] = useState(seo.defaultKeywords.join(", "));
  const [googleVerification, setGoogleVerification] = useState(seo.googleVerification || "");
  const [bingVerification, setBingVerification] = useState(seo.bingVerification || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    const updatedSettings: WebsiteSettings = {
      websiteName,
      domain,
      affiliateLink,
      supportEmail,
      supportPhone,
      footerText,
      defaultAuthor,
    };

    const updatedSeo: SeoSettings = {
      defaultTitle,
      defaultDescription,
      defaultKeywords: defaultKeywords.split(",").map((k) => k.trim()).filter(Boolean),
      googleVerification,
      bingVerification,
    };

    try {
      const res = await saveSettingsAction(updatedSettings, updatedSeo);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        router.refresh();
      } else {
        setError(res.error || "Failed to update website configurations.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred while saving website settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Header save action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-brand-navy-100 pb-6">
        <div className="flex flex-col">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-black text-brand-primary-700 hover:text-brand-primary-800 transition-colors uppercase tracking-widest mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </Link>
          <h1 className="font-display font-extrabold text-3xl text-brand-navy-900 tracking-tight leading-tight">
            Global Website Settings
          </h1>
          <p className="text-xs text-brand-navy-500 font-semibold mt-1">
            Configure default settings written to Google Sheets spreadsheet.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 disabled:bg-brand-primary-400 text-xs font-black text-white rounded-xl shadow-sm hover:shadow transition-all w-full sm:w-auto active:scale-98 ${
            success ? "bg-emerald-600 hover:bg-emerald-700" : "bg-brand-primary-700 hover:bg-brand-primary-800"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving Settings...
            </>
          ) : success ? (
            <>
              <Check className="w-4 h-4" />
              Settings Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Settings
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-2xl">
          {error}
        </div>
      )}

      {/* Grid panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Panel 1: Site Contact & Details */}
        <div className="bg-white border border-brand-navy-100 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
          <h3 className="font-display font-black text-sm text-brand-navy-900 uppercase tracking-wide border-b border-brand-navy-50 pb-3">
            Contact & Product Settings
          </h3>

          {/* Website Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">Website Name</label>
            <input
              type="text"
              required
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Domain */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">Domain name</label>
            <input
              type="text"
              required
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Affiliate Link */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">Default Affiliate Hoplink</label>
            <input
              type="url"
              required
              value={affiliateLink}
              onChange={(e) => setAffiliateLink(e.target.value)}
              className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Support Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">Support Email Address</label>
            <input
              type="email"
              required
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Support Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">Support Phone Number</label>
            <input
              type="text"
              required
              value={supportPhone}
              onChange={(e) => setSupportPhone(e.target.value)}
              className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Default Author */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">Default Author</label>
            <input
              type="text"
              required
              value={defaultAuthor}
              onChange={(e) => setDefaultAuthor(e.target.value)}
              className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Footer Copyright Text */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">Footer Copyright Info</label>
            <textarea
              rows={2}
              required
              value={footerText}
              onChange={(e) => setFooterText(e.target.value)}
              className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner resize-none"
            />
          </div>

        </div>

        {/* Panel 2: Website SEO Default Settings */}
        <div className="bg-white border border-brand-navy-100 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
          <h3 className="font-display font-black text-sm text-brand-navy-900 uppercase tracking-wide border-b border-brand-navy-50 pb-3">
            Default SEO & Crawler Settings
          </h3>

          {/* Default SEO Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">Default Browser Title</label>
            <input
              type="text"
              required
              value={defaultTitle}
              onChange={(e) => setDefaultTitle(e.target.value)}
              className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Default Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">Default Meta Description</label>
            <textarea
              rows={4}
              required
              value={defaultDescription}
              onChange={(e) => setDefaultDescription(e.target.value)}
              className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner resize-none"
            />
          </div>

          {/* Default Keywords */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">Default Meta Keywords</label>
            <input
              type="text"
              required
              value={defaultKeywords}
              onChange={(e) => setDefaultKeywords(e.target.value)}
              className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Google Search Verification */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">Google Site Verification ID</label>
            <input
              type="text"
              placeholder="e.g. google-site-verification-token"
              value={googleVerification}
              onChange={(e) => setGoogleVerification(e.target.value)}
              className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Bing Verification */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">Bing Site Verification ID</label>
            <input
              type="text"
              placeholder="e.g. bing-site-verification-token"
              value={bingVerification}
              onChange={(e) => setBingVerification(e.target.value)}
              className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner"
            />
          </div>

        </div>

      </div>

    </form>
  );
}
