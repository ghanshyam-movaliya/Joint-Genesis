import { NextResponse } from "next/server";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const baseUrl = siteUrl.replace(/\/$/, "");
  
  const response = NextResponse.redirect(`${baseUrl}/admin`);

  // Clear cookie by setting maxAge to 0
  response.cookies.set("jg_admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}
