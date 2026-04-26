<div align="center">

<img src="https://telegra.ph/file/c2a4d8d65722553da4c89.jpg" alt="GitHub CDN Logo" width="120" style="border-radius:50%"/>

# 🚀 GitHub CDN

**A lightweight, self-hosted file CDN powered by GitHub Repositories + jsDelivr.**

Upload images, videos, audio and documents through a clean web UI or a public API — get a permanent jsDelivr CDN link back instantly. No database required.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-ghbcdn.giftedtech.co.ke-brightgreen?style=for-the-badge)](https://ghbcdn.giftedtech.co.ke)
[![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)](./package.json)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![GitHub API](https://img.shields.io/badge/Storage-GitHub%20API-181717?style=for-the-badge&logo=github&logoColor=white)](https://docs.github.com/en/rest)
[![jsDelivr](https://img.shields.io/badge/CDN-jsDelivr-E84D3D?style=for-the-badge&logo=jsdelivr&logoColor=white)](https://www.jsdelivr.com/)
[![License](https://img.shields.io/badge/license-MIT-yellow?style=for-the-badge)](#-license)

[Live Demo](https://ghbcdn.giftedtech.co.ke) • [Storage Repo](https://github.com/mauricegift/ghbcdn) • [Report Bug](https://github.com/mauricegift/github-cdn/issues) • [WhatsApp Channel](https://whatsapp.com/channel/0029VbCpYtZLtOj5LDuj7Q1p)

</div>

---

## 📑 Table of Contents

1. [What is GitHub CDN?](#-what-is-github-cdn)
2. [Features](#-features)
3. [Tech Stack](#-tech-stack)
4. [How It Works](#-how-it-works)
5. [Demo](#-demo)
6. [Prerequisites](#-prerequisites)
7. [Step-by-Step Setup (Total Beginner Friendly)](#-step-by-step-setup-total-beginner-friendly)
   - [1️⃣ Clone the Repository](#1️⃣-clone-the-repository)
   - [2️⃣ Install Dependencies](#2️⃣-install-dependencies)
   - [3️⃣ Create a GitHub Storage Repository](#3️⃣-create-a-github-storage-repository)
   - [4️⃣ Generate a GitHub Personal Access Token](#4️⃣-generate-a-github-personal-access-token)
   - [5️⃣ Set Up Cloudflare Turnstile (CAPTCHA)](#5️⃣-set-up-cloudflare-turnstile-captcha)
   - [6️⃣ Create the `.env` File](#6️⃣-create-the-env-file)
8. [Running the App](#-running-the-app)
9. [Deploying to Production (PM2)](#-deploying-to-production-pm2)
10. [API Reference](#-api-reference)
11. [Web Interface](#-web-interface)
12. [Project Structure](#-project-structure)
13. [Environment Variables Reference](#-environment-variables-reference)
14. [Storage Repo Rotation](#-storage-repo-rotation)
15. [Rate Limits & Security](#-rate-limits--security)
16. [Troubleshooting / FAQ](#-troubleshooting--faq)
17. [Roadmap](#-roadmap)
18. [Contributing](#-contributing)
19. [License](#-license)
20. [Author & Contact](#-author--contact)

---

## 🎯 What is GitHub CDN?

**GitHub CDN** is a zero-database, open-source file hosting service that uses **GitHub repositories as storage** and **jsDelivr** as a global CDN layer.

You (or your users) upload a file, the server commits it to a designated GitHub repo via the GitHub API, and instantly returns a permanent, globally-cached jsDelivr CDN URL — no AWS, no Cloudflare R2, no paid storage needed.

It ships with:

- A polished web upload UI (drag-and-drop, progress feedback, copy-link)
- A clean JSON REST API for programmatic uploads / deletes from scripts, bots, or apps
- Cloudflare Turnstile CAPTCHA protection on the web interface
- Automatic file-type routing into `image/`, `video/`, `audio/`, `docs/` folders

It's perfect for:
- 📷 Hosting media for blogs, bots, or small web apps
- 🎬 Sharing videos and audio without platform restrictions
- 🤖 Powering media uploads from WhatsApp bots, Telegram bots, or scripts
- 📦 Free, permanent file hosting that scales up to 1 GB per repo

> **Storage tip:** A single GitHub repo holds up to **1 GB** before warnings appear. When you're running low, just create a new storage repo and update `GITHUB_REPO` in your `.env` — no code changes needed.

---

## ✨ Features

| Category | Capabilities |
| --- | --- |
| **Storage** | GitHub repository via GitHub REST API, auto-routing by file type (`image/`, `video/`, `audio/`, `docs/`) |
| **CDN** | jsDelivr global CDN serves every file with zero config — permanent URLs with no egress fees |
| **Uploads** | Drag-and-drop UI, REST API, multer memory-buffer pipeline, 50 MB max per file |
| **File Types** | Images, videos, audio, documents — 100+ MIME types whitelisted out of the box |
| **Security** | Cloudflare Turnstile CAPTCHA on the web UI, CORS headers, rate-limiting |
| **Deduplication** | Checks if file already exists before uploading; returns existing URL if found |
| **Deletion** | Delete files directly from the repo via the web UI or API |
| **No Database** | Zero MongoDB / SQL setup — files and metadata live entirely in GitHub |
| **Deployment** | First-class PM2 support |
| **Mobile** | Fully responsive UI (dark/light mode) |

---

## 🛠 Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | **Node.js 18+** |
| Framework | **Express.js** |
| Storage | **GitHub REST API** (via `axios`) |
| CDN | **jsDelivr** (`cdn.jsdelivr.net/gh`) |
| Uploads | **multer** (memory storage) |
| CAPTCHA | **Cloudflare Turnstile** |
| Security | **CORS**, **express-rate-limit** |
| Process Manager | **PM2** |
| Frontend | Vanilla HTML + **CSS Custom Properties** + **Font Awesome** + **SweetAlert2** |

---

## ⚙ How It Works

```
                        ┌─────────────────────────────┐
                        │       Browser /             │
                        │    External Client          │
                        └──────────────┬──────────────┘
                                       │ HTTPS upload
                                       ▼
        ┌─────────────────────────────────────────────────────┐
        │                Express API (Node.js)                │
        │  • Turnstile CAPTCHA check (UI only)                │
        │  • MIME-type whitelist + 50 MB cap                  │
        │  • Generates short random prefix: e.g. "Xy3"        │
        │  • Routes file into folder by type (image/video…)   │
        │  • Checks if file already exists in GitHub repo      │
        └────────────────────────┬────────────────────────────┘
                                 │
                  GitHub REST API PUT /contents/:path
                                 │
                                 ▼
        ┌────────────────────────────────────────────────────┐
        │         GitHub Storage Repository                  │
        │         (mauricegift/ghbcdn or yours)              │
        │  image/Xy3-photo.jpg                               │
        │  video/Ab1-clip.mp4                                │
        │  audio/Cd2-track.mp3                               │
        └────────────────────────┬───────────────────────────┘
                                 │
                                 ▼
        ┌────────────────────────────────────────────────────┐
        │          jsDelivr Global CDN                       │
        │  https://cdn.jsdelivr.net/gh/                      │
        │  mauricegift/ghbcdn@main/image/Xy3-photo.jpg       │
        └────────────────────────────────────────────────────┘
```

---

## 🚀 Demo

| Page | URL |
| --- | --- |
| Upload UI | <https://ghbcdn.giftedtech.co.ke> |
| Storage Repo | <https://github.com/mauricegift/ghbcdn> |

---

## 📋 Prerequisites

Before you start, make sure you have:

- ✅ **Node.js 18 or newer** — [download here](https://nodejs.org/)
- ✅ **npm** (comes with Node.js) or **yarn**
- ✅ **Git** — [download here](https://git-scm.com/downloads)
- ✅ A **GitHub account** — [signup](https://github.com/signup)
- ✅ A free **Cloudflare account** *(only for Turnstile CAPTCHA)* — [signup](https://dash.cloudflare.com/sign-up)
- ✅ Basic familiarity with the terminal/command line

---

## 🧰 Step-by-Step Setup (Total Beginner Friendly)

> 💡 **New to all this?** Just follow each step in order. Don't skip — every variable matters.

### 1️⃣ Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/mauricegift/github-cdn.git
cd github-cdn
```

### 2️⃣ Install Dependencies

```bash
npm install
```

This installs every package listed in `package.json` (Express, axios, multer, rate-limit, etc.).

### 3️⃣ Create a GitHub Storage Repository

This is the repo where your uploaded files will actually be stored (separate from this server code repo).

1. Go to [github.com/new](https://github.com/new).
2. Give it a name, e.g. `mycdn` or `files`.
3. Set visibility to **Public** (required so jsDelivr can serve the files).
4. Click **Create repository**.
5. Note the repository name — you'll use it as `GITHUB_REPO` in your `.env`.

> ⚠️ Each GitHub repo holds up to **1 GB** of files before you receive storage warnings. See [Storage Repo Rotation](#-storage-repo-rotation) for how to switch repos without downtime.

### 4️⃣ Generate a GitHub Personal Access Token

The server needs a token to commit files to your storage repo via the GitHub API.

1. Go to **GitHub → Settings → Developer Settings → Personal access tokens → Tokens (classic)**.
2. Click **Generate new token (classic)**.
3. Give it a descriptive name, e.g. `github-cdn-token`.
4. Set **Expiration** to `No expiration` (or a date of your choosing).
5. Under **Scopes**, check:
   - ✅ `repo` → **Full control of private repositories** (this covers public repos too)
6. Click **Generate token**.
7. **Copy the token immediately** — it is shown only once.
8. Save it as `GITHUB_TOKEN` in your `.env`.

> 🔒 Treat your token like a password. Never commit it to any public repository.

### 5️⃣ Set Up Cloudflare Turnstile (CAPTCHA)

Turnstile protects the public upload and delete pages from bots. It's completely free.

> 💡 Only the web UI uses Turnstile. The `/api/upload.php` endpoint skips it entirely — perfect for scripts and bots.

You will need **two** Turnstile widgets — one for the upload form and one for the delete form — each with its own **Site Key**. You only need **one Secret Key** (reuse it for both, or create separate ones).

**Create Widget 1 — Upload form:**

1. In the Cloudflare Dashboard → left sidebar → **Turnstile** → **Add Site**.
2. **Site name:** `github-cdn-upload`
3. **Domains:** add your domain (e.g. `ghbcdn.yourdomain.com`) AND `localhost`.
4. **Widget mode:** *Managed*.
5. Click **Create** → copy the **Site Key** → paste it into `public/index.html` where `UPLOAD_SITEKEY` is defined in the `<script>` block.

**Create Widget 2 — Delete form:**

1. Click **Add Site** again.
2. **Site name:** `github-cdn-delete`
3. Same domains as above.
4. Click **Create** → copy the **Site Key** → paste it into `public/index.html` where `DELETE_SITEKEY` is defined.

**Secret Key (shared):**

Copy either widget's **Secret Key** → save it as `CF_TURNSTILE_SECRET_KEY` in your `.env`.

### 6️⃣ Create the `.env` File

In the project root create a file named `.env` and paste:

```env
# ─── Server ─────────────────────────────────────────────────
PORT=5000

# ─── GitHub Storage ─────────────────────────────────────────
GITHUB_USERNAME=your_github_username
GITHUB_REPO=your_storage_repo_name
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_API_URL=https://api.github.com
REPO_BRANCH=main
COMMIT_MESSAGE=Github Cdn:Upload

# ─── jsDelivr CDN ───────────────────────────────────────────
CDN_API_URL=https://cdn.jsdelivr.net/gh

# ─── Cloudflare Turnstile (CAPTCHA) ─────────────────────────
CF_TURNSTILE_SECRET_KEY=your_turnstile_secret_key
CF_TURNSTILE_API_URL=https://challenges.cloudflare.com
```

> 🔒 **NEVER commit `.env` to git.** Make sure it's listed in `.gitignore`.

---

## ▶ Running the App

### Development (single run)

```bash
npm start
```

### With auto-restart on changes (install nodemon first)

```bash
npm install -D nodemon
npx nodemon ./api/index.js
```

Visit **<http://localhost:5000>** in your browser. You should see the GitHub CDN upload page. 🎉

---

## 🚢 Deploying to Production (PM2)

[PM2](https://pm2.keymetrics.io/) keeps your app running 24/7 and restarts it automatically if it crashes.

### Install PM2 globally (one-time)

```bash
npm install pm2 -g
```

### Common PM2 Commands

| Action | Command |
| --- | --- |
| Start | `npm start` *(uses PM2 internally)* |
| Stop | `npm run stop` |
| Restart | `npm run restart` |
| View live logs | `pm2 logs ghbcdn` |
| Status dashboard | `pm2 status` |
| Auto-start on boot | `pm2 startup` then follow the printed command |

### Recommended Production Flow

```bash
npm start
pm2 save
pm2 startup    # follow the printed command to enable boot startup
```

### Front it with NGINX (optional but recommended)

Add a reverse proxy + HTTPS:

```nginx
server {
  listen 80;
  server_name ghbcdn.yourdomain.com;

  client_max_body_size 55M;   # slightly above the 50 MB upload cap

  location / {
    proxy_pass         http://127.0.0.1:5000;
    proxy_http_version 1.1;
    proxy_set_header   Host              $host;
    proxy_set_header   X-Real-IP         $remote_addr;
    proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Proto $scheme;
  }
}
```

Then issue a free SSL cert with Certbot:

```bash
sudo certbot --nginx -d ghbcdn.yourdomain.com
```

---

## 📡 API Reference

> Base URL (your deployment): `https://ghbcdn.yourdomain.com`
> Live demo base URL: `https://ghbcdn.giftedtech.co.ke`

### 🔼 Upload a File — `POST /api/upload.php`

Public endpoint — **no CAPTCHA required**. Use it from scripts, bots, or mobile apps.

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `file` | `multipart/form-data` | ✅ | The file to upload (max 50 MB) |

**Rate limit:** 10 requests per IP per 5 minutes.

#### cURL example

```bash
curl -X POST https://ghbcdn.giftedtech.co.ke/api/upload.php \
  -F "file=@/path/to/photo.jpg"
```

#### JavaScript (browser / Node 18+)

```js
const form = new FormData();
form.append('file', fileInput.files[0]);

const res = await fetch('https://ghbcdn.giftedtech.co.ke/api/upload.php', {
  method: 'POST',
  body: form
});
const data = await res.json();
console.log(data.rawUrl); // ← your permanent CDN link
```

#### Python (requests)

```python
import requests

with open('photo.jpg', 'rb') as f:
    r = requests.post(
        'https://ghbcdn.giftedtech.co.ke/api/upload.php',
        files={'file': f}
    )
print(r.json()['rawUrl'])
```

#### Successful response (`200`)

```json
{
  "success": true,
  "rawUrl": "https://cdn.jsdelivr.net/gh/mauricegift/ghbcdn@main/image/Xy3-photo.jpg"
}
```

#### File already exists response

```json
{
  "success": true,
  "rawUrl": "https://cdn.jsdelivr.net/gh/mauricegift/ghbcdn@main/image/Xy3-photo.jpg",
  "message": "File already exists, returning existing URL"
}
```

#### Error responses

| Status | Reason |
| --- | --- |
| `400` | No file uploaded |
| `400` | File type not allowed |
| `413` | File exceeds 50 MB limit |
| `429` | Rate limit exceeded — try again in 5 minutes |
| `500` | GitHub API error |

---

### 🔽 Delete a File — `DELETE /giftedDelete.php`

Removes the file from your GitHub storage repo. Requires a valid Cloudflare Turnstile token.

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `filename` | `string` | ✅ | The file path in the repo (e.g. `image/Xy3-photo.jpg`) |
| `turnstileResponse` | `string` | ✅ | Valid Turnstile token from the web widget |

#### cURL example

```bash
curl -X DELETE https://ghbcdn.giftedtech.co.ke/giftedDelete.php \
  -H "Content-Type: application/json" \
  -d '{"filename":"image/Xy3-photo.jpg","turnstileResponse":"<token>"}'
```

#### Successful response

```json
{
  "success": true,
  "message": "File image/Xy3-photo.jpg deleted successfully"
}
```

#### Error responses

| Status | Reason |
| --- | --- |
| `400` | `filename` missing or CAPTCHA token missing/invalid |
| `404` | File not found in the storage repo |
| `500` | GitHub API error |

---

### 🌐 Web Upload Endpoint — `POST /giftedUpload.php`

Same as `/api/upload.php` but **requires** a valid Cloudflare Turnstile token in the request body. Used exclusively by the built-in upload UI.

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `file` | `multipart/form-data` | ✅ | The file to upload |
| `turnstileResponse` | `string` | ✅ | Valid Turnstile token |

---

## 🖥 Web Interface

| Route | What it does |
| --- | --- |
| `/` | Drag-and-drop upload UI (Turnstile-protected) — returns jsDelivr CDN URL |
| `/` *(Delete tab)* | File deletion form — enter file path and complete CAPTCHA to delete |

Both pages are fully responsive (mobile + desktop) and support dark / light mode toggle.

---

## 🗂 Project Structure

```
github-cdn/
├── api/
│   └── index.js          # Express app — routes, multer, Turnstile verify, GitHub API calls
│
├── public/
│   └── index.html        # Upload + Delete UI (single-page with tab navigation)
│
├── config.js             # Reads env vars + sane defaults (MIME whitelists, repo config)
├── package.json          # Dependencies + npm scripts (PM2)
├── .env                  # Secrets (you create this — never commit)
└── README.md             # ← this file
```

---

## 🔧 Environment Variables Reference

| Variable | Required | Default | Description |
| --- | :---: | --- | --- |
| `PORT` | ❌ | `5000` | Port the Express server listens on |
| `GITHUB_USERNAME` | ✅ | `mauricegift` | Your GitHub username |
| `GITHUB_REPO` | ✅ | `ghbcdn` | The name of your GitHub storage repository |
| `GITHUB_TOKEN` | ✅ | — | GitHub Personal Access Token (needs `repo` scope) |
| `GITHUB_API_URL` | ❌ | `https://api.github.com` | GitHub API base URL — don't change this |
| `REPO_BRANCH` | ❌ | `main` | Branch to commit files to |
| `COMMIT_MESSAGE` | ❌ | `Github Cdn:Upload` | Commit message used when uploading files |
| `CDN_API_URL` | ❌ | `https://cdn.jsdelivr.net/gh` | jsDelivr CDN base URL — don't change this |
| `CF_TURNSTILE_SECRET_KEY` | ✅* | — | Turnstile secret key (*required for web UI CAPTCHA) |
| `CF_TURNSTILE_API_URL` | ❌ | `https://challenges.cloudflare.com` | Turnstile verification endpoint |
| `IMAGE_MIMETYPES` | ❌ | *built-in list* | Override the allowed image MIME types |
| `VIDEO_MIMETYPES` | ❌ | *built-in list* | Override the allowed video MIME types |
| `AUDIO_MIMETYPES` | ❌ | *built-in list* | Override the allowed audio MIME types |
| `DOC_MIMETYPES` | ❌ | *built-in list* | Override the allowed document MIME types |

---

## 🔄 Storage Repo Rotation

A single GitHub repository holds up to **1 GB** of data. When you start approaching that limit:

1. Create a new public GitHub repository (e.g. `mycdn2`).
2. Update `GITHUB_REPO=mycdn2` in your `.env`.
3. Restart the server — new uploads go to the new repo instantly.
4. Old URLs from the previous repo remain permanently valid (jsDelivr keeps serving them).

This lets you scale storage horizontally with zero downtime.

---

## 🛡 Rate Limits & Security

- **Upload rate limit:** 10 requests / 5 minutes / IP (configurable in `api/index.js`).
- **File size cap:** 50 MB (set in `multer` limits).
- **MIME whitelist:** uploads outside the configured image/video/audio/doc lists are rejected with `400`.
- **CAPTCHA:** the web upload and delete pages use Cloudflare Turnstile so bots can't spam your repo.
- **API endpoint (`/api/upload.php`):** intentionally CAPTCHA-free for programmatic use. Rate-limit it more aggressively if you see abuse.
- **CORS:** open by default (`*`). Lock it down in `api/index.js` if you only want specific origins to call your API.
- **No delete key needed:** deletion goes through Turnstile CAPTCHA on the web UI; the API delete route also requires a valid Turnstile token.

---

## 🧯 Troubleshooting / FAQ

<details>
<summary><b>"File type not allowed"</b></summary>

The uploaded file's MIME type isn't in any of the four whitelists. Either add it to the relevant `*_MIMETYPES` environment variable in `.env`, or convert the file to a supported format.

Example — add support for `.webp` if it's missing:
```env
IMAGE_MIMETYPES=["image/jpeg","image/png","image/webp"]
```
</details>

<details>
<summary><b>Upload succeeds but the jsDelivr URL returns a 404</b></summary>

jsDelivr caches GitHub content and can take a few minutes to propagate a new file. Wait 2–3 minutes and try the URL again. If it still fails:
- Confirm the file actually exists in your GitHub storage repo.
- Make sure the repo is **public** — jsDelivr cannot serve files from private repositories.
</details>

<details>
<summary><b>"CAPTCHA Response is Required" or "CAPTCHA Already Used"</b></summary>

- Each Turnstile token can only be verified **once**. After a successful or failed upload, the widget resets automatically.
- If you see this on a fresh page load, make sure both `UPLOAD_SITEKEY` and `DELETE_SITEKEY` constants in `public/index.html` match the Site Keys from your Cloudflare Turnstile dashboard.
- If you only use the API (`/api/upload.php`), you do **not** need Turnstile.
</details>

<details>
<summary><b>GitHub API returns 401 Unauthorized</b></summary>

Your `GITHUB_TOKEN` is invalid, expired, or lacks the required `repo` scope. Generate a new token at **GitHub → Settings → Developer Settings → Personal access tokens** and update your `.env`.
</details>

<details>
<summary><b>GitHub API returns 422 Unprocessable Entity</b></summary>

This usually means a file with the same name already exists at the same path. The server checks for duplicates and returns the existing URL, so this shouldn't reach your client. If it does, it's a race condition from simultaneous uploads — it's safe to retry.
</details>

<details>
<summary><b>Rate limit hit — "Too many upload attempts"</b></summary>

The default rate limit is 10 uploads per IP per 5 minutes. Wait for the window to reset, or adjust the `windowMs` and `max` values in the `uploadLimiter` config inside `api/index.js`.
</details>

<details>
<summary><b>My storage repo is nearly full (approaching 1 GB)</b></summary>

See [Storage Repo Rotation](#-storage-repo-rotation). Create a new repo, update `GITHUB_REPO` in `.env`, and restart the server. Old CDN links remain valid permanently.
</details>

---

## 🗺 Roadmap

- [ ] Optional delete key per upload (like Gifted CDN) for API-based deletion without CAPTCHA
- [ ] File listing / dashboard UI
- [ ] WebSocket upload progress for large files
- [ ] Docker / Docker Compose support
- [ ] Optional MongoDB integration for file metadata tracking
- [ ] Multi-repo round-robin to automatically balance storage across repos

---

## 🤝 Contributing

Contributions are welcome and appreciated! 💚

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/awesome-thing`
3. Commit your changes: `git commit -m 'Add awesome thing'`
4. Push to the branch: `git push origin feature/awesome-thing`
5. Open a Pull Request

Please test your changes locally before submitting.

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT © 2024 - Present  Maurice Gift / GiftedTech
```

---

## 👤 Author & Contact

**Maurice Gift** — *Founder, GiftedTech*

- 🌐 Website: <https://me.giftedtech.co.ke>
- 🚀 Live CDN: <https://ghbcdn.giftedtech.co.ke>
- 💼 GitHub: [@mauricegift](https://github.com/mauricegift)
- 📧 Email: [founder@giftedtech.co.ke](mailto:founder@giftedtech.co.ke)
- 💬 WhatsApp Channel: [Follow for updates](https://whatsapp.com/channel/0029VbCpYtZLtOj5LDuj7Q1p)

---

<div align="center">

⭐ **If this project helped you, please give it a star!** ⭐

Made with ❤️ in Kenya 🇰🇪

</div>
