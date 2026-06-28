"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function AdminSignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin" })}
      className="inline-flex items-center gap-1.5 px-4 py-2 border border-red-200 rounded-xl bg-white hover:bg-red-50 text-xs font-bold text-red-600 hover:text-red-700 transition-colors shadow-sm cursor-pointer"
    >
      <LogOut className="w-3.5 h-3.5" />
      Sign Out
    </button>
  );
}
