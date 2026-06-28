import fs from "fs";
import path from "path";
import { commitToGitHub } from "./github";

// UI-compatible Post interface used across the website components
export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;          // Maps to seoDescription
  googleDriveImageUrl: string;  // Maps to image
  publishedAt: string;          // Maps to publishedDate
  categories: string[];         // Maps to [category]
  authorName: string;           // Maps to author
  readingTime: string;          // Maps to readingTime
  status: string;               // "published" or "draft"
  content: string;              // Markdown Content
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    ogImage?: string;
  };
}

// Internal JSON database storage layout
interface StoredBlog {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  publishedDate: string;
  readingTime: string;
  status: string;
  content: string;
}

const blogsFilePath = path.join(process.cwd(), "data", "blogs.json");

/**
 * Reads local blogs.json file from the disk
 */
function readBlogsFile(): StoredBlog[] {
  try {
    if (!fs.existsSync(blogsFilePath)) {
      return [];
    }
    const rawData = fs.readFileSync(blogsFilePath, "utf8");
    return JSON.parse(rawData || "[]");
  } catch (error) {
    console.error("Failed to read local blogs.json file:", error);
    return [];
  }
}

/**
 * Writes blogs list to the local disk and automatically pushes to GitHub
 */
async function saveAndCommitBlogs(blogs: StoredBlog[], commitMessage: string): Promise<void> {
  const jsonText = JSON.stringify(blogs, null, 2);
  
  // 1. Write locally so changes are reflected in local development immediately
  fs.writeFileSync(blogsFilePath, jsonText, "utf8");

  // 2. Commit and push changes directly to GitHub (triggers Vercel deploy)
  await commitToGitHub("data/blogs.json", jsonText, commitMessage);
}

/**
 * Maps StoredBlog database format to the UI-compatible Post format
 */
function mapStoredToPost(blog: StoredBlog): Post {
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    description: blog.seoDescription || "",
    googleDriveImageUrl: blog.image || "",
    publishedAt: blog.publishedDate || "",
    categories: blog.category ? [blog.category] : ["General"],
    authorName: blog.author || "Dr. Mark Weis",
    readingTime: blog.readingTime || "5 min read",
    status: blog.status || "draft",
    content: blog.content || "",
    seo: {
      metaTitle: blog.seoTitle || blog.title,
      metaDescription: blog.seoDescription || "",
      metaKeywords: blog.keywords || [],
      ogImage: blog.image || "",
    },
  };
}

/**
 * Maps UI Post layout back into the StoredBlog database layout
 */
function mapPostToStored(post: Post): StoredBlog {
  const category = post.categories?.[0] || "General";
  
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    category,
    author: post.authorName,
    image: post.googleDriveImageUrl,
    seoTitle: post.seo?.metaTitle || post.title,
    seoDescription: post.seo?.metaDescription || post.description,
    keywords: post.seo?.metaKeywords || [],
    publishedDate: post.publishedAt,
    readingTime: post.readingTime,
    status: post.status,
    content: post.content,
  };
}

/**
 * Get all blog posts from JSON storage
 */
export async function getBlogs(): Promise<Post[]> {
  const blogs = readBlogsFile();
  return blogs.map(mapStoredToPost);
}

/**
 * Fetch a single blog post by its slug path
 */
export async function getBlogBySlug(slug: string): Promise<Post | null> {
  const posts = await getBlogs();
  return posts.find((p) => p.slug === slug) || null;
}

/**
 * Create a new blog post
 */
export async function createBlog(
  blog: Omit<Post, "id" | "readingTime" | "content">,
  content: string
): Promise<Post> {
  const id = `blog_${Date.now()}`;

  // Automatically calculate reading time (avg 200 words per minute)
  const words = content.trim().split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.ceil(words / 200));
  const readingTime = `${readingMinutes} min read`;

  const newPost: Post = {
    ...blog,
    id,
    readingTime,
    content,
  };

  const blogs = readBlogsFile();
  const updatedStored = [...blogs, mapPostToStored(newPost)];

  await saveAndCommitBlogs(updatedStored, `feat(blog): create post "${blog.title}"`);

  return newPost;
}

/**
 * Update an existing blog post
 */
export async function updateBlog(
  id: string,
  updatedFields: Partial<Post>,
  content?: string
): Promise<void> {
  const blogs = readBlogsFile();
  const index = blogs.findIndex((b) => b.id === id);

  if (index === -1) {
    throw new Error(`Blog post with ID "${id}" was not found in JSON storage.`);
  }

  const currentStored = blogs[index];
  const currentPost = mapStoredToPost(currentStored);

  // Recalculate reading time if content is updated
  let readingTime = currentStored.readingTime;
  if (content !== undefined) {
    const words = content.trim().split(/\s+/).length;
    const readingMinutes = Math.max(1, Math.ceil(words / 200));
    readingTime = `${readingMinutes} min read`;
  }

  const mergedPost: Post = {
    id,
    title: updatedFields.title ?? currentPost.title,
    slug: updatedFields.slug ?? currentPost.slug,
    description: updatedFields.description ?? currentPost.description,
    googleDriveImageUrl: updatedFields.googleDriveImageUrl ?? currentPost.googleDriveImageUrl,
    publishedAt: updatedFields.publishedAt ?? currentPost.publishedAt,
    categories: updatedFields.categories ?? currentPost.categories,
    authorName: updatedFields.authorName ?? currentPost.authorName,
    readingTime,
    status: updatedFields.status ?? currentPost.status,
    content: content ?? currentPost.content,
    seo: {
      metaTitle: updatedFields.seo?.metaTitle ?? currentPost.seo?.metaTitle ?? currentPost.title,
      metaDescription: updatedFields.seo?.metaDescription ?? currentPost.seo?.metaDescription ?? currentPost.description,
      metaKeywords: updatedFields.seo?.metaKeywords ?? currentPost.seo?.metaKeywords ?? currentPost.seo?.metaKeywords ?? [],
      ogImage: updatedFields.googleDriveImageUrl ?? currentPost.googleDriveImageUrl,
    },
  };

  blogs[index] = mapPostToStored(mergedPost);

  await saveAndCommitBlogs(blogs, `chore(blog): update post "${mergedPost.title}"`);
}

/**
 * Delete a blog post
 */
export async function deleteBlog(id: string): Promise<void> {
  const blogs = readBlogsFile();
  const target = blogs.find((b) => b.id === id);

  if (!target) {
    throw new Error(`Blog post with ID "${id}" was not found.`);
  }

  const filteredBlogs = blogs.filter((b) => b.id !== id);

  await saveAndCommitBlogs(filteredBlogs, `refactor(blog): delete post "${target.title}"`);
}

/**
 * Query related posts matching categories
 */
export async function getRelatedPosts(currentSlug: string, categories: string[]): Promise<Post[]> {
  const posts = await getBlogs();
  const lowerCategories = categories.map((c) => c.toLowerCase());

  return posts
    .filter(
      (p) =>
        p.status === "published" &&
        p.slug !== currentSlug &&
        p.categories.some((c) => lowerCategories.includes(c.toLowerCase()))
    )
    .slice(0, 3);
}

/**
 * Fetches dynamic list of categories based on existing posts (avoiding hardcoded Category sheet calls)
 */
export async function getCategories(): Promise<string[]> {
  const posts = await getBlogs();
  const categorySet = new Set<string>();
  
  posts.forEach((post) => {
    post.categories.forEach((cat) => categorySet.add(cat));
  });

  if (categorySet.size === 0) {
    return ["Joint Care", "Natural Health", "Science", "Nutrition", "Healthy Living"];
  }

  return Array.from(categorySet);
}
