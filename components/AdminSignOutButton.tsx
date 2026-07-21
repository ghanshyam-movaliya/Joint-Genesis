"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

interface AdminSignOutButtonProps {
  className?: string;
  variant?: "default" | "subtle";
}

export default function AdminSignOutButton({
  className = "",
  variant = "default",
}: AdminSignOutButtonProps) {
  const baseStyle =
    "inline-flex items-center gap-1.5 px-4 py-2 border rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95";
  const defaultStyle = "border-red-200 bg-white hover:bg-red-50 text-red-600 hover:text-red-700";
  const subtleStyle = "border-brand-navy-200 bg-white hover:bg-brand-navy-50 text-brand-navy-700";

  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin" })}
      className={`${baseStyle} ${variant === "subtle" ? subtleStyle : defaultStyle} ${className}`}
    >
      <LogOut className="w-3.5 h-3.5 text-red-500" />
      Sign Out
    </button>
  );
}
