import React from "react";
import type { Metadata } from "next";
import { getBlogs } from "@/lib/blogService";
import { getCategories } from "@/lib/categoryService";
import { getSettings } from "@/lib/settingsService";
import { getSeoSettings } from "@/lib/seoService";
import BlogListClient from "./BlogListClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();
  const settings = await getSettings();

  return {
    title: `Preservation Tips & News | ${settings.websiteName}`,
    description: seo.defaultDescription,
    keywords: seo.defaultKeywords,
    openGraph: {
      title: seo.defaultTitle,
      description: seo.defaultDescription,
      images: [],
    },
  };
}

export default async function BlogPage() {
  const [posts, categories, settings] = await Promise.all([
    getBlogs(),
    getCategories(),
    getSettings(),
  ]);

  // Only display published blogs on public frontend listing
  const publishedPosts = posts.filter((p) => p.status === "published");

  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-b from-brand-primary-50/70 via-white to-brand-navy-50/30 min-h-screen">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand-primary-200/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-brand-accent-200/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Blog Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest mb-4">
            Joint Genesis™ Publications
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-navy-900 leading-tight tracking-tight drop-shadow-sm">
            {settings.websiteName} Blog
          </h1>
          <p className="text-sm sm:text-base text-brand-navy-600 leading-relaxed mt-4">
            Discover evidence-based clinical articles, health resources, recipes, and news on natural joint preservation and active mobility support.
          </p>
        </div>

        {/* Client-side Live Filter Grid */}
        <BlogListClient initialPosts={publishedPosts} categories={categories} />

      </div>
    </section>
  );
}
