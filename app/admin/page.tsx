import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { verifySessionToken } from "@/lib/authHelper";
import { getBlogs } from "@/lib/blogService";
import { getCategories } from "@/lib/categoryService";
import { FileText, Settings, Tags, Lock, AlertTriangle, LogOut } from "lucide-react";
import RevalidateButton from "./RevalidateButton";

interface AdminPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const { error } = await searchParams;
  
  // Await cookies helper in Next.js 15
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("jg_admin_session")?.value;
  const adminEmail = sessionCookie ? verifySessionToken(sessionCookie) : null;

  // Render Login Panel if session is not authenticated
  if (!adminEmail) {
    let errorMessage = "";
    if (error === "Unauthorized") {
      errorMessage = "Access denied: Your Google account email is not authorized to access this admin panel.";
    } else if (error === "AuthExchangeFailed" || error === "AuthFailed") {
      errorMessage = "Authentication failed: An error occurred during sign-in. Please try again.";
    } else if (error === "NoEmail") {
      errorMessage = "Failed to retrieve your email address from your Google profile.";
    }

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
            Admin Panel Login
          </h2>
          <p className="mt-2 text-center text-xs sm:text-sm text-brand-navy-300">
            Sign in with your authorized Google Account to manage the website content.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="bg-white border border-brand-navy-900/50 py-10 px-6 sm:px-10 rounded-[32px] shadow-2xl flex flex-col gap-6">
            
            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-700 text-xs font-bold rounded-2xl flex gap-2.5 items-start">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-primary-50 flex items-center justify-center text-brand-primary-700 shadow-inner">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-brand-navy-900 uppercase tracking-wide">
                  Secure Access ONLY
                </h4>
                <p className="text-xs text-brand-navy-500 mt-1 max-w-[240px] mx-auto leading-relaxed">
                  Only authorized admin accounts can read/write data in Google Sheets.
                </p>
              </div>
            </div>

            <a
              href="/api/auth/login"
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 border border-brand-navy-200 rounded-2xl bg-white hover:bg-brand-navy-50 text-sm font-extrabold text-brand-navy-800 transition-all shadow-sm hover:shadow-md active:scale-98"
            >
              {/* Google Icon SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Sign In with Google
            </a>

          </div>
        </div>
      </section>
    );
  }

  // Fetch Dashboard Stats on the Server
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
              Welcome back, Admin
            </h1>
            <p className="text-xs text-brand-navy-500 font-semibold mt-1">
              Signed in as: <span className="text-brand-primary-700">{adminEmail}</span>
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <RevalidateButton />
            <a
              href="/api/auth/logout"
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-red-200 rounded-xl bg-white hover:bg-red-50 text-xs font-bold text-red-600 hover:text-red-700 transition-colors shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </a>
          </div>
        </div>

        {/* Info Grid stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white border border-brand-navy-100 rounded-3xl p-6 shadow-sm flex flex-col gap-2">
            <span className="text-2xl font-black text-brand-primary-700">{totalBlogs}</span>
            <div>
              <h4 className="font-display font-extrabold text-sm text-brand-navy-900">Total Blog Posts</h4>
              <p className="text-xs text-brand-navy-500">Row count in Google Sheets Blogs tab.</p>
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
                View available tags dynamically loaded from the Categories sheet. Current category count: <span className="font-bold text-brand-navy-900">{categories.length}</span>.
              </p>
            </div>
            <span className="text-center text-[10px] uppercase tracking-widest font-black text-brand-navy-400 py-3.5 bg-brand-navy-50 border border-brand-navy-100/50 rounded-xl mt-auto">
              Category Schema Active
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
