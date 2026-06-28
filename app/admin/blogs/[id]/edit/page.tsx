import React from "react";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { verifySessionToken } from "@/lib/authHelper";
import { getBlogs } from "@/lib/blogService";
import { getCategories } from "@/lib/categoryService";
import BlogForm from "@/components/BlogForm";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  
  // Await cookies in Next.js 15
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("jg_admin_session")?.value;
  const isAuth = sessionCookie ? verifySessionToken(sessionCookie) : false;

  if (!isAuth) {
    redirect("/admin");
  }

  // Fetch blogs on the server to locate the target post
  const blogs = await getBlogs();
  const post = blogs.find((b) => b.id === id) || null;

  if (!post) {
    notFound();
  }

  const categories = await getCategories();

  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-b from-brand-navy-50/20 via-white to-brand-navy-50/10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogForm post={post} categories={categories} />
      </div>
    </section>
  );
}
