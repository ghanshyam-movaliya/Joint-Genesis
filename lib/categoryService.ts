import { getSpreadsheetValues } from "./googleSheets";

export interface Category {
  name: string;
  slug: string;
  order: number;
}

/**
 * Fetch list of categories from Categories sheet
 */
export async function getCategories(): Promise<string[]> {
  try {
    const rows = await getSpreadsheetValues("Categories!A:C");
    if (rows.length <= 1) {
      return ["Joint Care", "Natural Health", "Science", "Nutrition", "Healthy Living"];
    }

    return rows
      .slice(1)
      .map((row) => ({
        name: row[0] || "",
        slug: row[1] || "",
        order: parseInt(row[2]) || 99,
      }))
      .sort((a, b) => a.order - b.order)
      .map((c) => c.name);
  } catch (error) {
    console.error("Failed to fetch categories from Google Sheets:", error);
    // Return default categories as a fallback
    return ["Joint Care", "Natural Health", "Science", "Nutrition", "Healthy Living"];
  }
}
