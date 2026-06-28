import { NextRequest } from "next/server";
import { google } from "googleapis";
import crypto from "crypto";

const SESSION_SECRET = process.env.GOOGLE_PRIVATE_KEY || "fallback-secret-key-12345";
const COOKIE_NAME = "jg_admin_session";

/**
 * Get authenticated Google OAuth2 Client
 */
export function getOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  
  // Use Vercel URL fallback if site URL is not configured
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const redirectUri = `${siteUrl.replace(/\/$/, "")}/api/auth/callback`;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Missing Google OAuth Client credentials. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in environment variables."
    );
  }

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

/**
 * Generate a cryptographically signed session token containing the email
 */
export function signSession(email: string): string {
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(email)
    .digest("hex");
  return `${email}.${signature}`;
}

/**
 * Verify session token and retrieve email if valid
 */
export function verifySessionToken(token: string): string | null {
  if (!token) return null;
  
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  
  const [email, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(email)
    .digest("hex");
    
  if (signature === expectedSignature) {
    return email;
  }
  
  return null;
}

/**
 * Middleware check helper to determine if current request has a valid admin session
 */
export function isAuthenticated(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get(COOKIE_NAME);
  if (!sessionCookie) return false;

  const email = verifySessionToken(sessionCookie.value);
  if (!email) return false;

  // Verify email matches the configured admin email (if set)
  const allowedAdmin = process.env.ADMIN_EMAIL;
  if (allowedAdmin && email.toLowerCase() !== allowedAdmin.toLowerCase()) {
    return false;
  }

  return true;
}
