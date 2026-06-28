import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface PostCardProps {
  post: {
    title: string;
    slug: string;
    description: string;
    mainImage?: string;
    googleDriveImageUrl?: string;
    publishedAt: string;
    categories?: string[];
    authorName?: string;
    readingTime?: string;
  };
}

export default function BlogCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-brand-navy-100/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
      {/* Article Image */}
      <div className="relative aspect-video w-full bg-brand-navy-100 overflow-hidden">
        {(post.googleDriveImageUrl || post.mainImage) ? (
          <Image
            src={post.googleDriveImageUrl || post.mainImage || ""}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-primary-50 text-brand-primary-700 font-display font-black text-xl">
            Joint Genesis™ Blog
          </div>
        )}
        
        {/* Category Badge */}
        {post.categories && post.categories.length > 0 && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black text-white bg-brand-primary-700 uppercase tracking-widest shadow-sm">
              {post.categories[0]}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs font-bold text-brand-navy-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime || "5 min read"}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-extrabold text-lg text-brand-navy-900 leading-tight group-hover:text-brand-primary-700 transition-colors duration-200 mb-2 line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="focus:outline-none">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-brand-navy-500 leading-relaxed mb-6 line-clamp-3">
          {post.description}
        </p>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-brand-navy-100/50 pt-4 mt-auto">
          <span className="text-xs font-bold text-brand-navy-600">
            By {post.authorName || "Editorial Team"}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-black text-brand-primary-700 group-hover:text-brand-primary-800 transition-colors"
          >
            Read More
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
