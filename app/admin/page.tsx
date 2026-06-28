import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { getBlogs } from "@/lib/blogService";
import { getCategories } from "@/lib/categoryService";
import { FileText, Settings, Tags } from "lucide-react";
import RevalidateButton from "./RevalidateButton";
import AdminLoginForm from "@/components/AdminLoginForm";
import AdminSignOutButton from "@/components/AdminSignOutButton";

export default async function AdminPage() {
  // Check NextAuth session on server
  const session = await getServerSession(authOptions);

  // Render Login Panel if session is not authenticated
  if (!session) {
    return <AdminLoginForm />;
  }

  // Fetch Dashboard Stats on the Server from JSON Storage
  const [blogs, categories] = await Promise.all([
    getBlogs(),
    getCategories(),
  ]);

  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter((b) => b.status === "published").length;
  const draftBlogs = totalBlogs - publishedBlogs;

  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-b from-brand-navy-50/20 via-white to-brand-navy-50/10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header Panel */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-brand-navy-100 pb-8">
          <div>
            <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest mb-3">
              Management Dashboard
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 tracking-tight leading-tight">
              Welcome back, {session.user?.name || "Admin"}
            </h1>
            <p className="text-xs text-brand-navy-500 font-semibold mt-1">
              Google Session active | <span className="text-brand-primary-700">JSON Storage Layer</span>
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <RevalidateButton />
            <AdminSignOutButton />
          </div>
        </div>

        {/* Info Grid stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white border border-brand-navy-100 rounded-3xl p-6 shadow-sm flex flex-col gap-2">
            <span className="text-2xl font-black text-brand-primary-700">{totalBlogs}</span>
            <div>
              <h4 className="font-display font-extrabold text-sm text-brand-navy-900">Total Blog Posts</h4>
              <p className="text-xs text-brand-navy-500">Row count in local data/blogs.json file.</p>
            </div>
          </div>

          <div className="bg-white border border-brand-navy-100 rounded-3xl p-6 shadow-sm flex flex-col gap-2">
            <span className="text-2xl font-black text-emerald-600">{publishedBlogs}</span>
            <div>
              <h4 className="font-display font-extrabold text-sm text-brand-navy-900">Published Articles</h4>
              <p className="text-xs text-brand-navy-500">Live and indexed on search listings.</p>
            </div>
          </div>

          <div className="bg-white border border-brand-navy-100 rounded-3xl p-6 shadow-sm flex flex-col gap-2">
            <span className="text-2xl font-black text-amber-500">{draftBlogs}</span>
            <div>
              <h4 className="font-display font-extrabold text-sm text-brand-navy-900">Drafts / Unpublished</h4>
              <p className="text-xs text-brand-navy-500">Under revision, hidden from frontend.</p>
            </div>
          </div>

        </div>

        {/* Dashboard Management Navigation grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card: Blogs */}
          <div className="bg-white border border-brand-navy-100 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary-50 text-brand-primary-700 flex items-center justify-center shadow-inner">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg text-brand-navy-900">
                Blogs Manager
              </h3>
              <p className="text-xs sm:text-sm text-brand-navy-500 leading-relaxed mt-2">
                Create new posts, upload featured images to Google Drive, write markdown, set SEO tags, publish or delete articles.
              </p>
            </div>
            <Link
              href="/admin/blogs"
              className="w-full text-center py-3 bg-brand-primary-700 hover:bg-brand-primary-800 text-xs font-black text-white rounded-xl shadow-sm hover:shadow transition-all mt-auto"
            >
              Manage Blog Posts
            </Link>
          </div>

          {/* Card: Categories */}
          <div className="bg-white border border-brand-navy-100 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary-50 text-brand-primary-700 flex items-center justify-center shadow-inner">
              <Tags className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg text-brand-navy-900">
                Categories
              </h3>
              <p className="text-xs sm:text-sm text-brand-navy-500 leading-relaxed mt-2">
                View available tags dynamically loaded from your blogs JSON records. Current category count: <span className="font-bold text-brand-navy-900">{categories.length}</span>.
              </p>
            </div>
            <span className="text-center text-[10px] uppercase tracking-widest font-black text-brand-navy-400 py-3.5 bg-brand-navy-50 border border-brand-navy-100/50 rounded-xl mt-auto">
              Dynamic Category Schema Active
            </span>
          </div>

          {/* Card: Settings */}
          <div className="bg-white border border-brand-navy-100 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary-50 text-brand-primary-700 flex items-center justify-center shadow-inner">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg text-brand-navy-900">
                Global Settings
              </h3>
              <p className="text-xs sm:text-sm text-brand-navy-500 leading-relaxed mt-2">
                Configure global settings like Website Name, Affiliate Link redirect CTAs, support email/phone, and base SEO verification properties.
              </p>
            </div>
            <Link
              href="/admin/settings"
              className="w-full text-center py-3 bg-brand-navy-800 hover:bg-brand-navy-900 text-xs font-black text-white rounded-xl shadow-sm hover:shadow transition-all mt-auto"
            >
              Edit Global Settings
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
