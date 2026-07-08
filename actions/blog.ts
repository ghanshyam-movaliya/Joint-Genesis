"use server";

import { revalidatePath } from "next/cache";
import { Post } from "@/lib/blogService";
import { updateSettings, WebsiteSettings } from "@/lib/settingsService";
import { SeoSettings } from "@/lib/seoService";
import { getServerSession } from "next-auth/next";
import { authOptions, ExtendedSession } from "@/lib/auth";
import { saveDraftBlog, deleteDraftBlog, getDraftBlogs, calculateAndWritePendingChanges, readDraftsFile } from "@/services/draftService";
import { publishChanges, updateDeploymentHistoryStatus, DeploymentRecord } from "@/services/deploymentService";
import { getLatestDeploymentStatus, VercelStatusResponse } from "@/services/vercelService";
import fs from "fs";
import path from "path";

const blogsFilePath = path.join(process.cwd(), "data", "blogs.json");
const deploymentHistoryFilePath = path.join(process.cwd(), "data", "deploymentHistory.json");

/**
 * Validates that the user is authenticated via NextAuth.
 * Throws an error if they are not. Returns the session.
 */
async function requireAuth(): Promise<ExtendedSession> {
  const session = (await getServerSession(authOptions)) as ExtendedSession | null;
  if (!session) {
    throw new Error("Unauthorized. Please sign in via Google OAuth first.");
  }
  return session;
}

/**
 * Server Action to save (create or update) a blog post as draft
 */
export async function saveBlogAction(
  id: string | null,
  postData: Omit<Post, "id" | "readingTime" | "content">,
  content: string
) {
  try {
    await requireAuth();

    // Check if deployment is currently active
    const isActive = await isDeploymentActive();
    if (isActive) {
      throw new Error("A blog deployment is currently running on Vercel. Modification is disabled.");
    }

    const savedPost = await saveDraftBlog(id, postData, content);

    // Revalidate paths for admin views
    revalidatePath("/admin");
    revalidatePath("/admin/blogs");
    if (id) {
      revalidatePath(`/admin/blogs/${id}/edit`);
    }

    return { success: true, post: savedPost };
  } catch (error) {
    console.error("saveBlogAction failed:", error);
    return {
      success: false,
      error: (error as { message?: string }).message || "Failed to save draft.",
    };
  }
}

/**
 * Server Action to delete a blog post locally
 */
