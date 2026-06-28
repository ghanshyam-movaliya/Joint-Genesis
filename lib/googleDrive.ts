import { google, drive_v3 } from "googleapis";
import { Readable } from "stream";

/**
 * Get authenticated Google Drive API Client instance using User's OAuth Access Token
 */
function getDriveClient(accessToken: string) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  return google.drive({ version: "v3", auth: oauth2Client });
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
 * Search for or automatically create the "Joint Genesis Images" folder
 */
async function getOrCreateFolder(drive: drive_v3.Drive): Promise<string> {
  const folderName = "Joint Genesis Images";

  try {
    // 1. Search for folder name
    const response = await drive.files.list({
      q: `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: "files(id)",
      spaces: "drive",
    });

    const files = response.data.files;
    if (files && files.length > 0 && files[0].id) {
      return files[0].id;
    }

    // 2. Folder not found: create it
    const folderMetadata = {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
    };

    const folder = await drive.files.create({
      requestBody: folderMetadata,
      fields: "id",
    });

    if (!folder.data.id) {
      throw new Error("Failed to retrieve new folder ID from Google Drive response.");
    }

    return folder.data.id;
  } catch (error) {
    console.error("Failed to check/create Joint Genesis Images folder:", error);
    throw new Error(`Google Drive folder setup failed: ${(error as { message?: string }).message || error}`);
  }
}

/**
 * Upload an image buffer to the "Joint Genesis Images" folder
 */
export async function uploadImage(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string,
  accessToken: string
): Promise<{ fileId: string; publicUrl: string }> {
  try {
    const drive = getDriveClient(accessToken);

    // 1. Get or create target parent folder
    const folderId = await getOrCreateFolder(drive);

    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };

    const media = {
      mimeType,
      body: bufferToStream(fileBuffer),
    };

    // 2. Upload file to Google Drive
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });

    const fileId = response.data.id;
    if (!fileId) {
      throw new Error("Google Drive upload succeeded but failed to return a file ID.");
    }

    // 3. Make file publicly readable
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    // 4. Return direct viewing URL
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
export async function deleteImage(fileId: string, accessToken: string): Promise<void> {
  if (!fileId) return;

  try {
    const drive = getDriveClient(accessToken);
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
  mimeType: string,
  accessToken: string
): Promise<{ fileId: string; publicUrl: string }> {
  // 1. Upload new image
  const uploadResult = await uploadImage(fileBuffer, fileName, mimeType, accessToken);

  // 2. Delete old image if provided
  if (oldFileId) {
    try {
      await deleteImage(oldFileId, accessToken);
    } catch (error) {
      console.warn(`Failed to delete old image file ${oldFileId}:`, error);
      // Don't fail the upload task if deleting the old file fails
    }
  }

  return uploadResult;
}
