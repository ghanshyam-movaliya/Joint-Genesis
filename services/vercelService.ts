import fs from "fs";
import path from "path";

export interface VercelStatusResponse {
  state: "QUEUED" | "BUILDING" | "READY" | "ERROR" | "CANCELED";
  status: string; // User-friendly version, e.g. "Queued", "Building", "Ready", "Error"
  id?: string;
  url?: string;
  duration?: number; // duration in ms
  isMock?: boolean;
}

const deploymentHistoryFilePath = path.join(process.cwd(), "data", "deploymentHistory.json");

/**
 * Checks deployment status on Vercel or simulates it if credentials are not configured.
 */
export async function getLatestDeploymentStatus(commitSha: string): Promise<VercelStatusResponse> {
  const token = process.env.VERCEL_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  // 1. Mock simulation mode if credentials are missing or we have a mock sha
  if (!token || !projectId || commitSha.startsWith("mock_")) {
    try {
      if (fs.existsSync(deploymentHistoryFilePath)) {
        const rawHistory = fs.readFileSync(deploymentHistoryFilePath, "utf8");
        const history = JSON.parse(rawHistory || "[]");
        const record = history.find((h: any) => h.commitSha === commitSha);
        if (record) {
          const startTime = new Date(record.date).getTime();
          const elapsed = Date.now() - startTime;

          if (elapsed < 4000) {
            return { state: "QUEUED", status: "Queued", isMock: true };
          } else if (elapsed < 12000) {
            return { state: "BUILDING", status: "Building", isMock: true };
          } else {
            return { state: "READY", status: "Ready", duration: 12000, isMock: true };
          }
        }
      }
    } catch (e) {
      console.warn("Failed to read history for deployment simulation:", e);
    }
    return { state: "READY", status: "Ready", isMock: true };
  }

  // 2. Query Vercel Deployments API
  try {
    let url = `https://api.vercel.com/v6/deployments?projectId=${projectId}`;
    if (teamId) {
      url += `&teamId=${teamId}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Vercel Deployments API error:", errText);
      return { state: "ERROR", status: "Error", url: `https://api.github.com` };
    }

    const data = await response.json();
    const deployments = data.deployments || [];

    // Find the deployment that corresponds to our pushed commit SHA
    const targetDeployment = deployments.find((d: any) => {
      // Vercel deployment metadata stores the commit SHA
      const metaSha = d.meta?.githubCommitSha || d.meta?.commitSha;
      return metaSha && metaSha.toLowerCase() === commitSha.toLowerCase();
    });

    if (targetDeployment) {
      const state = targetDeployment.state as VercelStatusResponse["state"];
      
      // Calculate duration if building or ready
      let duration: number | undefined;
      if (state === "READY" && targetDeployment.ready && targetDeployment.created) {
        duration = targetDeployment.ready - targetDeployment.created;
      }

      // Map API states to user-friendly titles
      const statusMap: Record<string, string> = {
        QUEUED: "Queued",
        BUILDING: "Building",
        READY: "Ready",
        ERROR: "Error",
        CANCELED: "Canceled",
      };

      return {
        state,
        status: statusMap[state] || state,
        id: targetDeployment.uid,
        url: targetDeployment.url,
        duration,
        isMock: false,
      };
    }

    // If not found yet, it could be queued/initializing
    return {
      state: "QUEUED",
      status: "Waiting for Vercel...",
      isMock: false,
    };
  } catch (error) {
    console.error("Vercel deployment status lookup failed:", error);
    return {
      state: "ERROR",
      status: "API Lookup Error",
    };
  }
}
