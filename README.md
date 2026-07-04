# Production Setup Guide

This guide describes how to configure the production environment variables and third-party setups to deploy your Joint Genesis website on Vercel.

---

## 1. GitHub Personal Access Token (PAT)

### Create Token

1. Login to GitHub.
2. Go to **Profile → Settings → Developer settings → Personal access tokens → Fine-grained tokens**.
3. Click **Generate new token**.

### Configure

* **Token Name:** Joint Genesis CMS
* **Repository Access:** Only select repositories
* **Repository:** Joint-Genesis
* **Permissions:**
  * Repository Permissions → **Contents → Read & Write**
* **Expiration:** 1 Year (Recommended) or No Expiration

Copy the generated token immediately (GitHub shows it only once).

Add to `.env.local` and Vercel:

```env
GITHUB_TOKEN=github_pat_xxxxxxxxx
GITHUB_OWNER=your-github-username
GITHUB_REPO=Joint-Genesis
GITHUB_BRANCH=main
```

---

## 2. Google OAuth Setup

### Create OAuth Client

Google Cloud Console
→ APIs & Services
→ Credentials
→ Create OAuth Client ID

Application Type:
* Web Application

Copy:
* GOOGLE_CLIENT_ID
* GOOGLE_CLIENT_SECRET

Add to `.env.local` and Vercel:

```env
GOOGLE_CLIENT_ID=xxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxx
```

---

## 3. Local OAuth URLs

Authorized JavaScript Origins
```
http://localhost:3000
```

Authorized Redirect URI
```
http://localhost:3000/api/auth/callback/google
```

---

## 4. Production OAuth URLs

After deployment, update Google Cloud OAuth settings.

Authorized JavaScript Origins
```
https://your-project.vercel.app
https://your-domain.com
```

Authorized Redirect URIs
```
https://your-project.vercel.app/api/auth/callback/google
https://your-domain.com/api/auth/callback/google
```

---

## 5. NextAuth

Generate a secret using:
```bash
npx auth secret
```
*(Copy the generated secret output from your terminal and use it as the value for `NEXTAUTH_SECRET`)*

Or generate via openssl:
```bash
openssl rand -base64 32
```

Add to your environment configuration:
```env
NEXTAUTH_SECRET=generated-secret
NEXTAUTH_URL=http://localhost:3000
```

For production:
```env
NEXTAUTH_URL=https://your-domain.com
```

---

## 6. Vercel Environment Variables

Configure:
```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GITHUB_TOKEN=
GITHUB_OWNER=
GITHUB_REPO=
GITHUB_BRANCH=
```

---

## 7. Blog Publishing Flow

```
Admin Login
      ↓
Create/Edit Blog
      ↓
Upload Image
      ↓
Google Drive
      ↓
Image URL Generated
      ↓
Update blogs.json
      ↓
Commit to GitHub
      ↓
Vercel Auto Deploy
      ↓
Website Updated
```

---

## 8. If GitHub Token Expires

1. Create a new Fine-grained Personal Access Token.
2. Replace `GITHUB_TOKEN` in Vercel.
3. Redeploy the project once.

---

## 9. If Google Login Stops Working

Check:
* GOOGLE_CLIENT_ID
* GOOGLE_CLIENT_SECRET
* NEXTAUTH_URL
* Authorized JavaScript Origins
* Authorized Redirect URI

Most issues are caused by incorrect OAuth URLs.

---

## 10. Deployment Checklist

* Google OAuth configured
* GitHub PAT created
* Environment variables added
* Vercel connected to GitHub
* Google OAuth production URLs updated
* Test `/admin` login
* Test image upload
* Test blog publish
* Verify GitHub commit
* Verify Vercel auto deployment
