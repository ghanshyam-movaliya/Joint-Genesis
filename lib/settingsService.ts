import fs from "fs";
import path from "path";
import { commitToGitHub } from "./github";

export interface WebsiteSettings {
  websiteName: string;
  domain: string;
  affiliateLink: string;
  supportEmail: string;
  supportPhone: string;
  websiteUrl: string; // added to match settings.json specification
  footerText: string;
  defaultAuthor: string;
  // SEO default values merged inside settings
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  googleVerification?: string;
  bingVerification?: string;
}

const settingsFilePath = path.join(process.cwd(), "data", "settings.json");

const DEFAULT_SETTINGS: WebsiteSettings = {
  websiteName: "Joint Genesis™",
  domain: "en-jointgenesis.com",
  affiliateLink: "https://72d7fg1er50vavbk28pks1sve4.hop.clickbank.net/?tid=affiliate",
  supportEmail: "support@biodynamix.co",
  supportPhone: "1-800-473-5188",
  websiteUrl: "https://en-jointgenesis.com",
  footerText: "Copyright 2026 - Joint Genesis™ All Rights Reserved.",
  defaultAuthor: "Dr. Mark Weis",
  googleVerification: "",
  bingVerification: "",
  defaultTitle: "Joint Genesis™ | Support Rejuvenated Joint Comfort & Mobility",
  defaultDescription:
    "Discover Joint Genesis™, the doctor-formulated supplement that targets the root cause of age-related joint stiffness by supporting healthy synovial fluid.",
  defaultKeywords: [
    "Joint Genesis",
    "BioDynamix",
    "joint health supplement",
    "joint lubrication",
    "synovial fluid",
  ],
};

/**
 * Reads website settings from local settings.json
 */
export async function getSettings(): Promise<WebsiteSettings> {
  try {
    if (!fs.existsSync(settingsFilePath)) {
      return DEFAULT_SETTINGS;
    }
    const rawData = fs.readFileSync(settingsFilePath, "utf8");
    const parsed = JSON.parse(rawData || "{}");
    
    return {
      websiteName: parsed.websiteName || DEFAULT_SETTINGS.websiteName,
      domain: parsed.domain || DEFAULT_SETTINGS.domain,
      affiliateLink: parsed.affiliateLink || DEFAULT_SETTINGS.affiliateLink,
      supportEmail: parsed.supportEmail || DEFAULT_SETTINGS.supportEmail,
      supportPhone: parsed.supportPhone || DEFAULT_SETTINGS.supportPhone,
      websiteUrl: parsed.websiteUrl || DEFAULT_SETTINGS.websiteUrl,
      footerText: parsed.footerText || DEFAULT_SETTINGS.footerText,
      defaultAuthor: parsed.defaultAuthor || DEFAULT_SETTINGS.defaultAuthor,
      defaultTitle: parsed.defaultTitle || DEFAULT_SETTINGS.defaultTitle,
      defaultDescription: parsed.defaultDescription || DEFAULT_SETTINGS.defaultDescription,
      defaultKeywords: parsed.defaultKeywords || DEFAULT_SETTINGS.defaultKeywords,
      googleVerification: parsed.googleVerification || "",
      bingVerification: parsed.bingVerification || "",
    };
  } catch (error) {
    console.error("Failed to read settings.json:", error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Updates website settings and pushes the updated JSON to GitHub
 */
export async function updateSettings(settings: WebsiteSettings): Promise<void> {
  const jsonText = JSON.stringify(settings, null, 2);

  // 1. Write locally
  try {
    fs.writeFileSync(settingsFilePath, jsonText, "utf8");
  } catch (error) {
    console.warn("Unable to write settings locally (this is normal in Serverless/Vercel environments):", error);
  }

  // 2. Commit and push to GitHub (triggers Vercel redeploy)
  await commitToGitHub("data/settings.json", jsonText, "chore(settings): update website configurations");
}
