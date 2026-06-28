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

## 2. Set Up Your Google Drive Folder

1.  Open [Google Drive](https://drive.google.com/).
2.  Create a **New Folder** (e.g., `JointGenesisBlogImages`).
3.  Double-click the folder to open it. Look at the browser URL bar; the long string of letters and numbers at the end of the URL is your **Folder ID**.
    *   Example URL: `https://drive.google.com/drive/folders/1A2B3C4D5E6F7G8H9I0J`
    *   Folder ID: `1A2B3C4D5E6F7G8H9I0J`
    *   Copy and save this Folder ID.
4.  **Share the Folder with the Service Account:**
    *   Right-click your new folder > click **Share** > click **Share**.
    *   Paste the **Service Account Email** you copied in Step 1.
    *   Ensure the role is set to **Editor**.
    *   Uncheck "Notify people" and click **Share**.

---

## 3. Configure Environment Variables

Open your `.env.local` file (create it in the project root if it does not exist) and copy the values from the downloaded service account JSON file:

```env
# Google Authentication Credentials
GOOGLE_CLIENT_EMAIL=your-service-account-email@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourPrivateKeyCharactersHere\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=your-google-project-id

# Google Drive Target Folder ID
GOOGLE_DRIVE_FOLDER_ID=1A2B3C4D5E6F7G8H9I0J

# Production Site URL (used for absolute metadata fallbacks)
NEXT_PUBLIC_SITE_URL=https://en-jointgenesis.com
```

> [!IMPORTANT]
> Keep the quotes `""` around `GOOGLE_PRIVATE_KEY` and ensure all internal newline spaces are escaped as literal `\n` characters so Next.js parses the certificate string correctly.

---

## 4. Run Locally

1.  Restart your Next.js development server to load the new environment variables:
    ```bash
    npm run dev
    ```
2.  Navigate to [http://localhost:3000/studio](http://localhost:3000/studio).
3.  Open or create a **Blog Post**. You will see the new **Featured Image (Google Drive)** uploader field.
4.  Drag and drop or select an image to test the upload flow.

---

## 5. Deploying on Vercel

When deploying the website to production:
1.  Go to your project settings in the **Vercel Dashboard**.
2.  Navigate to **Environment Variables**.
3.  Add the same keys:
    *   `GOOGLE_CLIENT_EMAIL`
    *   `GOOGLE_PRIVATE_KEY` (Paste the raw private key including `\n` characters)
    *   `GOOGLE_PROJECT_ID`
    *   `GOOGLE_DRIVE_FOLDER_ID`
    *   `NEXT_PUBLIC_SITE_URL`
4.  Redeploy the application.
