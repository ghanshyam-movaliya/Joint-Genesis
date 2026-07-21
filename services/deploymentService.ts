import fs from "fs";
import path from "path";
import os from "os";
import { uploadImage } from "@/lib/googleDrive";
import { commitAndPushBlogs } from "./githubService";
import {
  readDraftsFile,
  saveDraftsFile,
  calculateAndWritePendingChanges,
  StoredBlog,
  mapStoredToPost
} from "./draftService";

const blogsFilePath = path.join(process.cwd(), "data", "blogs.json");
const deploymentHistoryFilePath = path.join(process.cwd(), "data", "deploymentHistory.json");

const tmpBlogsFilePath = path.join(os.tmpdir(), "blogs.json");
const tmpDeploymentHistoryFilePath = path.join(os.tmpdir(), "deploymentHistory.json");

function safeWriteFile(primaryPath: string, tmpPath: string | null, content: string): void {
  try {
    fs.writeFileSync(primaryPath, content, "utf8");
  } catch (err) {
    if (tmpPath) {
      try {
        fs.writeFileSync(tmpPath, content, "utf8");
      } catch (tmpErr) {
        console.warn("Unable to write to fallback tmp path:", tmpErr);
      }
    }
  }
}

function safeReadFile(primaryPath: string, tmpPath: string | null): string | null {
  if (tmpPath && fs.existsSync(tmpPath)) {
    try {
      return fs.readFileSync(tmpPath, "utf8");
    } catch (e) {
      // Fall through
    }
  }
  if (fs.existsSync(primaryPath)) {
    try {
      return fs.readFileSync(primaryPath, "utf8");
    } catch (e) {
      return null;
    }
  }
  return null;
}

export interface DeploymentRecord {
  id: string;
  date: string;
  commitSha: string;
  commitMessage: string;
  status: "Building" | "Ready" | "Error" | "Queued";
  duration: string;
  triggeredBy: string;
}

/**
 * Executes the complete publishing workflow.
 * Returns the committed GitHub Commit SHA.
 */
