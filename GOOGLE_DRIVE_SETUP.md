# Google Drive Image Integration Setup Guide

Follow this step-by-step guide to set up Google Drive as a completely free image manager for your Joint Genesis Blog system.

---

## 1. Set Up Google Cloud Platform (GCP)

1.  **Create a Google Cloud Project:**
    *   Go to the [Google Cloud Console](https://console.cloud.google.com/).
    *   Click on the project dropdown at the top, select **New Project**, name it (e.g., `Joint Genesis Web`), and click **Create**.
2.  **Enable the Google Drive API:**
    *   In the sidebar menu, navigate to **APIs & Services** > **Library**.
    *   Search for **Google Drive API** and click on it.
    *   Click the **Enable** button.
3.  **Create a Service Account:**
    *   Navigate to **APIs & Services** > **Credentials**.
    *   Click **+ Create Credentials** at the top and select **Service Account**.
    *   Enter a name (e.g., `drive-uploader`), click **Create and Continue**, and click **Done**.
4.  **Download Credentials Key (JSON):**
    *   In the credentials list, locate the service account under **Service Accounts** and click the **pencil icon (edit)**.
    *   Go to the **Keys** tab.
    *   Click **Add Key** > **Create New Key**.
    *   Select **JSON** format and click **Create**.
    *   A JSON file containing your credentials will download to your computer. Keep this file secure!
5.  **Copy the Service Account Email:**
    *   On the Service Account details page, copy the email address (it looks like `drive-uploader@project-id.iam.gserviceaccount.com`). You will need this in the next step.

---

## 2. Share Google Drive Access with Service Account (If using Service Account Auth)

*(Note: The Joint Genesis Blog system uses user-session credentials via Google OAuth to upload files directly to a dynamically created "Joint Genesis Images" folder in the logged-in user's Google Drive. Thus, configuring specific folder IDs is not required.)*

---

## 3. Configure Environment Variables

Open your `.env.local` file (create it in the project root if it does not exist) and add:

```env
# Production Site URL (used for absolute metadata fallbacks)
NEXT_PUBLIC_SITE_URL=https://en-jointgenesis.com
```

---

## 4. Run Locally

1. Restart your Next.js development server to load the new environment variables:
    ```bash
    npm run dev
    ```
2. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to log in.
3. Open or create a **Blog Post**. You will see the **Featured Image (Google Drive)** uploader field.
4. Drag and drop or select an image to test the upload flow.

---

## 5. Deploying on Vercel

When deploying the website to production:
1. Go to your project settings in the **Vercel Dashboard**.
2. Navigate to **Environment Variables**.
3. Add:
    *   `NEXT_PUBLIC_SITE_URL`
4. Redeploy the application.
