import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getAdminDashboardDataAction } from "@/actions/blog";
import AdminLoginForm from "@/components/AdminLoginForm";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Check NextAuth session on server
  const session = await getServerSession(authOptions);

  // Render Login Panel if session is missing or refresh token expired/failed
  if (!session || (session as { error?: string })?.error === "RefreshAccessTokenError") {
    return <AdminLoginForm />;
  }

  // Fetch all initial data server-side
  const dashboardData = await getAdminDashboardDataAction();

  return <DashboardClient initialData={dashboardData} />;
}
