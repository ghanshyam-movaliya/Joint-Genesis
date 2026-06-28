"use server";

import { replaceImage } from "@/lib/googleDrive";
import { getServerSession } from "next-auth/next";
import { authOptions, ExtendedSession } from "@/lib/auth";

export async function replaceImageAction(oldFileId: string | null, formData: FormData) {
  try {
    const session = (await getServerSession(authOptions)) as ExtendedSession | null;
    if (!session || !session.accessToken) {
      throw new Error("Unauthorized. Please authenticate via Google first.");
    }

    const file = formData.get("file") as File | null;
    if (!file) {
      throw new Error("No file provided in the replacement request.");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return await replaceImage(oldFileId, buffer, file.name, file.type, session.accessToken);
  } catch (error) {
    console.error("Server Action replaceImageAction failed:", error);
    throw new Error((error as { message?: string }).message || "Replace action failed.");
  }
}
