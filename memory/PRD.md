# PRD - GitHub CDN

## Problem Statement
Self-hosted file CDN (Node.js/Express) using GitHub repos as storage and jsDelivr as CDN. User request (Jun 2026): if uploaded file is > 20MB, return raw.githubusercontent.com URL instead of cdn.jsdelivr.net (jsDelivr cannot serve files over 20MB). Replace URL entirely (not show both); applies to new uploads wherever URLs are generated.

## Architecture
- `/app/api/index.js` — Express app: upload/delete routes, multer (50MB cap), Turnstile verify, GitHub API calls
- `/app/config.js` — env-based config with defaults
- `/app/public/index.html` — upload/delete UI

## Implemented (June 2026)
- Added `rawApiUrl` config (`RAW_API_URL` env, default `https://raw.githubusercontent.com`)
- Added `buildRawUrl(filePath, fileSize)` in api/index.js: >20MB → raw.githubusercontent.com/{user}/{repo}/{branch}/{path}; else jsDelivr URL
- Applied in both places rawUrl is returned (new upload + already-exists branch)
- API responses now include `urlType` field ("cdn" | "raw")
- Web UI: live upload progress bar (XHR onprogress, replaces Swal loading spinner) with percent text + "Processing on GitHub..." state
- Web UI: URL type badge on result panel ("CDN Cached" green / "Raw (>20MB)" indigo pill) + serving-host note in success dialog
- README: "20MB Raw URL Fallback" section under API reference, `urlType` in response examples, `RAW_API_URL` in env var table
- Verified via stubbed-GitHub live server + Playwright UI test: 2MB → jsDelivr URL + CDN badge, 25MB → raw URL + Raw badge

## Backlog
- P2: Roadmap items from README (delete key per upload, file listing dashboard, Docker support)
