"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  FileText, 
  Settings, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Loader2, 
  Globe, 
  GitBranch, 
  Cloud, 
  Clock, 
  Calendar, 
  ArrowUpRight, 
  Lock,
  RefreshCw
} from "lucide-react";
import { publishChangesAction, checkDeploymentStatusAction, getAdminDashboardDataAction } from "@/actions/blog";
import { cn } from "@/lib/utils";
import AdminSignOutButton from "@/components/AdminSignOutButton";

// Custom SVG Github icon to bypass lucide-react import version mismatches
const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

interface DashboardClientProps {
  initialData: Awaited<ReturnType<typeof getAdminDashboardDataAction>>;
}

const getInitialActiveSha = (d: Awaited<ReturnType<typeof getAdminDashboardDataAction>>) => {
  if (d.isDeploymentRunning && d.deploymentHistory && d.deploymentHistory.length > 0) {
    const activeSha = d.deploymentHistory[0].commitSha;
    if (activeSha && !activeSha.startsWith("N/A")) {
      return activeSha;
    }
  }
  return null;
};

export default function DashboardClient({ initialData }: DashboardClientProps) {
  const initialActiveSha = getInitialActiveSha(initialData);

  const [data, setData] = useState(initialData);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(() => !!initialActiveSha);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [activeCommitSha, setActiveCommitSha] = useState<string | null>(() => initialActiveSha);

  const stepsList = [
    "Preparing Changes",
    "Uploading Images",
    "Updating JSON",
    "Creating Git Commit",
    "Pushing to GitHub",
    "Waiting for Vercel",
    "Building Website",
    "Deployment Ready",
    "Website Updated Successfully"
  ];

  const [steps, setSteps] = useState<Array<{ name: string; state: "idle" | "loading" | "success" | "error" }>>(() => {
    const list: Array<{ name: string; state: "idle" | "loading" | "success" | "error" }> = stepsList.map(name => ({ name, state: "idle" }));
    if (initialActiveSha) {
      for (let i = 0; i <= 4; i++) {
        list[i].state = "success";
      }
      list[5].state = "loading";
    }
    return list;
  });

  const [prevIsDeploymentRunning, setPrevIsDeploymentRunning] = useState(initialData.isDeploymentRunning);

  // Sync active deployment state when data updates during render
  if (data.isDeploymentRunning !== prevIsDeploymentRunning) {
    setPrevIsDeploymentRunning(data.isDeploymentRunning);
    if (data.isDeploymentRunning) {
      const activeSha = getInitialActiveSha(data);
      if (activeSha && activeSha !== activeCommitSha) {
        setActiveCommitSha(activeSha);
        setShowProgressModal(true);
        setSteps(prev => {
          const next = [...prev];
          for (let i = 0; i <= 4; i++) {
            next[i].state = "success";
          }
          next[5].state = "loading";
          return next;
        });
      }
    }
  }

  // Helper to refresh data from server
  const refreshData = useCallback(async () => {
    try {
      const res = await getAdminDashboardDataAction();
      if (res.success) {
        setData(res);
      }
    } catch (e) {
      console.error("Failed to refresh dashboard data:", e);
    }
  }, []);

  // Poll for Vercel deployment status
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (activeCommitSha) {
      const pollStatus = async () => {
        try {
          const res = await checkDeploymentStatusAction(activeCommitSha);
          if (res.success && res.statusInfo) {
            const { state } = res.statusInfo;
            
            setSteps(prev => {
              const next = [...prev];
              // Steps 0-4 are already marked success by the publish step
              
              if (state === "QUEUED") {
                next[5].state = "loading"; // Waiting for Vercel is loading
                next[6].state = "idle";
              } else if (state === "BUILDING") {
                next[5].state = "success"; // Waiting for Vercel is complete
                next[6].state = "loading"; // Building website is loading
              } else if (state === "READY") {
                next[5].state = "success";
                next[6].state = "success";
                next[7].state = "success";
                next[8].state = "success"; // Fully done
                setActiveCommitSha(null); // Stop polling
                refreshData(); // Refresh counts and history
              } else if (state === "ERROR" || state === "CANCELED") {
                next[5].state = "error";
                next[6].state = "error";
                setPublishError("Vercel build deployment failed or was canceled. Please check Vercel dashboard.");
                setActiveCommitSha(null); // Stop polling
                refreshData();
              }
              
              return next;
            });
          }
        } catch (err) {
          console.error("Polling error:", err);
        }
      };

      // Poll every 4 seconds
      intervalId = setInterval(pollStatus, 4000);
      pollStatus(); // run once immediately
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [activeCommitSha, refreshData]);

  const handlePublishClick = () => {
    if (data.isDeploymentRunning || activeCommitSha) return;
    setPublishError(null);
    setShowConfirmModal(true);
  };

  const executePublish = async () => {
    setShowConfirmModal(false);
    setShowProgressModal(true);
    setPublishError(null);

    // Reset steps
    setSteps(stepsList.map(name => ({ name, state: "idle" })));

    try {
      // Step 0: Preparing Changes
      setSteps(prev => {
        const next = [...prev];
        next[0].state = "loading";
        return next;
      });

      // Step 1: Uploading Images
      await new Promise(r => setTimeout(r, 600));
      setSteps(prev => {
        const next = [...prev];
        next[0].state = "success";
        next[1].state = "loading";
        return next;
      });

      // Step 2: Updating JSON
      await new Promise(r => setTimeout(r, 600));
      setSteps(prev => {
        const next = [...prev];
        next[1].state = "success";
        next[2].state = "loading";
        return next;
      });

      // Step 3: Creating Git Commit
      await new Promise(r => setTimeout(r, 600));
      setSteps(prev => {
        const next = [...prev];
        next[2].state = "success";
        next[3].state = "loading";
        return next;
      });

      // Call action
      const res = await publishChangesAction();

      if (!res.success) {
        throw new Error(res.error || "GitHub commit failed.");
      }

      // Step 4: Pushing to GitHub
      setSteps(prev => {
        const next = [...prev];
        next[3].state = "success";
        next[4].state = "loading";
        return next;
      });
      await new Promise(r => setTimeout(r, 800));

      setSteps(prev => {
        const next = [...prev];
        next[4].state = "success";
        next[5].state = "loading"; // Trigger Waiting for Vercel
        return next;
      });

      // Start Polling Vercel status using commit SHA
      setActiveCommitSha(res.commitSha || "");
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "An error occurred during publish.";
      setPublishError(errorMessage);
      
      // Mark current step as error
      setSteps(prev => {
        const next = [...prev];
        const loadingIdx = next.findIndex(s => s.state === "loading");
        if (loadingIdx > -1) {
          next[loadingIdx].state = "error";
        } else {
          next[0].state = "error";
        }
        return next;
      });
      refreshData();
    }
  };

  const formatDate = (isoString: string) => {
    if (!isoString) return "N/A";
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (e) {
      return isoString;
    }
  };

  if (!data.success || !data.stats || !data.pendingSummary || !data.statusWidgets) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl max-w-md">
          <p className="font-bold">Error loading dashboard</p>
          <p className="text-sm mt-1">{data.error || "An unexpected error occurred."}</p>
        </div>
      </div>
    );
  }

  const { stats, pendingSummary, deploymentHistory, statusWidgets } = data;

  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-b from-brand-navy-50/20 via-white to-brand-navy-50/10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Widget */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-brand-navy-100 pb-8">
          <div>
            <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black text-brand-primary-700 bg-brand-primary-50 border border-brand-primary-100 uppercase tracking-widest mb-3">
              Management Dashboard
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy-900 tracking-tight leading-tight">
              Publishing Command Console
            </h1>
            <p className="text-xs text-brand-navy-500 font-semibold mt-1 flex items-center gap-1.5">
              <span>Google Session Active</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Draft & Publish Layer Enabled</span>
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={refreshData}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-brand-navy-100 hover:bg-brand-navy-50 text-xs font-black text-brand-navy-700 rounded-xl shadow-sm hover:shadow transition-all active:scale-98 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Sync Status
            </button>
            <AdminSignOutButton />
          </div>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Card: Published Blogs */}
          <div className="bg-white border border-brand-navy-100 rounded-3xl p-6 shadow-sm flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-emerald-100 group-hover:text-emerald-200 transition-colors">
              <Globe className="w-8 h-8" />
            </div>
            <span className="text-3xl font-black text-emerald-600">{stats.publishedBlogsCount}</span>
            <div>
              <h4 className="font-display font-extrabold text-sm text-brand-navy-900">Published Blogs</h4>
              <p className="text-2xs text-brand-navy-500 mt-0.5">Live index on public pages.</p>
            </div>
          </div>

          {/* Card: Draft Blogs */}
          <div className="bg-white border border-brand-navy-100 rounded-3xl p-6 shadow-sm flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-brand-navy-100 group-hover:text-brand-navy-200 transition-colors">
              <FileText className="w-8 h-8" />
            </div>
            <span className="text-3xl font-black text-brand-navy-700">{stats.draftBlogsCount}</span>
            <div>
              <h4 className="font-display font-extrabold text-sm text-brand-navy-900">Draft Blogs</h4>
              <p className="text-2xs text-brand-navy-500 mt-0.5">Stored local revisions.</p>
            </div>
          </div>

          {/* Card: Pending Changes */}
          <div className="bg-white border border-brand-navy-100 rounded-3xl p-6 shadow-sm flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-amber-100 group-hover:text-amber-200 transition-colors">
              <GitBranch className="w-8 h-8" />
            </div>
            <span className="text-3xl font-black text-amber-500">
              {stats.pendingChangesCount}
            </span>
            <div>
              <h4 className="font-display font-extrabold text-sm text-brand-navy-900">Pending Changes</h4>
              <p className="text-2xs text-brand-navy-500 mt-0.5">Awaiting production sync.</p>
            </div>
          </div>

          {/* Card: Deployment Status */}
          <div className="bg-white border border-brand-navy-100 rounded-3xl p-6 shadow-sm flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-brand-navy-100 group-hover:text-brand-navy-200 transition-colors">
              <Clock className="w-8 h-8" />
            </div>
            <span className={cn(
              "text-sm font-black uppercase tracking-wider px-2.5 py-1 rounded-lg w-max border mt-1",
              stats.latestDeploymentStatus === "Ready" && "bg-emerald-50 text-emerald-600 border-emerald-200",
              stats.latestDeploymentStatus === "Building" && "bg-amber-50 text-amber-500 border-amber-200 animate-pulse",
              stats.latestDeploymentStatus === "Queued" && "bg-purple-50 text-purple-500 border-purple-200 animate-pulse",
              stats.latestDeploymentStatus === "Error" && "bg-red-50 text-red-500 border-red-200",
              stats.latestDeploymentStatus === "Idle" && "bg-gray-50 text-gray-500 border-gray-200"
            )}>
              {stats.latestDeploymentStatus}
            </span>
            <div className="mt-2">
              <h4 className="font-display font-extrabold text-sm text-brand-navy-900">Deployment Status</h4>
              <p className="text-[10px] text-brand-navy-500 mt-0.5 truncate">SHA: {stats.latestCommitSha.slice(0, 8)}</p>
            </div>
          </div>

        </div>

        {/* Integration Status Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* GitHub Status */}
          <div className="bg-brand-navy-50/50 border border-brand-navy-100 rounded-2xl px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-brand-navy-700" />
              <div>
                <h5 className="text-xs font-black text-brand-navy-900">GitHub Commit Layer</h5>
                <p className="text-[10px] font-bold text-brand-navy-400">Branch: {stats.currentBranch}</p>
              </div>
            </div>
            <span className={cn(
              "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border",
              statusWidgets.githubStatus === "Connected" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-red-50 text-red-500 border-red-200"
            )}>
              {statusWidgets.githubStatus}
            </span>
          </div>

          {/* Vercel Status */}
          <div className="bg-brand-navy-50/50 border border-brand-navy-100 rounded-2xl px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-brand-navy-700" />
              <div>
                <h5 className="text-xs font-black text-brand-navy-900">Vercel Deployment API</h5>
                <p className="text-[10px] font-bold text-brand-navy-400">ISR Cache Hook</p>
              </div>
            </div>
            <span className={cn(
              "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border",
              statusWidgets.vercelStatus === "Connected" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-amber-50 text-amber-500 border-amber-200"
            )}>
              {statusWidgets.vercelStatus === "Connected" ? "Active" : "Simulation"}
            </span>
          </div>

          {/* Google Drive Status */}
          <div className="bg-brand-navy-50/50 border border-brand-navy-100 rounded-2xl px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cloud className="w-5 h-5 text-brand-navy-700" />
              <div>
                <h5 className="text-xs font-black text-brand-navy-900">Google Drive Storage</h5>
                <p className="text-[10px] font-bold text-brand-navy-400">Media Upload Folder</p>
              </div>
            </div>
            <span className={cn(
              "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border",
              statusWidgets.googleDriveStatus === "Connected" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-rose-50 text-rose-500 border-rose-200"
            )}>
              {statusWidgets.googleDriveStatus}
            </span>
          </div>

        </div>

        {/* Console Action Bar */}
        <div className="bg-brand-navy-900 rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-brand-navy-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 text-brand-navy-800 opacity-20 pointer-events-none">
            <GitBranch className="w-64 h-64" />
          </div>
          
          <div className="relative z-10">
            <h2 className="font-display font-black text-xl text-white">Publish Draft Changes to Production</h2>
            <p className="text-xs text-brand-navy-300 max-w-lg mt-2 leading-relaxed">
              Consolidates all pending blog creations, content edits, and delete actions locally, uploads images, commits once to GitHub, and triggers a single production build on Vercel.
            </p>
          </div>

          <button
            onClick={handlePublishClick}
            disabled={stats.pendingChangesCount === 0 || data.isDeploymentRunning || !!activeCommitSha}
            className={cn(
              "relative z-10 w-full md:w-auto px-8 py-4 text-xs font-black text-white rounded-2xl shadow transition-all duration-200 uppercase tracking-widest cursor-pointer",
              stats.pendingChangesCount === 0 || data.isDeploymentRunning || !!activeCommitSha
                ? "bg-brand-navy-800 border border-brand-navy-700 text-brand-navy-500 cursor-not-allowed"
                : "bg-brand-primary-600 hover:bg-brand-primary-700 hover:scale-102 active:scale-98"
            )}
          >
            {data.isDeploymentRunning || !!activeCommitSha ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-brand-primary-300" />
                Publishing...
              </span>
            ) : (
              "Publish Changes"
            )}
          </button>
        </div>

        {/* Dashboard Management Navigation grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Pending Changes Checklist */}
          <div className="lg:col-span-6 bg-white border border-brand-navy-100 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-brand-navy-50 pb-4">
              <h3 className="font-display font-black text-base text-brand-navy-900 flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-brand-primary-700" />
                Pending Changes Summary
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-2xs font-black bg-brand-navy-100 text-brand-navy-700 border border-brand-navy-200">
                {stats.pendingChangesCount} Pending
              </span>
            </div>

            {stats.pendingChangesCount > 0 ? (
              <div className="flex flex-col gap-5 overflow-y-auto max-h-80 pr-2">
                
                {/* Added blogs */}
                {pendingSummary.addedCount > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-md w-max">
                      Added Blogs ({pendingSummary.addedCount})
                    </span>
                    <ul className="divide-y divide-brand-navy-50 border border-brand-navy-50 rounded-xl overflow-hidden bg-brand-navy-50/20">
                      {pendingSummary.added.map((blog) => (
                        <li key={blog.id} className="px-4 py-2.5 text-xs font-semibold text-brand-navy-800 truncate">
                          {blog.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Updated blogs */}
                {pendingSummary.updatedCount > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md w-max">
                      Updated Blogs ({pendingSummary.updatedCount})
                    </span>
                    <ul className="divide-y divide-brand-navy-50 border border-brand-navy-50 rounded-xl overflow-hidden bg-brand-navy-50/20">
                      {pendingSummary.updated.map((blog) => (
                        <li key={blog.id} className="px-4 py-2.5 text-xs font-semibold text-brand-navy-800 truncate">
                          {blog.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Deleted blogs */}
                {pendingSummary.deletedCount > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-md w-max">
                      Deleted Blogs ({pendingSummary.deletedCount})
                    </span>
                    <ul className="divide-y divide-brand-navy-50 border border-brand-navy-50 rounded-xl overflow-hidden bg-brand-navy-50/20">
                      {pendingSummary.deleted.map((blog) => (
                        <li key={blog.id} className="px-4 py-2.5 text-xs font-semibold text-brand-navy-800 truncate line-through opacity-70">
                          {blog.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            ) : (
              <div className="text-center py-12 flex flex-col items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3" />
                <h4 className="font-display font-extrabold text-sm text-brand-navy-900">All Changes Published</h4>
                <p className="text-xs text-brand-navy-500 mt-1 max-w-xs leading-relaxed">
                  Your local workspace is fully synchronized with production. No pending changes to publish.
                </p>
              </div>
            )}

            <div className="mt-auto pt-4 border-t border-brand-navy-50 flex gap-4">
              <Link
                href="/admin/blogs"
                className="w-full text-center py-3 bg-brand-primary-50 hover:bg-brand-primary-100 border border-brand-primary-200 text-xs font-black text-brand-primary-700 rounded-xl shadow-sm transition-all"
              >
                Blogs Manager
              </Link>
              <Link
                href="/admin/settings"
                className="w-full text-center py-3 bg-brand-navy-800 hover:bg-brand-navy-900 text-xs font-black text-white rounded-xl shadow-sm transition-all animate-fade-in"
              >
                Global Settings
              </Link>
            </div>
          </div>

          {/* Deployment History logs */}
          <div className="lg:col-span-6 bg-white border border-brand-navy-100 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-brand-navy-50 pb-4">
              <h3 className="font-display font-black text-base text-brand-navy-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-primary-700" />
                Publish & Deployment History
              </h3>
            </div>

            {deploymentHistory && deploymentHistory.length > 0 ? (
              <div className="overflow-x-auto overflow-y-auto max-h-96 pr-2">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-brand-navy-100 text-[10px] uppercase tracking-widest font-black text-brand-navy-500 pb-2">
                      <th className="py-2 pr-4">Date</th>
                      <th className="py-2 pr-4">Commit Message</th>
                      <th className="py-2 pr-4 text-center">Status</th>
                      <th className="py-2 text-right">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-navy-50 text-[11px] font-semibold text-brand-navy-700">
                    {deploymentHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-brand-navy-50/20">
                        <td className="py-3 pr-4 whitespace-nowrap text-brand-navy-500">
                          {formatDate(item.date)}
                        </td>
                        <td className="py-3 pr-4 max-w-[120px] truncate" title={item.commitMessage}>
                          {item.commitMessage}
                        </td>
                        <td className="py-3 pr-4 text-center">
                          <span className={cn(
                            "inline-flex px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider border",
                            item.status === "Ready" && "bg-emerald-50 text-emerald-600 border-emerald-200",
                            item.status === "Building" && "bg-amber-50 text-amber-500 border-amber-200 animate-pulse",
                            item.status === "Queued" && "bg-purple-50 text-purple-500 border-purple-200 animate-pulse",
                            item.status === "Error" && "bg-red-50 text-red-500 border-red-200"
                          )}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 text-right text-brand-navy-500 whitespace-nowrap">
                          {item.duration || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 flex flex-col items-center justify-center">
                <Calendar className="w-12 h-12 text-brand-navy-200 mb-3" />
                <h4 className="font-display font-extrabold text-sm text-brand-navy-900">No Publish Runs Yet</h4>
                <p className="text-xs text-brand-navy-500 mt-1 max-w-xs leading-relaxed">
                  Your publish logs will populate here once you execute your first production sync.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* 1. Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-brand-navy-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-brand-navy-100 rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col gap-6 animate-scale-in">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-display font-black text-lg text-brand-navy-900">Publish Changes to Production?</h3>
              <p className="text-xs text-brand-navy-500 mt-2 leading-relaxed">
                You are about to sync your workspace with the live production website. This includes:
              </p>
              
              <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                <div className="bg-purple-50 border border-purple-100 p-2.5 rounded-xl">
                  <span className="block text-base font-black text-purple-600">{pendingSummary.addedCount}</span>
                  <span className="text-[9px] font-bold text-purple-500 uppercase tracking-wide">Added</span>
                </div>
                <div className="bg-amber-50 border border-amber-100 p-2.5 rounded-xl">
                  <span className="block text-base font-black text-amber-600">{pendingSummary.updatedCount}</span>
                  <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wide">Updated</span>
                </div>
                <div className="bg-rose-50 border border-rose-100 p-2.5 rounded-xl">
                  <span className="block text-base font-black text-rose-600">{pendingSummary.deletedCount}</span>
                  <span className="text-[9px] font-bold text-rose-500 uppercase tracking-wide">Deleted</span>
                </div>
              </div>

              <p className="text-2xs text-brand-navy-400 mt-4 leading-normal italic">
                Note: A Git commit will be created and pushed. Vercel will build the updated pages, making them immediately live.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-full py-3 bg-brand-navy-50 hover:bg-brand-navy-100 text-xs font-black text-brand-navy-700 rounded-xl transition-all cursor-pointer border border-brand-navy-100"
              >
                Cancel
              </button>
              <button
                onClick={executePublish}
                className="w-full py-3 bg-brand-primary-700 hover:bg-brand-primary-800 text-xs font-black text-white rounded-xl shadow transition-all cursor-pointer active:scale-98"
              >
                Publish Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Progress Checklist Modal */}
      {showProgressModal && (
        <div className="fixed inset-0 bg-brand-navy-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-brand-navy-100 rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col gap-6">
            <div className="flex items-center gap-3">
              {publishError ? (
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                  <XCircle className="w-5 h-5" />
                </div>
              ) : activeCommitSha ? (
                <div className="w-10 h-10 rounded-xl bg-brand-primary-50 text-brand-primary-700 flex items-center justify-center shrink-0">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
              <div>
                <h3 className="font-display font-black text-base text-brand-navy-900">
                  {publishError ? "Publish Failed" : activeCommitSha ? "Publishing Changes..." : "Publish Complete!"}
                </h3>
                <p className="text-[10px] text-brand-navy-400 font-bold uppercase tracking-wider mt-0.5">
                  CMS Pipeline Status
                </p>
              </div>
            </div>

            {/* Checklist items */}
            <div className="flex flex-col gap-3 py-2 border-y border-brand-navy-50">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <span className={cn(
                    "font-semibold",
                    step.state === "idle" && "text-brand-navy-400 opacity-60",
                    step.state === "loading" && "text-brand-primary-700 font-bold",
                    step.state === "success" && "text-brand-navy-900",
                    step.state === "error" && "text-red-600 font-bold"
                  )}>
                    {step.name}
                  </span>

                  <div>
                    {step.state === "idle" && (
                      <div className="w-4 h-4 rounded-full border-2 border-brand-navy-100" />
                    )}
                    {step.state === "loading" && (
                      <Loader2 className="w-4 h-4 animate-spin text-brand-primary-600" />
                    )}
                    {step.state === "success" && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    )}
                    {step.state === "error" && (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {publishError && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-[10px] font-bold rounded-xl leading-relaxed">
                Error details: {publishError}
              </div>
            )}

            {!activeCommitSha && !publishError && (
              <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold rounded-xl leading-relaxed">
                Deployment Build Successful! The production website is now live and updated with all changes.
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex gap-3">
              {publishError ? (
                <>
                  <button
                    onClick={() => {
                      setShowProgressModal(false);
                      refreshData();
                    }}
                    className="w-full py-2.5 bg-brand-navy-50 hover:bg-brand-navy-100 text-2xs font-black text-brand-navy-700 rounded-xl transition-all cursor-pointer"
                  >
                    Dismiss Changes
                  </button>
                  <button
                    onClick={executePublish}
                    className="w-full py-2.5 bg-brand-primary-700 hover:bg-brand-primary-800 text-2xs font-black text-white rounded-xl shadow transition-all cursor-pointer"
                  >
                    Retry Publish
                  </button>
                </>
              ) : (
                <button
                  disabled={!!activeCommitSha}
                  onClick={() => {
                    setShowProgressModal(false);
                    refreshData();
                  }}
                  className={cn(
                    "w-full py-3 text-xs font-black rounded-xl transition-all uppercase tracking-wider text-center cursor-pointer",
                    activeCommitSha 
                      ? "bg-brand-navy-50 text-brand-navy-300 border border-brand-navy-100 cursor-not-allowed"
                      : "bg-brand-navy-900 hover:bg-brand-navy-950 text-white shadow"
                  )}
                >
                  {activeCommitSha ? "Please wait..." : "Close Dialog"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
