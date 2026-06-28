"use server";

import { deleteImage } from "@/lib/googleDrive";

export async function deleteImageAction(fileId: string) {
  try {
    if (!fileId) {
      throw new Error("Missing required argument: fileId");
    }
    await deleteImage(fileId);
    return { success: true };
  } catch (error) {
    console.error("Server Action deleteImageAction failed:", error);
    throw new Error((error as { message?: string }).message || "Delete action failed.");
  }
}
