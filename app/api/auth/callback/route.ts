import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { getOAuthClient, signSession } from "@/lib/authHelper";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const baseUrl = siteUrl.replace(/\/$/, "");

  if (!code) {
    return NextResponse.redirect(`${baseUrl}/admin?error=MissingCode`);
  }

  try {
    const oauth2Client = getOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Fetch user details from Google userinfo API
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const userInfoResponse = await oauth2.userinfo.get();
    const email = userInfoResponse.data.email;

    if (!email) {
      return NextResponse.redirect(`${baseUrl}/admin?error=NoEmail`);
    }

    // Verify if email matches allowed admin
    const allowedAdmin = process.env.ADMIN_EMAIL;
    if (allowedAdmin && email.toLowerCase() !== allowedAdmin.toLowerCase()) {
      return NextResponse.redirect(`${baseUrl}/admin?error=Unauthorized`);
    }

    // Generate cryptographically signed session token
    const token = signSession(email);
    
    // Redirect to Admin Dashboard page
    const response = NextResponse.redirect(`${baseUrl}/admin`);

    // Save session in HTTP-only secure cookie
    response.cookies.set("jg_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days session duration
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("OAuth callback exchange failed:", error);
    return NextResponse.redirect(`${baseUrl}/admin?error=AuthExchangeFailed`);
  }
}
