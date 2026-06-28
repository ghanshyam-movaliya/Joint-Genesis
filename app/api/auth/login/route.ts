import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, generateSessionToken } from "@/lib/authHelper";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { success: false, error: "Password is required." },
        { status: 400 }
      );
    }

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { success: false, error: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    const token = generateSessionToken();
    const response = NextResponse.json({ success: true });

    // Set signed secure cookie session
    response.cookies.set("jg_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login route failed:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during authentication." },
      { status: 500 }
    );
  }
}
