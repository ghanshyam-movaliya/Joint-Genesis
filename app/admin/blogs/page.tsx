import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifySessionToken } from "@/lib/authHelper";
import { getBlogs } from "@/lib/blogService";
import { getCategories } from "@/lib/categoryService";
import { ArrowLeft, Plus } from "lucide-react";
import AdminBlogList from "./AdminBlogList";

export default async function AdminBlogsPage() {
  // Await cookies in Next.js 15
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("jg_admin_session")?.value;
  const adminEmail = sessionCookie ? verifySessionToken(sessionCookie) : null;

  if (!adminEmail) {
    redirect("/admin");
  }

  // Fetch blogs & categories on the server
  const [blogs, categories] = await Promise.all([
    getBlogs(),
    getCategories(),
  ]);

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

          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-1.5 px-5 py-3 bg-brand-primary-700 hover:bg-brand-primary-800 text-xs font-black text-white rounded-xl shadow-sm hover:shadow transition-all active:scale-98"
          >
            <Plus className="w-4 h-4" />
            Create New Blog Post
          </Link>
        </div>

        {/* Interactive Blog List Dashboard */}
        <AdminBlogList initialBlogs={blogs} categories={categories} />

      </div>
    </section>
  );
}
