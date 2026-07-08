import fs from "fs";
import path from "path";
import { Post } from "@/lib/blogService";

export interface StoredBlog {
  id: string;
  slug: string;
  title: string;
  author: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  publishedDate: string;
  readingTime: string;
  status: string; // "published" | "draft" | "archived" | "deleted" | "pending_publish" | "pending_delete" | "pending_update"
  content: string;
}

const blogsFilePath = path.join(process.cwd(), "data", "blogs.json");
const draftsFilePath = path.join(process.cwd(), "data", "drafts.json");
const pendingChangesFilePath = path.join(process.cwd(), "data", "pendingChanges.json");

/**
 * Maps StoredBlog database format to the UI-compatible Post format
 */
export function mapStoredToPost(blog: StoredBlog): Post {
  let image = blog.image || "";
  if (image.includes("drive.google.com/uc")) {
    try {
      const urlParams = new URL(image).searchParams;
      const fileId = urlParams.get("id");
      if (fileId) {
        image = `https://lh3.googleusercontent.com/d/${fileId}`;
      }
    } catch (e) {
      console.warn("Failed to parse Google Drive image URL:", image, e);
    }
  }

  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    description: blog.seoDescription || "",
    googleDriveImageUrl: image,
    publishedAt: blog.publishedDate || "",
    authorName: blog.author || "Dr. Mark Weis",
    readingTime: blog.readingTime || "5 min read",
    status: blog.status || "draft",
    content: blog.content || "",
    seo: {
      metaTitle: blog.seoTitle || blog.title,
      metaDescription: blog.seoDescription || "",
      metaKeywords: blog.keywords || [],
      ogImage: image,
    },
  };
}

/**
 * Maps UI Post layout back into the StoredBlog database layout
 */
export function mapPostToStored(post: Post): StoredBlog {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
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
 * Reads local drafts.json file from the disk. If it doesn't exist, initializes from blogs.json
 */
export function readDraftsFile(): StoredBlog[] {
  try {
    if (!fs.existsSync(draftsFilePath)) {
      const blogs = readBlogsFile();
      fs.writeFileSync(draftsFilePath, JSON.stringify(blogs, null, 2), "utf8");
      return blogs;
    }
    const rawData = fs.readFileSync(draftsFilePath, "utf8");
    return JSON.parse(rawData || "[]");
  } catch (error) {
    console.error("Failed to read local drafts.json file:", error);
    return [];
  }
}

/**
 * Writes drafts list to the local disk and automatically updates pending changes
 */
export function saveDraftsFile(drafts: StoredBlog[]): void {
  try {
    fs.writeFileSync(draftsFilePath, JSON.stringify(drafts, null, 2), "utf8");
    // Automatically recalculate and write pending changes
    calculateAndWritePendingChanges(drafts);
  } catch (error) {
    console.error("Failed to write local drafts.json file:", error);
  }
}

/**
 * Get all blog posts from drafts storage (Admin View)
 */
export async function getDraftBlogs(): Promise<Post[]> {
  const drafts = readDraftsFile();
  // Filter out completely deleted blogs that don't need display or are fully purged
  return drafts.filter((d) => d.status !== "deleted").map(mapStoredToPost);
}

/**
 * Fetch a single draft blog post by ID
 */
export async function getDraftBlogById(id: string): Promise<Post | null> {
  const posts = await getDraftBlogs();
  return posts.find((p) => p.id === id) || null;
}

/**
 * Save (create or update) a blog post in drafts.json
 */
export async function saveDraftBlog(
  id: string | null,
  postData: Omit<Post, "id" | "readingTime" | "content">,
  content: string
): Promise<Post> {
  const drafts = readDraftsFile();
  const blogs = readBlogsFile();

  const isNew = !id;
  const targetId = id || `blog_${Date.now()}`;

  // Automatically calculate reading time (avg 200 words per minute)
  const words = content.trim().split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.ceil(words / 200));
  const readingTime = `${readingMinutes} min read`;

  // Determine status
  const originalBlog = blogs.find((b) => b.id === targetId);
  let status = postData.status;

  if (isNew) {
    // If it's a new post and status is chosen as "published" in form, it's pending publish
    status = postData.status === "published" ? "pending_publish" : "draft";
  } else {
    // If it's an existing post that exists in blogs.json (production)
    if (originalBlog) {
      if (postData.status === "published") {
        status = "pending_update";
      } else if (postData.status === "draft") {
        status = "draft"; // moving to draft means unpublishing
      } else if (postData.status === "archived") {
        status = "archived";
      }
    } else {
      // Existing in drafts but never published (new blog that is updated)
      status = postData.status === "published" ? "pending_publish" : "draft";
    }
  }

  const updatedPost: Post = {
    ...postData,
    id: targetId,
    readingTime,
    content,
    status,
  };

  const storedObj = mapPostToStored(updatedPost);

  const existingIndex = drafts.findIndex((d) => d.id === targetId);
  if (existingIndex > -1) {
    drafts[existingIndex] = storedObj;
  } else {
    drafts.push(storedObj);
  }

  saveDraftsFile(drafts);
  return updatedPost;
}

