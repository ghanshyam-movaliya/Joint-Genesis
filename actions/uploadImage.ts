"use server";

import { uploadImage } from "@/lib/googleDrive";
import { getServerSession } from "next-auth/next";
import { authOptions, ExtendedSession } from "@/lib/auth";

export async function uploadImageAction(formData: FormData) {
  try {
    const session = (await getServerSession(authOptions)) as ExtendedSession | null;
    if (!session || !session.accessToken) {
      throw new Error("Unauthorized. Please authenticate via Google first.");
    }

    const file = formData.get("file") as File | null;
    if (!file) {
      throw new Error("No file provided in the upload request.");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return await uploadImage(buffer, file.name, file.type, session.accessToken);
  } catch (error) {
    console.error("Server Action uploadImageAction failed:", error);
    throw new Error((error as { message?: string }).message || "Upload action failed.");
  }
}
