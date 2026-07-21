import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import BlogForm from "@/components/BlogForm";

export default async function NewBlogPage() {
  // Check NextAuth session on server
  const session = await getServerSession(authOptions);

  if (!session || (session as { error?: string })?.error === "RefreshAccessTokenError") {
    redirect("/admin");
  }

  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-b from-brand-navy-50/20 via-white to-brand-navy-50/10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogForm />
      </div>
    </section>
  );
}
