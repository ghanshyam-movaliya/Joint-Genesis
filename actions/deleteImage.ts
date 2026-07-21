"use server";

import { deleteImage } from "@/lib/googleDrive";
import { getServerSession } from "next-auth/next";
import { authOptions, ExtendedSession } from "@/lib/auth";

export async function deleteImageAction(fileId: string) {
  try {
    const session = (await getServerSession(authOptions)) as ExtendedSession | null;
    if (!session || !session.accessToken || session.error === "RefreshAccessTokenError") {
      throw new Error("Unauthorized. Google authentication session has expired. Please log in again.");
    }

    if (!fileId) {
      throw new Error("Missing required argument: fileId");
    }

    await deleteImage(fileId, session.accessToken);
    return { success: true };
  } catch (error) {
    console.error("Server Action deleteImageAction failed:", error);
    throw new Error((error as { message?: string }).message || "Delete action failed.");
  }
}
