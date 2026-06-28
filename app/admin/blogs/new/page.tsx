import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/authHelper";
import { getCategories } from "@/lib/categoryService";
import BlogForm from "@/components/BlogForm";

export default async function NewBlogPage() {
  // Await cookies in Next.js 15
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("jg_admin_session")?.value;
  const isAuth = sessionCookie ? verifySessionToken(sessionCookie) : false;

  if (!isAuth) {
    redirect("/admin");
  }

  const categories = await getCategories();

  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-b from-brand-navy-50/20 via-white to-brand-navy-50/10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogForm categories={categories} />
      </div>
    </section>
  );
}
