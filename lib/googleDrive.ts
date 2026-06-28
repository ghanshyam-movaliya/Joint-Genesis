import { google } from "googleapis";
import { Readable } from "stream";

const SCOPES = ["https://www.googleapis.com/auth/drive"];

/**
 * Get authenticated Google Drive API Client instance
 */
async function getDriveClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  // Replace escaped newlines with real newlines for service account key config
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Missing Google Drive credentials. Please ensure GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY are set."
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });

  return google.drive({ version: "v3", auth });
}

/**
 * Converts a Buffer to a readable stream for Google API uploads
 */
function bufferToStream(buffer: Buffer): Readable {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

/**
 * Generate the direct public viewing URL for a Google Drive file ID
 */
export function getPublicImageUrl(fileId: string): string {
  if (!fileId) return "";
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/**
 * Upload an image buffer to the configured Google Drive folder
 */
export async function uploadImage(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<{ fileId: string; publicUrl: string }> {
  try {
    const drive = await getDriveClient();
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!folderId) {
      throw new Error("Missing Google Drive folder ID. Please set GOOGLE_DRIVE_FOLDER_ID.");
    }

    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };

    const media = {
      mimeType,
      body: bufferToStream(fileBuffer),
    };

    // 1. Upload the file to Google Drive
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });

    const fileId = response.data.id;
    if (!fileId) {
      throw new Error("Google Drive upload succeeded but failed to return a file ID.");
    }

    // 2. Make the file publicly readable by anyone
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    // 3. Return the file details and direct public URL
    const publicUrl = getPublicImageUrl(fileId);
    return { fileId, publicUrl };

  } catch (error) {
    console.error("Google Drive upload error:", error);
    throw new Error(`Google Drive upload failed: ${(error as { message?: string }).message || error}`);
  }
}

/**
 * Delete a file from Google Drive by ID
 */
export async function deleteImage(fileId: string): Promise<void> {
  if (!fileId) return;

  try {
    const drive = await getDriveClient();
    await drive.files.delete({
      fileId: fileId,
    });
  } catch (error) {
    console.error("Google Drive deletion error:", error);
    // Ignore 404 errors as the file may already be deleted
    const err = error as { status?: number; code?: number | string; message?: string };
    if (err.status !== 404 && err.code !== 404) {
      throw new Error(`Google Drive deletion failed: ${err.message || error}`);
    }
  }
}

/**
 * Replace an image in Google Drive: uploads the new image and deletes the old one
 */
export async function replaceImage(
  oldFileId: string | null,
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<{ fileId: string; publicUrl: string }> {
  // 1. Upload new image
  const uploadResult = await uploadImage(fileBuffer, fileName, mimeType);

  // 2. Delete old image if provided
  if (oldFileId) {
    try {
      await deleteImage(oldFileId);
    } catch (error) {
      console.warn(`Failed to delete old image file ${oldFileId}:`, error);
      // Don't fail the upload task if deleting the old file fails
    }
  }

  return uploadResult;
}
