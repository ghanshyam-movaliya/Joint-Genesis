import { NextRequest, NextResponse } from "next/server";
import { deleteImage } from "@/lib/googleDrive";

export async function POST(request: NextRequest) {
  try {
    const { fileId } = await request.json();

    if (!fileId) {
      return NextResponse.json(
        { success: false, error: "Missing required parameter: fileId" },
        { status: 400 }
      );
    }

    await deleteImage(fileId);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("API Google Drive delete endpoint error:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as { message?: string }).message || "An unexpected error occurred during image deletion.",
      },
      { status: 500 }
    );
  }
}
