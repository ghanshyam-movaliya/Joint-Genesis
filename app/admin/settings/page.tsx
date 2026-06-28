import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/authHelper";
import { getSettings } from "@/lib/settingsService";
import { getSeoSettings } from "@/lib/seoService";
import SettingsForm from "./SettingsForm";

export default async function AdminSettingsPage() {
  // Await cookies in Next.js 15
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("jg_admin_session")?.value;
  const adminEmail = sessionCookie ? verifySessionToken(sessionCookie) : null;

  if (!adminEmail) {
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
