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
- Verified via live endpoint test with stubbed GitHub API: 2MB → jsDelivr URL, 25MB → raw.githubusercontent URL

## Backlog
- P2: README mention of the 20MB raw URL fallback
- P2: Roadmap items from README (delete key per upload, file listing dashboard, Docker support)
