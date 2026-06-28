import { getSpreadsheetValues, updateSpreadsheetRow } from "./googleSheets";

export interface WebsiteSettings {
  websiteName: string;
  domain: string;
  affiliateLink: string;
  supportEmail: string;
  supportPhone: string;
  footerText: string;
  defaultAuthor: string;
}

const DEFAULT_SETTINGS: WebsiteSettings = {
  websiteName: "Joint Genesis™",
  domain: "en-jointgenesis.com",
  affiliateLink: "https://72d7fg1er50vavbk28pks1sve4.hop.clickbank.net/?tid=affiliate",
  supportEmail: "support@biodynamix.co",
  supportPhone: "1-800-473-5188",
  footerText: "Copyright 2026 - Joint Genesis™ All Rights Reserved.",
  defaultAuthor: "Dr. Mark Weis",
};

/**
 * Fetch global website settings from Settings sheet
 */
export async function getSettings(): Promise<WebsiteSettings> {
  try {
    const rows = await getSpreadsheetValues("Settings!A:G");
    if (rows.length <= 1 || !rows[1]) {
      return DEFAULT_SETTINGS;
    }

    const row = rows[1];
    return {
      websiteName: row[0] || DEFAULT_SETTINGS.websiteName,
      domain: row[1] || DEFAULT_SETTINGS.domain,
      affiliateLink: row[2] || DEFAULT_SETTINGS.affiliateLink,
      supportEmail: row[3] || DEFAULT_SETTINGS.supportEmail,
      supportPhone: row[4] || DEFAULT_SETTINGS.supportPhone,
      footerText: row[5] || DEFAULT_SETTINGS.footerText,
      defaultAuthor: row[6] || DEFAULT_SETTINGS.defaultAuthor,
    };
  } catch (error) {
    console.error("Failed to fetch settings from Google Sheets:", error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Update global website settings
 */
export async function updateSettings(settings: WebsiteSettings): Promise<void> {
  const rowValues = [
    settings.websiteName,
    settings.domain,
    settings.affiliateLink,
    settings.supportEmail,
    settings.supportPhone,
    settings.footerText,
    settings.defaultAuthor,
  ];

  await updateSpreadsheetRow("Settings!A2:G2", rowValues);
}
