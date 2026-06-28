"use server";

import { uploadImage } from "@/lib/googleDrive";

export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get("file") as File | null;
    if (!file) {
      throw new Error("No file provided in the upload request.");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return await uploadImage(buffer, file.name, file.type);
  } catch (error) {
    console.error("Server Action uploadImageAction failed:", error);
    throw new Error((error as { message?: string }).message || "Upload action failed.");
  }
}
