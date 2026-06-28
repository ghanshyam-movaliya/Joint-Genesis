import { NextRequest, NextResponse } from "next/server";
import { uploadImage, replaceImage } from "@/lib/googleDrive";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const oldFileId = formData.get("oldFileId") as string | null;

    // 1. Validation: File Existence
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided in the upload request." },
        { status: 400 }
      );
    }

    // 2. Validation: Image Type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file type: ${file.type}. Only JPEG, PNG, WEBP, GIF, and SVG formats are supported.`,
        },
        { status: 400 }
      );
    }

    // 3. Validation: File Size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds the 10 MB limit. Uploaded size: ${(file.size / (1024 * 1024)).toFixed(2)} MB.`,
        },
        { status: 400 }
      );
    }

    // 4. Process File into Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 5. Upload to Google Drive (and delete old file if replacing)
    let result;
    if (oldFileId) {
      result = await replaceImage(oldFileId, buffer, file.name, file.type);
    } else {
      result = await uploadImage(buffer, file.name, file.type);
    }

    return NextResponse.json({
      success: true,
      fileId: result.fileId,
      publicUrl: result.publicUrl,
    });

  } catch (error) {
    console.error("API Google Drive upload endpoint error:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as { message?: string }).message || "An unexpected error occurred during image upload.",
      },
      { status: 500 }
    );
  }
}
