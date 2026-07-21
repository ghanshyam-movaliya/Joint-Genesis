import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export interface ExtendedJWT extends JWT {
  accessToken?: string;
  expiresAt?: number;
  refreshToken?: string;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
  } | null;
  error?: string;
}

export interface ExtendedSession extends Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
  };
  accessToken?: string;
  error?: string;
}

/**
 * Helper to refresh expired Google Access Token using the saved refresh token
 */
async function refreshAccessToken(token: ExtendedJWT): Promise<ExtendedJWT> {
  try {
    if (!token.refreshToken) {
      console.warn("[NextAuth] No refresh token available on token object. User needs to re-authenticate.");
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }

    const url = "https://oauth2.googleapis.com/token";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      console.error("[NextAuth] Google token refresh failed with status", response.status, refreshedTokens);
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      expiresAt: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token if new one is not returned
    };
  } catch (error) {
    const errorMsg = typeof error === "object" && error !== null ? JSON.stringify(error) : String(error);
    console.error(`[NextAuth] Error refreshing access token: ${errorMsg}`);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/drive.file",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign-in: store credentials
      if (account && user) {
        return {
          accessToken: account.access_token,
          expiresAt: account.expires_at 
            ? (account.expires_at as number) * 1000 
            : Date.now() + ((account.expires_in as number) || 3600) * 1000,
          refreshToken: account.refresh_token ?? token.refreshToken,
          user,
        };
      }

      // If token is not expired yet, return it
      const extendedToken = token as ExtendedJWT;
      if (extendedToken.expiresAt && Date.now() < (extendedToken.expiresAt as number)) {
        return extendedToken;
      }

      // Expired: attempt to refresh
      return refreshAccessToken(extendedToken);
    },
    async session({ session, token }) {
      const extendedSession = session as ExtendedSession;
      const extendedToken = token as ExtendedJWT;
      extendedSession.user = extendedToken.user ?? undefined;
      extendedSession.accessToken = extendedToken.accessToken;
      extendedSession.error = extendedToken.error;
      return extendedSession;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "default-secret-key-joint-genesis",
  pages: {
    signIn: "/admin",
  },
};
