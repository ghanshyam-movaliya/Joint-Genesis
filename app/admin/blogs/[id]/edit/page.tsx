import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { getDraftBlogs } from "@/services/draftService";
import BlogForm from "@/components/BlogForm";

export const dynamic = "force-dynamic";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  
  // Check NextAuth session on server
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin");
  }

  // Fetch blogs on the server to locate the target post in drafts
  const blogs = await getDraftBlogs();
  const post = blogs.find((b) => b.id === id) || null;

  if (!post) {
    notFound();
  }

  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-b from-brand-navy-50/20 via-white to-brand-navy-50/10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogForm post={post} />
      </div>
    </section>
  );
}
