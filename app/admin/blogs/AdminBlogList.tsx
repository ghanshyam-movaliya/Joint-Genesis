"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Edit2, Trash2, Loader2, Calendar, FileText } from "lucide-react";
import { Post } from "@/lib/blogService";
import { deleteBlogAction } from "@/actions/blog";
import { cn } from "@/lib/utils";

interface AdminBlogListProps {
  initialBlogs: Post[];
  isDeploymentRunning?: boolean;
}

export default function AdminBlogList({ initialBlogs, isDeploymentRunning = false }: AdminBlogListProps) {
  const [blogs, setBlogs] = useState<Post[]>(initialBlogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      searchQuery === "" ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const handleDelete = async (id: string, slug: string) => {
    if (isDeploymentRunning) return;

    if (!confirm("Are you sure you want to delete this blog post? It will be marked as 'Pending Delete' and permanently removed on the next Publish.")) {
      return;
    }

    setDeletingId(id);

    try {
      const res = await deleteBlogAction(id, slug);
      if (res.success) {
        // Update list status to pending_delete or filter out if it was a draft
        setBlogs(blogs.map((b) => {
          if (b.id === id) {
            const isLocalDraft = !initialBlogs.some((ib) => ib.id === id && ib.status === "published");
            return {
              ...b,
              status: isLocalDraft ? "deleted" : "pending_delete"
            };
          }
          return b;
        }).filter(b => b.status !== "deleted"));
      } else {
        alert(res.error || "Failed to delete the post.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during deletion.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Search panel */}
      <div className="bg-white border border-brand-navy-100 rounded-3xl p-5 shadow-sm">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-3.5 flex items-center text-brand-navy-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 placeholder-brand-navy-400 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Blogs Table / List */}
      <div className="bg-white border border-brand-navy-100 rounded-3xl overflow-hidden shadow-sm">
        {filteredBlogs.length > 0 ? (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-navy-50/50 border-b border-brand-navy-100/80 text-[10px] uppercase tracking-widest font-black text-brand-navy-500">
                  <th className="py-4 px-6">Image</th>
                  <th className="py-4 px-6">Post Details</th>
                  <th className="py-4 px-6">Published Date</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy-100/50 text-sm text-brand-navy-700">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-brand-navy-50/20 transition-colors">
                    {/* Image Thumbnail */}
                    <td className="py-4 px-6">
                      <div className="w-16 aspect-video bg-brand-navy-100 rounded-lg overflow-hidden border border-brand-navy-200/50 relative">
                        {blog.googleDriveImageUrl ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={blog.googleDriveImageUrl}
                            alt=""
                            className="object-cover w-full h-full"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-brand-navy-100 text-[10px] text-brand-navy-400 font-bold">
                            No Img
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Post Details */}
                    <td className="py-4 px-6 max-w-xs sm:max-w-sm md:max-w-md">
                      <div className="flex flex-col">
                        <Link
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          className="font-display font-extrabold text-sm text-brand-navy-900 hover:text-brand-primary-700 transition-colors line-clamp-1"
                        >
                          {blog.title}
                        </Link>
                        <span className="text-[10px] text-brand-navy-400 font-medium mt-1">
                          Slug: {blog.slug}
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-xs font-semibold text-brand-navy-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {blog.publishedAt}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6 text-center">
                      {(() => {
                        let classes = "bg-gray-50 border border-gray-200 text-gray-500";
                        let label = blog.status;
                        
                        if (blog.status === "published") {
                          classes = "bg-emerald-50 border border-emerald-200 text-emerald-600";
                        } else if (blog.status === "draft") {
                          classes = "bg-gray-100 border border-gray-300 text-gray-600";
                        } else if (blog.status === "archived") {
                          classes = "bg-blue-50 border border-blue-200 text-blue-600";
                        } else if (blog.status === "pending_publish") {
                          classes = "bg-purple-50 border border-purple-200 text-purple-600";
                          label = "Pending Publish";
                        } else if (blog.status === "pending_update") {
                          classes = "bg-amber-50 border border-amber-200 text-amber-600";
                          label = "Pending Update";
                        } else if (blog.status === "pending_delete") {
                          classes = "bg-rose-50 border border-rose-200 text-rose-600";
                          label = "Pending Delete";
                        } else if (blog.status === "deleted") {
                          classes = "bg-red-50 border border-red-200 text-red-600";
                        }

                        return (
                          <span className={cn("inline-flex px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider", classes)}>
                            {label}
                          </span>
                        );
                      })()}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <Link
                          href={`/admin/blogs/${blog.id}/edit`}
                          className={cn(
                            "p-2 border border-brand-navy-200 rounded-xl hover:bg-brand-navy-50 text-brand-navy-600 hover:text-brand-navy-800 transition-colors shadow-sm",
                            isDeploymentRunning && "pointer-events-none opacity-50 bg-gray-100 border-gray-200 cursor-not-allowed"
                          )}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id, blog.slug)}
                          disabled={isDeploymentRunning || deletingId === blog.id}
                          className={cn(
                            "p-2 border border-red-200 rounded-xl hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors shadow-sm disabled:opacity-50",
                            isDeploymentRunning && "cursor-not-allowed bg-gray-100 border-gray-200 text-gray-400 hover:bg-gray-100"
                          )}
                        >
                          {deletingId === blog.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 px-8">
            <div className="w-16 h-16 rounded-full bg-brand-navy-50 flex items-center justify-center mx-auto mb-4 text-brand-navy-400 text-2xl">
              <FileText className="w-6 h-6 text-brand-navy-400" />
            </div>
            <h3 className="font-display font-extrabold text-base text-brand-navy-900">
              No blog posts found
            </h3>
            <p className="text-xs sm:text-sm text-brand-navy-500 max-w-xs mx-auto mt-2 leading-relaxed">
              We couldn&apos;t find any posts matching &ldquo;{searchQuery}&rdquo;. Try another search keyword or create a new blog post.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
