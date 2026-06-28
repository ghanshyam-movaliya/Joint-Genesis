import {
  getSpreadsheetValues,
  appendSpreadsheetRow,
  updateSpreadsheetRow,
  deleteSpreadsheetRow,
} from "./googleSheets";

export interface Post {
  id: string; // Blog ID
  title: string;
  slug: string;
  description: string; // Maps to SEO Description
  googleDriveImageUrl: string; // Maps to Image URL
  publishedAt: string; // Maps to Published Date (YYYY-MM-DD)
  categories: string[]; // Maps to [Category]
  authorName: string; // Maps to Author
  readingTime: string; // Maps to Reading Time
  status: string; // "published" or "draft"
  content?: string; // Markdown Content
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    ogImage?: string;
  };
}

/**
 * Maps a Google Sheet row from Blogs sheet to a typed Post object
 */
function mapRowToPost(row: string[]): Post {
  const [
    id,
    slug,
    title,
    category,
    author,
    imageUrl,
    seoTitle,
    seoDescription,
    keywords,
    publishedDate,
    status,
    readingTime,
  ] = row;

  const parsedKeywords = keywords ? keywords.split(",").map((k: string) => k.trim()) : [];

  return {
    id: id || "",
    slug: slug || "",
    title: title || "",
    description: seoDescription || "",
    googleDriveImageUrl: imageUrl || "",
    publishedAt: publishedDate || new Date().toISOString().split("T")[0],
    categories: category ? [category] : ["General"],
    authorName: author || "Dr. Mark Weis",
    readingTime: readingTime || "5 min read",
    status: status || "draft",
    seo: {
      metaTitle: seoTitle || title || "",
      metaDescription: seoDescription || "",
      metaKeywords: parsedKeywords,
      ogImage: imageUrl || "",
    },
  };
}

/**
 * Get all blog posts from the Google Sheet
 */
export async function getBlogs(): Promise<Post[]> {
  try {
    const rows = await getSpreadsheetValues("Blogs!A:L");
    if (rows.length <= 1) return []; // Only headers

    // Skip the header row and map to Post objects
    return rows.slice(1).map(mapRowToPost);
  } catch (error) {
    console.error("Failed to fetch blogs from Google Sheets:", error);
    return [];
  }
}

/**
 * Fetch a single blog post by its slug, including its markdown content
 */
export async function getBlogBySlug(slug: string): Promise<Post | null> {
  try {
    const posts = await getBlogs();
    const post = posts.find((p) => p.slug === slug);
    if (!post) return null;

    // Load markdown content from the BlogContent sheet
    const contentRows = await getSpreadsheetValues("BlogContent!A:B");
    const contentRow = contentRows.find((r) => r[0] === post.id);

    if (contentRow) {
      post.content = contentRow[1] || "";
    } else {
      post.content = "";
    }

    return post;
  } catch (error) {
    console.error(`Failed to fetch blog post by slug "${slug}":`, error);
    return null;
  }
}

/**
 * Create a new blog post
 */
export async function createBlog(
  blog: Omit<Post, "id" | "readingTime">,
  content: string
): Promise<Post> {
  const id = `blog_${Date.now()}`;

  // Automatically calculate reading time (avg 200 words per minute)
  const words = content.trim().split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.ceil(words / 200));
  const readingTime = `${readingMinutes} min read`;

  const category = blog.categories[0] || "General";
  const keywordsStr = blog.seo?.metaKeywords?.join(",") || "";

  const blogRow = [
    id,
    blog.slug,
    blog.title,
    category,
    blog.authorName,
    blog.googleDriveImageUrl,
    blog.seo?.metaTitle || blog.title,
    blog.seo?.metaDescription || blog.description,
    keywordsStr,
    blog.publishedAt,
    blog.status,
    readingTime,
  ];

  // 1. Write row to Blogs sheet
  await appendSpreadsheetRow("Blogs!A:L", blogRow);

  // 2. Write row to BlogContent sheet
  await appendSpreadsheetRow("BlogContent!A:B", [id, content]);

  return {
    ...blog,
    id,
    readingTime,
  };
}

/**
 * Update an existing blog post
 */
export async function updateBlog(
  id: string,
  updatedFields: Partial<Post>,
  content?: string
): Promise<void> {
  // 1. Locate the row index of the target blog in the Blogs sheet
  const rows = await getSpreadsheetValues("Blogs!A:A");
  const rowIndex = rows.findIndex((r) => r[0] === id);

  if (rowIndex === -1) {
    throw new Error(`Blog post with ID "${id}" was not found in the database.`);
  }

  // 2. Load the current row data to merge updates
  const fullRows = await getSpreadsheetValues(`Blogs!A${rowIndex + 1}:L${rowIndex + 1}`);
  const currentRow = fullRows[0];
  const post = mapRowToPost(currentRow);

  // 3. Recalculate reading time if content is updated
  let readingTime = post.readingTime;
  if (content !== undefined) {
    const words = content.trim().split(/\s+/).length;
    const readingMinutes = Math.max(1, Math.ceil(words / 200));
    readingTime = `${readingMinutes} min read`;
  }

  const category = updatedFields.categories ? updatedFields.categories[0] : post.categories[0];
  const keywordsStr = updatedFields.seo?.metaKeywords
    ? updatedFields.seo.metaKeywords.join(",")
    : post.seo?.metaKeywords?.join(",") || "";

  const updatedRow = [
    id,
    updatedFields.slug ?? post.slug,
    updatedFields.title ?? post.title,
    category,
    updatedFields.authorName ?? post.authorName,
    updatedFields.googleDriveImageUrl ?? post.googleDriveImageUrl,
    updatedFields.seo?.metaTitle ?? post.seo?.metaTitle ?? post.title,
    updatedFields.seo?.metaDescription ?? post.seo?.metaDescription ?? post.description,
    keywordsStr,
    updatedFields.publishedAt ?? post.publishedAt,
    updatedFields.status ?? post.status,
    readingTime,
  ];

  // Update in Blogs sheet (note sheet is 1-indexed, so row index + 1 is range index)
  await updateSpreadsheetRow(`Blogs!A${rowIndex + 1}:L${rowIndex + 1}`, updatedRow);

  // 4. Update in BlogContent sheet if content was updated
  if (content !== undefined) {
    const contentRows = await getSpreadsheetValues("BlogContent!A:A");
    const contentRowIndex = contentRows.findIndex((r) => r[0] === id);

    if (contentRowIndex !== -1) {
      await updateSpreadsheetRow(`BlogContent!A${contentRowIndex + 1}:B${contentRowIndex + 1}`, [id, content]);
    } else {
      // Fallback: Append if somehow missing
      await appendSpreadsheetRow("BlogContent!A:B", [id, content]);
    }
  }
}

/**
 * Delete a blog post and its content
 */
export async function deleteBlog(id: string): Promise<void> {
  // 1. Delete from Blogs sheet
  const rows = await getSpreadsheetValues("Blogs!A:A");
  const rowIndex = rows.findIndex((r) => r[0] === id);

  if (rowIndex !== -1) {
    await deleteSpreadsheetRow("Blogs", rowIndex);
  }

  // 2. Delete from BlogContent sheet
  const contentRows = await getSpreadsheetValues("BlogContent!A:A");
  const contentRowIndex = contentRows.findIndex((r) => r[0] === id);

  if (contentRowIndex !== -1) {
    await deleteSpreadsheetRow("BlogContent", contentRowIndex);
  }
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
