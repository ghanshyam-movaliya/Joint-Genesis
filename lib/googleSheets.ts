import { google } from "googleapis";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive",
];

/**
 * Get authenticated Google Sheets API client
 */
async function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Missing Google Service Account credentials. Please set GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY."
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });

  return google.sheets({ version: "v4", auth });
}

/**
 * Get spreadsheet ID from environment variables
 */
function getSpreadsheetId(): string {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    throw new Error("Missing Google Spreadsheet ID. Please set GOOGLE_SHEET_ID in your environment variables.");
  }
  return sheetId;
}

/**
 * Fetch values from a specific sheet range
 * Example: getSpreadsheetValues("Blogs!A:L")
 */
export async function getSpreadsheetValues(range: string): Promise<string[][]> {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return response.data.values || [];
  } catch (error) {
    console.error(`Google Sheets getValues failed for range ${range}:`, error);
    throw new Error(`Google Sheets fetch failed: ${(error as { message?: string }).message || error}`);
  }
}

/**
 * Append a row of values to a sheet
 */
export async function appendSpreadsheetRow(
  range: string,
  values: (string | number | boolean | null | undefined)[]
): Promise<void> {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [values],
      },
    });
  } catch (error) {
    console.error(`Google Sheets appendRow failed for range ${range}:`, error);
    throw new Error(`Google Sheets write failed: ${(error as { message?: string }).message || error}`);
  }
}

/**
 * Update values at a specific range in a sheet
 * Example: updateSpreadsheetRow("Blogs!A5:L5", [id, slug, title, ...])
 */
export async function updateSpreadsheetRow(
  range: string,
  values: (string | number | boolean | null | undefined)[]
): Promise<void> {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [values],
      },
    });
  } catch (error) {
    console.error(`Google Sheets updateRow failed for range ${range}:`, error);
    throw new Error(`Google Sheets update failed: ${(error as { message?: string }).message || error}`);
  }
}

/**
 * Delete a specific row by index physically from Google Sheets
 * Note: rowIndex is 0-indexed relative to the sheet rows (including header)
 */
export async function deleteSpreadsheetRow(sheetName: string, rowIndex: number): Promise<void> {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    // 1. Fetch sheet metadata to find the specific sheetId by name
    const spreadsheetMetadata = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const sheet = spreadsheetMetadata.data.sheets?.find(
      (s) => s.properties?.title === sheetName
    );

    if (!sheet || !sheet.properties || sheet.properties.sheetId === undefined) {
      throw new Error(`Sheet named "${sheetName}" not found in the spreadsheet.`);
    }

    const sheetId = sheet.properties.sheetId;

    // 2. Perform dimension update to physically remove the row
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId,
                dimension: "ROWS",
                startIndex: rowIndex,
                endIndex: rowIndex + 1,
              },
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error(`Google Sheets deleteRow failed for ${sheetName} at row index ${rowIndex}:`, error);
    throw new Error(`Google Sheets deletion failed: ${(error as { message?: string }).message || error}`);
  }
}
