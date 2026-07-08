import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ChevronLeft } from "lucide-react";

import { getBlogBySlug, getRelatedPosts } from "@/lib/blogService";
import ShareButtons from "@/components/ShareButtons";
import BlogCard from "@/components/BlogCard";
import TOC from "@/components/TOC";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Helper to parse headings for the Table of Contents from markdown text
function extractHeadingsFromMarkdown(markdown: string) {
  if (!markdown) return [];
  const lines = markdown.split("\n");
  const headings: { id: string; text: string; level: number }[] = [];

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ") || trimmed.startsWith("### ")) {
      const isH2 = trimmed.startsWith("## ");
      const text = trimmed.replace(/^#{2,3}\s+/, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      headings.push({ id, text, level: isH2 ? 2 : 3 });
    }
  });

  return headings;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  
  if (!post) {
    return {
      title: "Article Not Found | Joint Genesis™ Blog",
    };
  }

  const seo = post.seo;
  const title = seo?.metaTitle || `${post.title} | Joint Genesis™ Blog`;
  const description = seo?.metaDescription || post.description;

  return {
    title,
    description,
    keywords: seo?.metaKeywords || ["Joint Genesis Blog", "joint health tips", "synovial fluid", "mobility and flexibility"],
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["BioDynamix Editorial"],
      images: seo?.ogImage 
        ? [{ url: seo.ogImage }] 
        : (post.googleDriveImageUrl ? [{ url: post.googleDriveImageUrl }] : []),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Extract headings from the loaded markdown content
  const headings = extractHeadingsFromMarkdown(post.content || "");

  return (
    <article className="relative pt-32 pb-24 overflow-hidden bg-brand-navy-50/20 min-h-screen">
      {/* Background ambient radial light */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand-primary-200/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-brand-accent-200/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-navy-600 hover:text-brand-primary-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        {/* Article Title Header */}
        <header className="max-w-4xl mx-auto text-center lg:text-left mb-12 flex flex-col gap-4">


          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-brand-navy-900 leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Date Meta block */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-bold text-brand-navy-500 mt-2 border-y border-brand-navy-100/60 py-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-primary-600" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-primary-600" />
              {post.readingTime || "6 min read"}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto aspect-video w-full relative rounded-3xl overflow-hidden shadow-lg border border-brand-navy-100 mb-16 bg-brand-navy-50">
          {post.googleDriveImageUrl ? (
            <Image
              src={post.googleDriveImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-brand-primary-50 text-brand-primary-700 font-display font-black text-2xl sm:text-3xl">
              Joint Genesis™ Blog
            </div>
          )}
        </div>

        {/* 3-Column Page Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Table of Contents (Sticky on Desktop) */}
          <aside className="lg:col-span-3 sticky top-28 hidden lg:block">
            <TOC headings={headings} />
          </aside>

          {/* Middle Column: Blog Body Text */}
          <main className="lg:col-span-7 bg-white border border-brand-navy-100 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="prose prose-brand max-w-none">
              <MarkdownRenderer content={post.content || ""} />
            </div>
          </main>

          {/* Right Column: Share buttons / Meta */}
          <aside className="lg:col-span-2 flex flex-col gap-6 sticky top-28">
            <ShareButtons title={post.title} />
          </aside>

        </div>



        {/* Related Articles list */}
        {relatedPosts.length > 0 && (
          <div className="max-w-6xl mx-auto mt-24 border-t border-brand-navy-100 pt-16">
            <h3 className="font-display font-extrabold text-2xl text-brand-navy-900 mb-8 text-center lg:text-left">
              Related Articles You Might Like
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
