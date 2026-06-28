import { NextResponse } from "next/server";
import { getOAuthClient } from "@/lib/authHelper";

export async function GET() {
  try {
    const oauth2Client = getOAuthClient();
    
    // We only need profile and email scope to verify their identity
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      prompt: "consent",
    });

    return NextResponse.redirect(url);
  } catch (error) {
    console.error("OAuth login redirect failed:", error);
    return NextResponse.json(
      { error: "Failed to generate authorization URL: " + (error as { message?: string }).message },
      { status: 500 }
    );
  }
}
