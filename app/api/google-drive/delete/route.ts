import { NextRequest, NextResponse } from "next/server";
import { deleteImage } from "@/lib/googleDrive";
import { getServerSession } from "next-auth/next";
import { authOptions, ExtendedSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // 1. Session Authentication
    const session = (await getServerSession(authOptions)) as ExtendedSession | null;
    if (!session || !session.accessToken) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please authenticate via Google first." },
        { status: 401 }
      );
    }

    const { fileId } = await request.json();

    if (!fileId) {
      return NextResponse.json(
        { success: false, error: "Missing required parameter: fileId" },
        { status: 400 }
      );
    }

    await deleteImage(fileId, session.accessToken);

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
