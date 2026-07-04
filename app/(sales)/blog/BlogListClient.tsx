"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import { Post } from "@/lib/blogService";

interface BlogListClientProps {
  initialPosts: Post[];
}

export default function BlogListClient({ initialPosts }: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = initialPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="flex flex-col gap-10">
      {/* Search Control */}
      <div className="flex justify-center items-center bg-white border border-brand-navy-100 rounded-3xl p-6 shadow-sm max-w-xl mx-auto w-full">
        
        {/* Search Bar Input */}
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-4 flex items-center text-brand-navy-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-brand-navy-50 border border-brand-navy-100 rounded-xl text-sm font-medium text-brand-navy-900 placeholder-brand-navy-400 focus:outline-none focus:border-brand-primary-600 focus:bg-white transition-all shadow-inner"
          />
        </div>

      </div>

      {/* Blog Cards Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-brand-navy-100 rounded-3xl p-8 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-brand-navy-50 flex items-center justify-center mx-auto mb-4 text-brand-navy-400 text-2xl">
            🔍
          </div>
          <h3 className="font-display font-extrabold text-lg text-brand-navy-900">
            No articles found
          </h3>
          <p className="text-sm text-brand-navy-500 max-w-xs mx-auto mt-2 leading-relaxed">
            We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo;. Try another search term or filter.
          </p>
        </div>
      )}
    </div>
  );
}
