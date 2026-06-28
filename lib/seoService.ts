import { getSpreadsheetValues, updateSpreadsheetRow } from "./googleSheets";

export interface SeoSettings {
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  googleVerification?: string;
  bingVerification?: string;
}

const DEFAULT_SEO: SeoSettings = {
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
  googleVerification: "",
  bingVerification: "",
};

/**
 * Fetch global SEO settings from SEO sheet
 */
export async function getSeoSettings(): Promise<SeoSettings> {
  try {
    const rows = await getSpreadsheetValues("SEO!A:E");
    if (rows.length <= 1 || !rows[1]) {
      return DEFAULT_SEO;
    }

    const row = rows[1];
    const keywordsStr = row[2] || "";
    const keywordsList = keywordsStr ? keywordsStr.split(",").map((k: string) => k.trim()) : DEFAULT_SEO.defaultKeywords;

    return {
      defaultTitle: row[0] || DEFAULT_SEO.defaultTitle,
      defaultDescription: row[1] || DEFAULT_SEO.defaultDescription,
      defaultKeywords: keywordsList,
      googleVerification: row[3] || "",
      bingVerification: row[4] || "",
    };
  } catch (error) {
    console.error("Failed to fetch SEO settings from Google Sheets:", error);
    return DEFAULT_SEO;
  }
}

/**
 * Update global SEO settings
 */
export async function updateSeoSettings(seo: SeoSettings): Promise<void> {
  const rowValues = [
    seo.defaultTitle,
    seo.defaultDescription,
    seo.defaultKeywords.join(","),
    seo.googleVerification || "",
    seo.bingVerification || "",
  ];

  await updateSpreadsheetRow("SEO!A2:E2", rowValues);
}