export async function deleteBlogAction(id: string, slug: string) {
  try {
    await requireAuth();

    // Check if deployment is currently active
    const isActive = await isDeploymentActive();
    if (isActive) {
      throw new Error("A blog deployment is currently running on Vercel. Modification is disabled.");
    }

    await deleteDraftBlog(id);

    revalidatePath("/admin");
    revalidatePath("/admin/blogs");

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
 * Server Action to publish all pending local changes to production
 */
export async function publishChangesAction() {
  try {
    const session = await requireAuth();

    // Check if deployment is currently active
    const isActive = await isDeploymentActive();
    if (isActive) {
      throw new Error("A deployment is already running. Please wait until it completes.");
    }

    const result = await publishChanges(session.accessToken, session.user?.name);

    return {
      success: true,
      commitSha: result.commitSha,
      commitMessage: result.commitMessage,
    };
  } catch (error) {
    console.error("publishChangesAction failed:", error);
    return {
      success: false,
      error: (error as { message?: string }).message || "Failed to publish changes.",
    };
  }
}

/**
 * Server Action to check Vercel deployment build status and update local logs
 */
export async function checkDeploymentStatusAction(commitSha: string) {
  try {
    await requireAuth();

    const statusInfo: VercelStatusResponse = await getLatestDeploymentStatus(commitSha);

    if (statusInfo.state === "READY") {
      updateDeploymentHistoryStatus(commitSha, "Ready", statusInfo.duration);
      // Trigger Next.js cache revalidations on completion
      revalidatePath("/");
      revalidatePath("/blog");
    } else if (statusInfo.state === "ERROR" || statusInfo.state === "CANCELED") {
      updateDeploymentHistoryStatus(commitSha, "Error");
    } else if (statusInfo.state === "QUEUED") {
      updateDeploymentHistoryStatus(commitSha, "Queued");
    } else if (statusInfo.state === "BUILDING") {
      updateDeploymentHistoryStatus(commitSha, "Building");
    }

    return { success: true, statusInfo };
  } catch (error) {
    console.error("checkDeploymentStatusAction failed:", error);
    return {
      success: false,
      error: (error as { message?: string }).message || "Failed to query deployment status.",
    };
  }
}

/**
 * Helper to check if there is an active deployment (Building or Queued state in history)
 */
async function isDeploymentActive(): Promise<boolean> {
  try {
    if (!fs.existsSync(deploymentHistoryFilePath)) return false;
    const raw = fs.readFileSync(deploymentHistoryFilePath, "utf8");
    const history: DeploymentRecord[] = JSON.parse(raw || "[]");
    if (history.length === 0) return false;
    
    // Check if the most recent run is still building or queued
    const latest = history[0];
    return latest.status === "Building" || latest.status === "Queued";
  } catch (e) {
    console.error("Failed to check active deployment state:", e);
    return false;
  }
}

/**
 * Server Action to fetch all required Admin Dashboard stats, pending list, and history
 */
export async function getAdminDashboardDataAction() {
  try {
    const session = await requireAuth();

    // 1. Read files
    let blogsCount = 0;
    try {
      if (fs.existsSync(blogsFilePath)) {
        const blogsRaw = fs.readFileSync(blogsFilePath, "utf8");
        const blogs = JSON.parse(blogsRaw || "[]");
        blogsCount = blogs.filter((b: any) => b.status === "published").length;
      }
    } catch (e) {
      console.error(e);
    }

    const drafts = readDraftsFile();
    const draftBlogsCount = drafts.filter((d) => d.status === "draft").length;

    // 2. Deployment history
    let history: DeploymentRecord[] = [];
    try {
      if (fs.existsSync(deploymentHistoryFilePath)) {
        const rawHistory = fs.readFileSync(deploymentHistoryFilePath, "utf8");
        history = JSON.parse(rawHistory || "[]");
      }
    } catch (e) {
      console.error(e);
    }

    // 3. Compute Pending changes
    const pendingSummary = calculateAndWritePendingChanges(drafts);

    // 4. Determine statuses
    const hasGitHub = !!(process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO);
    const hasVercel = !!(process.env.VERCEL_TOKEN && process.env.VERCEL_PROJECT_ID);
    const hasGoogleDrive = !!session.accessToken;

    const latestDeployment = history.length > 0 ? history[0] : null;
    const lastPublishedRecord = history.find((h) => h.status === "Ready");

    return {
      success: true,
      stats: {
        publishedBlogsCount: blogsCount,
        draftBlogsCount: draftBlogsCount,
        pendingChangesCount: pendingSummary.addedCount + pendingSummary.updatedCount + pendingSummary.deletedCount,
        lastPublishedTime: lastPublishedRecord ? lastPublishedRecord.date : null,
        lastDeploymentTime: latestDeployment ? latestDeployment.date : null,
        latestDeploymentStatus: latestDeployment ? latestDeployment.status : "Idle",
        latestCommitSha: latestDeployment ? latestDeployment.commitSha : "N/A",
        currentBranch: process.env.GITHUB_BRANCH || "main",
      },
      pendingSummary,
      deploymentHistory: history,
      statusWidgets: {
        githubStatus: hasGitHub ? "Connected" : "Missing Credentials",
        vercelStatus: hasVercel ? "Connected" : "Missing Credentials (Simulation)",
        googleDriveStatus: hasGoogleDrive ? "Connected" : "Sign-in required",
      },
      isDeploymentRunning: latestDeployment ? (latestDeployment.status === "Building" || latestDeployment.status === "Queued") : false
    };
  } catch (error) {
    console.error("getAdminDashboardDataAction failed:", error);
    return {
      success: false,
      error: (error as { message?: string }).message || "Failed to load dashboard data.",
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
    await requireAuth();

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
    await requireAuth();

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
