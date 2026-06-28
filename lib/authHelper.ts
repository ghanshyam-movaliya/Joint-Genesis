import { NextRequest } from "next/server";
import crypto from "crypto";

const COOKIE_NAME = "jg_admin_session";

/**
 * Validates the password against the ADMIN_PASSWORD environment variable.
 */
export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  return password === adminPassword;
}

/**
 * Generates a cryptographically signed, timestamped session token.
 */
export function generateSessionToken(): string {
  const secret = process.env.ADMIN_PASSWORD || "admin123";
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", secret)
    .update(timestamp)
    .digest("hex");
  return `${timestamp}.${signature}`;
}

/**
 * Verifies if the session token signature is valid and not expired (7 days max).
 */
export function verifySessionToken(token: string): boolean {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestamp, signature] = parts;
  const secret = process.env.ADMIN_PASSWORD || "admin123";
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(timestamp)
    .digest("hex");

  if (signature !== expectedSignature) return false;

  const time = parseInt(timestamp, 10);
  if (isNaN(time)) return false;

  // Max age: 7 days
  const isExpired = Date.now() - time > 7 * 24 * 60 * 60 * 1000;
  return !isExpired;
}

/**
 * Middleware check helper to determine if current request has a valid admin session
 */
export function isAuthenticated(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get(COOKIE_NAME);
  if (!sessionCookie) return false;
  return verifySessionToken(sessionCookie.value);
}
