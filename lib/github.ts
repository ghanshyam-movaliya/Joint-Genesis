/**
 * Secure Server Helper to commit file changes directly to your GitHub repository
 * using the GitHub REST API.
 */
export async function commitToGitHub(
  filePath: string,
  content: string,
  commitMessage: string
): Promise<void> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  // If env keys are missing, print warning but write locally (enables local dev/type checks)
  if (!token || !owner || !repo) {
    console.warn(
      "GitHub REST API integration is missing credentials. Please set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO in your environment variables. Changes will only be saved locally on disk."
    );
    return;
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

  try {
    // 1. Fetch current file metadata to retrieve its SHA identifier (needed for updates)
    let currentSha: string | undefined;

    const getResponse = await fetch(`${url}?ref=${branch}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Joint-Genesis-CMS-System",
      },
      cache: "no-store",
    });

    if (getResponse.ok) {
      const metadata = await getResponse.json();
      currentSha = metadata.sha;
    } else if (getResponse.status !== 404) {
      const errText = await getResponse.text();
      throw new Error(`Failed to fetch file metadata from GitHub: ${errText}`);
    }

    // 2. Base64 encode the updated JSON contents
    const base64Content = Buffer.from(content).toString("base64");

    // 3. Put the updated content onto GitHub (creates or updates the file)
    const putResponse = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "Joint-Genesis-CMS-System",
      },
      body: JSON.stringify({
        message: commitMessage,
        content: base64Content,
        sha: currentSha,
        branch,
      }),
    });

    if (!putResponse.ok) {
      const errText = await putResponse.text();
      throw new Error(`Failed to commit file to GitHub: ${errText}`);
    }

    console.log(`Successfully committed and pushed ${filePath} to GitHub branch ${branch}.`);
  } catch (error) {
    console.error(`GitHub API commit failed for ${filePath}:`, error);
    throw new Error(`GitHub integration failed: ${(error as { message?: string }).message || error}`);
  }
}
