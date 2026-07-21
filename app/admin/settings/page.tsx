import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getSettings } from "@/lib/settingsService";
import { getSeoSettings } from "@/lib/seoService";
import SettingsForm from "./SettingsForm";

export default async function AdminSettingsPage() {
  // Check NextAuth session on server
  const session = await getServerSession(authOptions);

  if (!session || (session as { error?: string })?.error === "RefreshAccessTokenError") {
    redirect("/admin");
  }

  // Fetch settings & SEO configurations on the server
  const [settings, seo] = await Promise.all([
    getSettings(),
    getSeoSettings(),
  ]);

  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-b from-brand-navy-50/20 via-white to-brand-navy-50/10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SettingsForm settings={settings} seo={seo} />
      </div>
    </section>
  );
}
