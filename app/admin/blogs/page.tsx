import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getDraftBlogs } from "@/services/draftService";
import { ArrowLeft, Plus } from "lucide-react";
import AdminBlogList from "./AdminBlogList";
import fs from "fs";
import path from "path";
import AdminSignOutButton from "@/components/AdminSignOutButton";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  // Check NextAuth session on server
  const session = await getServerSession(authOptions);

  if (!session || (session as { error?: string })?.error === "RefreshAccessTokenError") {
    redirect("/admin");
  }

  // Fetch blogs on the server from the draft database
  const blogs = await getDraftBlogs();

  // Check if a deployment is currently running
  let isDeploymentRunning = false;
  try {
    const historyPath = path.join(process.cwd(), "data", "deploymentHistory.json");
    if (fs.existsSync(historyPath)) {
      const history = JSON.parse(fs.readFileSync(historyPath, "utf8") || "[]");
      if (history.length > 0) {
        isDeploymentRunning = history[0].status === "Building" || history[0].status === "Queued";
      }
    }
  } catch (e) {
    console.error("Failed to check active deployment status:", e);
  }

  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-b from-brand-navy-50/20 via-white to-brand-navy-50/10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header navigation bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-brand-navy-100 pb-6">
          <div className="flex flex-col">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-black text-brand-primary-700 hover:text-brand-primary-800 transition-colors uppercase tracking-widest mb-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Dashboard
            </Link>
            <h1 className="font-display font-extrabold text-3xl text-brand-navy-900 tracking-tight leading-tight animate-fade-in">
              Manage Blog Posts
            </h1>
            <p className="text-xs text-brand-navy-500 font-semibold mt-1">
              Read, edit, delete, or write articles inside Google Sheets.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {isDeploymentRunning ? (
              <div className="inline-flex items-center gap-1.5 px-5 py-3 bg-brand-navy-300 text-brand-navy-500 text-xs font-black rounded-xl cursor-not-allowed select-none">
                <Plus className="w-4 h-4" />
                Deployment Active - Creating Disabled
              </div>
            ) : (
              <Link
                href="/admin/blogs/new"
                className="inline-flex items-center gap-1.5 px-5 py-3 bg-brand-primary-700 hover:bg-brand-primary-800 text-xs font-black text-white rounded-xl shadow-sm hover:shadow transition-all active:scale-98"
              >
                <Plus className="w-4 h-4" />
                Create New Blog Post
              </Link>
            )}
            <AdminSignOutButton />
          </div>
        </div>

        {/* Banner if deployment is running */}
        {isDeploymentRunning && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold rounded-2xl flex items-center gap-2">
            <span className="animate-ping w-2 h-2 rounded-full bg-amber-500 mr-1 shrink-0" />
            A deployment is currently building on Vercel. Blog creation, edits, and deletions are disabled until it completes.
          </div>
        )}

        {/* Interactive Blog List Dashboard */}
        <AdminBlogList initialBlogs={blogs} isDeploymentRunning={isDeploymentRunning} />

      </div>
    </section>
  );
}
