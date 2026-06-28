"use server";

import { revalidatePath } from "next/cache";
import { createBlog, updateBlog, deleteBlog, Post } from "@/lib/blogService";
import { updateSettings, WebsiteSettings } from "@/lib/settingsService";
import { SeoSettings } from "@/lib/seoService";

/**
 * Server Action to save (create or update) a blog post
 */
export async function saveBlogAction(
  id: string | null,
  postData: Omit<Post, "id" | "readingTime" | "content">,
  content: string
) {
  try {
    if (id) {
      // Update existing post
      await updateBlog(id, postData, content);
    } else {
      // Create new post
      await createBlog(postData, content);
    }

    // Trigger ISR revalidation
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${postData.slug}`);

    return { success: true };
  } catch (error) {
    console.error("saveBlogAction failed:", error);
    return {
      success: false,
      error: (error as { message?: string }).message || "Failed to save blog post.",
    };
  }
}

/**
 * Server Action to delete a blog post
 */
export async function deleteBlogAction(id: string, slug: string) {
  try {
    await deleteBlog(id);

    // Revalidate paths
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);

    return { success: true };
  } catch (error) {
    console.error("deleteBlogAction failed:", error);
    return {
      success: false,
      error: (error as { message?: string }).message || "Failed to delete blog post.",
    };
  }
}

/**
 * Server Action to save global settings & SEO configurations
 */
export async function saveSettingsAction(
  settings: WebsiteSettings,
  seo: SeoSettings
) {
  try {
    const mergedSettings: WebsiteSettings = {
      ...settings,
      defaultTitle: seo.defaultTitle,
      defaultDescription: seo.defaultDescription,
      defaultKeywords: seo.defaultKeywords,
    };
    await updateSettings(mergedSettings);

    // Revalidate all paths to update copyright/contact/SEO info
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("saveSettingsAction failed:", error);
    return {
      success: false,
      error: (error as { message?: string }).message || "Failed to save settings.",
    };
  }
}

/**
 * Server Action to trigger manual full cache revalidation
 */
export async function revalidateCacheAction() {
  try {
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("revalidateCacheAction failed:", error);
    return {
      success: false,
      error: (error as { message?: string }).message || "Failed to revalidate cache.",
    };
  }
}