/**
 * Delete a blog post locally (mark as pending delete or deleted)
 */
export async function deleteDraftBlog(id: string): Promise<void> {
  const drafts = readDraftsFile();
  const blogs = readBlogsFile();

  const targetIndex = drafts.findIndex((d) => d.id === id);
  if (targetIndex === -1) {
    throw new Error(`Blog post with ID "${id}" was not found in drafts.`);
  }

  const existsInBlogs = blogs.some((b) => b.id === id);

  if (existsInBlogs) {
    // Mark as pending_delete
    drafts[targetIndex].status = "pending_delete";
  } else {
    // It is a local draft/never published. We can just delete it or mark as deleted.
    // Setting to "deleted" keeps a record in drafts so we can compute it as deleted under pending changes.
    drafts[targetIndex].status = "deleted";
  }

  saveDraftsFile(drafts);
}

export interface PendingChangesSummary {
  added: Array<{ id: string; title: string; slug: string }>;
  updated: Array<{ id: string; title: string; slug: string }>;
  deleted: Array<{ id: string; title: string; slug: string }>;
  addedCount: number;
  updatedCount: number;
  deletedCount: number;
}

/**
 * Calculates differences between drafts.json and blogs.json, then writes to pendingChanges.json
 */
export function calculateAndWritePendingChanges(currentDrafts?: StoredBlog[]): PendingChangesSummary {
  const drafts = currentDrafts || readDraftsFile();
  const blogs = readBlogsFile();

  const summary: PendingChangesSummary = {
    added: [],
    updated: [],
    deleted: [],
    addedCount: 0,
    updatedCount: 0,
    deletedCount: 0,
  };

  // 1. Added Blogs: in drafts but not in blogs, and not deleted
  drafts.forEach((d) => {
    const inBlogs = blogs.find((b) => b.id === d.id);
    if (!inBlogs && d.status !== "deleted") {
      summary.added.push({ id: d.id, title: d.title, slug: d.slug });
    }
  });

  // 2. Updated Blogs: in both, fields changed, not marked pending_delete or deleted
  drafts.forEach((d) => {
    const inBlogs = blogs.find((b) => b.id === d.id);
    if (inBlogs && d.status !== "pending_delete" && d.status !== "deleted") {
      // Check if title, content, slug, image, or status has changed
      const isChanged =
        d.title !== inBlogs.title ||
        d.content !== inBlogs.content ||
        d.slug !== inBlogs.slug ||
        d.image !== inBlogs.image ||
        d.status !== inBlogs.status ||
        d.publishedDate !== inBlogs.publishedDate ||
        d.seoTitle !== inBlogs.seoTitle ||
        d.seoDescription !== inBlogs.seoDescription ||
        JSON.stringify(d.keywords) !== JSON.stringify(inBlogs.keywords);

      if (isChanged) {
        summary.updated.push({ id: d.id, title: d.title, slug: d.slug });
      }
    }
  });

  // 3. Deleted Blogs: in blogs but status in drafts is pending_delete / deleted or missing
  blogs.forEach((b) => {
    const inDrafts = drafts.find((d) => d.id === b.id);
    if (!inDrafts || inDrafts.status === "pending_delete" || inDrafts.status === "deleted") {
      summary.deleted.push({ id: b.id, title: b.title, slug: b.slug });
    }
  });

  summary.addedCount = summary.added.length;
  summary.updatedCount = summary.updated.length;
  summary.deletedCount = summary.deleted.length;

  try {
    fs.writeFileSync(pendingChangesFilePath, JSON.stringify(summary, null, 2), "utf8");
  } catch (error) {
    console.error("Failed to write pendingChanges.json:", error);
  }

  return summary;
}
