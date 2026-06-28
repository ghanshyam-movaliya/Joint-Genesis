import { getSettings } from "./settingsService";

export interface SeoSettings {
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  googleVerification?: string;
  bingVerification?: string;
}

/**
 * Fetch default SEO settings from settings.json
 */
export async function getSeoSettings(): Promise<SeoSettings> {
  const settings = await getSettings();
  return {
    defaultTitle: settings.defaultTitle,
    defaultDescription: settings.defaultDescription,
    defaultKeywords: settings.defaultKeywords,
    googleVerification: settings.googleVerification || "",
    bingVerification: settings.bingVerification || "",
  };
}