export async function publishChanges(
  accessToken: string | undefined,
  userName: string | null | undefined
): Promise<{ commitSha: string; commitMessage: string }> {
  // Read current draft and production data
  const drafts = readDraftsFile();
  
  // 1. Scan for base64 data URIs and upload to Google Drive if needed
  const updatedDrafts = [...drafts];
  let imageUploadCount = 0;

  for (let i = 0; i < updatedDrafts.length; i++) {
    const blog = updatedDrafts[i];
    
    // Skip completely deleted posts
    if (blog.status === "deleted") continue;

    if (blog.image && blog.image.startsWith("data:image/")) {
      if (!accessToken) {
        throw new Error(
          "Google OAuth access token is missing. Please sign out and sign in again via Google to authenticate image uploads."
        );
      }

      console.log(`Uploading newly added image for blog: "${blog.title}"`);
      const match = blog.image.match(/^data:(image\/[a-zA-Z+.-]+);base64,(.+)$/);
      if (!match) {
        throw new Error(`Failed to parse image data URI for blog: "${blog.title}"`);
      }

      const mimeType = match[1];
      const base64Data = match[2];
      const buffer = Buffer.from(base64Data, "base64");
      
      const fileExt = mimeType.split("/")[1] || "png";
      const fileName = `blog_${blog.id}_image_${Date.now()}.${fileExt}`;

      try {
        const uploadResult = await uploadImage(buffer, fileName, mimeType, accessToken);
        // Replace base64 data URI with Google Drive URL
        updatedDrafts[i].image = uploadResult.publicUrl;
        imageUploadCount++;
      } catch (err) {
        console.error(`Google Drive upload failed for "${blog.title}":`, err);
        throw new Error(`Google Drive upload failed for blog "${blog.title}": ${(err as Error).message}`);
      }
    }
  }

  // Save drafts locally if we uploaded images
  if (imageUploadCount > 0) {
    saveDraftsFile(updatedDrafts);
  }

  // 2. Prepare the new blogs list for production (blogs.json)
  const productionBlogs: StoredBlog[] = [];

  updatedDrafts.forEach((draft) => {
    // Skip deleted and pending delete blogs
    if (draft.status === "deleted" || draft.status === "pending_delete") {
      return;
    }

    const updatedBlog = { ...draft };
    
    // Promote pending statuses to final states
    if (updatedBlog.status === "pending_publish" || updatedBlog.status === "pending_update") {
      updatedBlog.status = "published";
    }

    productionBlogs.push(updatedBlog);
  });

  // Calculate counts for commit message
  const summary = calculateAndWritePendingChanges(updatedDrafts);
  const commitMessage = `CMS Publish`;
  const commitDescription = `Publish blog changes: Added: ${summary.addedCount}, Updated: ${summary.updatedCount}, Deleted: ${summary.deletedCount}`;
  const fullCommitMessage = `${commitMessage}\n\n${commitDescription}`;

  // 3. Write blogs.json locally (or to /tmp if read-only)
  const blogsJsonText = JSON.stringify(productionBlogs, null, 2);
  safeWriteFile(blogsFilePath, tmpBlogsFilePath, blogsJsonText);

  // 4. Commit and Push blogs.json to GitHub
  let commitSha = "";
  try {
    commitSha = await commitAndPushBlogs("data/blogs.json", blogsJsonText, fullCommitMessage);
  } catch (err) {
    console.error("Failed to commit and push changes to GitHub:", err);
    throw new Error(`GitHub Commit failed: ${(err as Error).message}. No changes have been pushed.`);
  }

  // 5. If GitHub push succeeded, clean up local drafts file states
  const finalDrafts: StoredBlog[] = [];
  
  updatedDrafts.forEach((draft) => {
    // Purge deleted or pending delete blogs from drafts
    if (draft.status === "deleted" || draft.status === "pending_delete") {
      return;
    }

    const finalDraft = { ...draft };
    if (finalDraft.status === "pending_publish" || finalDraft.status === "pending_update") {
      finalDraft.status = "published";
    }
    
    finalDrafts.push(finalDraft);
  });

  // Write draft changes back to disk (this clears pending states)
  saveDraftsFile(finalDrafts);

  // 6. Record this publish run in deploymentHistory.json
  try {
    let history: DeploymentRecord[] = [];
    const rawHistory = safeReadFile(deploymentHistoryFilePath, tmpDeploymentHistoryFilePath);
    if (rawHistory) {
      history = JSON.parse(rawHistory || "[]");
    }

    const newRecord: DeploymentRecord = {
      id: `dep_${Date.now()}`,
      date: new Date().toISOString(),
      commitSha: commitSha,
      commitMessage: commitDescription,
      status: "Building", // Status will start as building and poll
      duration: "Calculating...",
      triggeredBy: userName || "Admin"
    };

    // Prepend so latest is first
    history.unshift(newRecord);
    
    // Cap history length at 50 records
    if (history.length > 50) {
      history = history.slice(0, 50);
    }

    safeWriteFile(deploymentHistoryFilePath, tmpDeploymentHistoryFilePath, JSON.stringify(history, null, 2));
  } catch (e) {
    console.error("Failed to append deployment history:", e);
  }

  return { commitSha, commitMessage: commitDescription };
}

/**
 * Updates the status of a deployment record in deploymentHistory.json
 */
export function updateDeploymentHistoryStatus(
  commitSha: string,
  status: "Building" | "Ready" | "Error" | "Queued",
  durationMs?: number
): void {
  try {
    const rawHistory = safeReadFile(deploymentHistoryFilePath, tmpDeploymentHistoryFilePath);
    if (!rawHistory) return;
    
    const history: DeploymentRecord[] = JSON.parse(rawHistory || "[]");
    
    const index = history.findIndex((h) => h.commitSha === commitSha);
    if (index > -1) {
      history[index].status = status;
      if (durationMs !== undefined) {
        const seconds = Math.floor(durationMs / 1000);
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        history[index].duration = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
      } else {
        const recordTime = new Date(history[index].date).getTime();
        const seconds = Math.floor((Date.now() - recordTime) / 1000);
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        history[index].duration = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
      }
      safeWriteFile(deploymentHistoryFilePath, tmpDeploymentHistoryFilePath, JSON.stringify(history, null, 2));
    }
  } catch (e) {
    console.error("Failed to update deployment history status:", e);
  }
}
