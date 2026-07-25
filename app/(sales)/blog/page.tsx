import React from "react";
import type { Metadata } from "next";
import { getBlogs } from "@/lib/blogService";
import { getSettings } from "@/lib/settingsService";
import BlogListClient from "./BlogListClient";
import { BreadcrumbSchema, WebPageSchema } from "@/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const baseUrl = settings.websiteUrl || "https://www.jointgeneshis.com";

  return {
    title: "Joint Genesis™ Official Blog | Mobility & Joint Health Guides",
    description: "Discover evidence-based research articles, healthy aging guides, and joint preservation tips from the BioDynamix medical team.",
    keywords: [
      "Joint Genesis blog",
      "joint health guides",
      "synovial fluid research",
      "knee mobility tips",
      "hyaluronan for joints",
      "Dr. Mark Weis articles"
    ],
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      title: "Joint Genesis™ Official Blog | Joint Health & Mobility Guides",
      description: "Evidence-based articles on joint lubrication, cartilage protection, and active senior mobility.",
      url: `${baseUrl}/blog`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Joint Genesis™ Official Blog",
      description: "Joint health advice, synovial fluid science, and mobility guides.",
    },
  };
}

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([
    getBlogs(),
    getSettings(),
  ]);

  // Only display published blogs on public frontend listing
  const publishedPosts = posts.filter((p) => p.status === "published");

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebPageSchema
        name="Joint Genesis™ Official Blog"
        description="Evidence-based clinical articles, health resources, recipes, and news on natural joint preservation."
        url="/blog"
      />

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
              {settings.websiteName || "Joint Genesis™"} Blog & Health Guides
            </h1>
            <p className="text-sm sm:text-base text-brand-navy-600 leading-relaxed mt-4">
              Discover evidence-based clinical articles, health resources, recipes, and news on natural joint preservation and active mobility support.
            </p>
          </div>

          {/* Client-side Live Filter Grid */}
          <BlogListClient initialPosts={publishedPosts} />

        </div>
      </section>
    </>
  );
}
