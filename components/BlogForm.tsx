"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { Post } from "@/lib/blogService";
import { saveBlogAction } from "@/actions/blog";
import ImageUploader from "@/components/ImageUploader";
import { cn } from "@/lib/utils";
import AdminSignOutButton from "@/components/AdminSignOutButton";

interface BlogFormProps {
  post?: Post | null; // Null if creating new blog
}

export default function BlogForm({ post }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeploymentRunning, setIsDeploymentRunning] = useState(false);

  // Map database status to form dropdown options (draft, published, archived)
  const getInitialFormStatus = (statusStr: string): string => {
    if (statusStr === "pending_publish" || statusStr === "pending_update" || statusStr === "published") {
      return "published";
    }
    if (statusStr === "archived") {
      return "archived";
    }
    return "draft";
  };

  // Form Fields State
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [imageUrl, setImageUrl] = useState(post?.googleDriveImageUrl || "");
  const [seoTitle, setSeoTitle] = useState(post?.seo?.metaTitle || "");
  const [seoDescription, setSeoDescription] = useState(post?.seo?.metaDescription || "");
  const [keywords, setKeywords] = useState(post?.seo?.metaKeywords?.join(", ") || "");
  const [content, setContent] = useState(post?.content || "");
  const [publishedDate, setPublishedDate] = useState(
    post?.publishedAt || new Date().toISOString().split("T")[0]
  );
  const [status, setStatus] = useState(getInitialFormStatus(post?.status || "draft"));

  // Check on mount if a deployment is currently running
  useEffect(() => {
    const checkDeployment = async () => {
      try {
        const { getAdminDashboardDataAction } = await import("@/actions/blog");
        const res = await getAdminDashboardDataAction();
        if (res.success && res.isDeploymentRunning) {
          setIsDeploymentRunning(true);
        }
      } catch (err) {
        console.error("Failed to fetch deployment status in form:", err);
      }
    };
    checkDeployment();
  }, []);

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!post) {
      // Auto slugify title if we are creating a new post
      const slugified = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(slugified);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDeploymentRunning) return;

    if (!title || !slug || !content) {
      setError("Please fill out all required fields: Title, Slug, and Content.");
      return;
    }

    setLoading(true);
    setError(null);

    const postData = {
      title,
      slug,
      description: seoDescription || title,
      googleDriveImageUrl: imageUrl,
      publishedAt: publishedDate,
      authorName: "Editorial Team",
      status, // Will be "draft", "published", or "archived" in form, mapped in draftService
      seo: {
        metaTitle: seoTitle || title,
        metaDescription: seoDescription || title,
        metaKeywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
        ogImage: imageUrl,
      },
    };

    try {
      const res = await saveBlogAction(post?.id || null, postData, content);
      if (res.success) {
        router.push("/admin/blogs");
        router.refresh();
      } else {
        setError(res.error || "Failed to save the blog post.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Save panel and title heading */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-brand-navy-100 pb-6">
        <div className="flex flex-col">
          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-black text-brand-primary-700 hover:text-brand-primary-800 transition-colors uppercase tracking-widest mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Blogs List
          </Link>
          <h1 className="font-display font-extrabold text-3xl text-brand-navy-900 tracking-tight leading-tight">
            {post ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="submit"
            disabled={loading || isDeploymentRunning}
            style={{ cursor: (loading || isDeploymentRunning) ? "not-allowed" : "pointer" }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-primary-700 hover:bg-brand-primary-800 disabled:bg-brand-primary-400 text-xs font-black text-white rounded-xl shadow-sm hover:shadow transition-all w-full sm:w-auto active:scale-98"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving Post...
              </>
            ) : isDeploymentRunning ? (
              <>
                <Save className="w-4 h-4" />
                Locked - Deploying...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Blog Post
              </>
            )}
          </button>
          <AdminSignOutButton />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-2xl">
          {error}
        </div>
      )}

      {isDeploymentRunning && (
        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold rounded-2xl flex items-center gap-2">
          <span className="animate-ping w-2 h-2 rounded-full bg-amber-500 mr-1 shrink-0" />
          A deployment is currently building on Vercel. Form modifications are disabled until it completes.
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Post Fields */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          <div className="bg-white border border-brand-navy-100 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
            <h3 className="font-display font-black text-sm text-brand-navy-900 uppercase tracking-wide border-b border-brand-navy-50 pb-3">
              Post Content
            </h3>
            
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                disabled={isDeploymentRunning}
                placeholder="Enter blog title..."
                value={title}
                onChange={handleTitleChange}
                className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner disabled:opacity-50"
              />
            </div>

            {/* Slug */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">
                Slug URL Path <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                disabled={isDeploymentRunning}
                placeholder="e.g. natural-joint-pain-remedies"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner disabled:opacity-50"
              />
            </div>

            {/* Content (Markdown) */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">
                  Markdown Body Content <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-brand-navy-400 font-semibold">Supports full markdown syntax</span>
              </div>
              <textarea
                required
                rows={16}
                disabled={isDeploymentRunning}
                placeholder="Write your article in Markdown..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-mono text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner resize-y leading-relaxed disabled:opacity-50"
              />
            </div>

          </div>

          {/* SEO Metadata Card */}
          <div className="bg-white border border-brand-navy-100 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
            <h3 className="font-display font-black text-sm text-brand-navy-900 uppercase tracking-wide border-b border-brand-navy-50 pb-3">
              SEO Parameters
            </h3>

            {/* SEO Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">
                SEO Page Title
              </label>
              <input
                type="text"
                disabled={isDeploymentRunning}
                placeholder="Defaults to Post Title if empty..."
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner disabled:opacity-50"
              />
            </div>

            {/* SEO Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">
                SEO Meta Description
              </label>
              <textarea
                rows={3}
                disabled={isDeploymentRunning}
                placeholder="Enter search snippet summary..."
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner resize-none disabled:opacity-50"
              />
            </div>

            {/* Keywords */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">
                Keywords (comma separated)
              </label>
              <input
                type="text"
                disabled={isDeploymentRunning}
                placeholder="joint health, Mobilee, pain relief"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner disabled:opacity-50"
              />
            </div>

          </div>

        </div>

        {/* Right Column: Settings, Images & Metadata */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Featured Image */}
          <div className="bg-white border border-brand-navy-100 rounded-3xl p-6 shadow-sm">
            <ImageUploader
              value={imageUrl}
              onChange={(url) => setImageUrl(url)}
              onRemove={() => setImageUrl("")}
              label="Featured Image (Google Drive)"
            />
          </div>

          {/* Settings panel */}
          <div className="bg-white border border-brand-navy-100 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
            <h3 className="font-display font-black text-sm text-brand-navy-900 uppercase tracking-wide border-b border-brand-navy-50 pb-3">
              Publish Settings
            </h3>

            {/* Status */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">
                Status
              </label>
              <select
                value={status}
                disabled={isDeploymentRunning}
                onChange={(e) => setStatus(e.target.value)}
                className="px-3 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-xs font-bold text-brand-navy-700 focus:outline-none focus:border-brand-primary-600 focus:bg-white cursor-pointer disabled:opacity-50"
              >
                <option value="draft">Draft (Hidden)</option>
                <option value="published">Published (Live)</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Published Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-brand-navy-700 uppercase tracking-wider">
                Publish Date
              </label>
              <input
                type="date"
                disabled={isDeploymentRunning}
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                className="px-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner disabled:opacity-50"
              />
            </div>

          </div>

        </div>

      </div>

    </form>
  );
}
