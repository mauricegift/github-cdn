const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '.env'),
  quiet: true,
  override: false,
});

module.exports = {
  port: process.env.PORT || '5000',
  repoBranch: process.env.REPO_BRANCH || 'main', // Replace or not
  githubRepo: process.env.GITHUB_REPO || 'ghbcdn', // Your storage repo name
  commitMessage: process.env.COMMIT_MESSAGE || 'Github Cdn:Upload', // Your commit Message
  githubUser: process.env.GITHUB_USERNAME || 'mauricegift', // Yout github username
  githubApiUrl: process.env.GITHUB_API_URL || 'https://api.github.com', // Maintain this
  cdnApiUrl: process.env.CDN_API_URL || 'https://cdn.jsdelivr.net/gh', // Maintain this
  cfTurnstileApiUrl: process.env.CF_TURNSTILE_API_URL || "https://challenges.cloudflare.com", // Mintain this
  cfSecretKey: process.env.CF_TURNSTILE_SECRET_KEY || '', // Use yours
  githubToken: process.env.GITHUB_TOKEN || '', // Your Github Token Here
  imageMimetypes: process.env.IMAGE_MIMETYPES || "['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/avif', 'image/heif', 'image/heic', 'image/x-icon', 'image/tiff']",
  audioMimetypes: process.env.AUDIO_MIMETYPES || "['audio/mp3', 'audio/mp4', 'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm', 'audio/x-midi', 'audio/midi', 'audio/x-ms-wma', 'audio/x-m4a', 'audio/flac', 'audio/aac', 'audio/webm', 'audio/wave']",
  videoMimetypes: process.env.VIDEO_MIMETYPES || "['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/avi', 'video/mpeg', 'video/x-ms-wmv', 'video/3gpp2', 'video/3gpp', 'video/x-matroska', 'video/ogg']",
  docMimetypes: process.env.DOC_MIMETYPES || "['text/plain', 'text/html', 'text/css', 'text/javascript', 'text/csv', 'text/vcard', 'text/x-vcard', 'text/vcf', 'text/xml', 'text/markdown', 'text/rtf', 'application/pdf', 'application/msword', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.oasis.opendocument.text', 'application/vnd.oasis.opendocument.spreadsheet', 'application/vnd.oasis.opendocument.presentation', 'application/rtf', 'application/x-abiword', 'application/zip', 'application/x-zip-compressed', 'application/x-rar-compressed', 'application/x-7z-compressed', 'application/x-tar', 'application/gzip', 'application/x-bzip', 'application/x-bzip2', 'application/json', 'application/ld+json', 'application/xml', 'application/javascript', 'application/typescript', 'application/x-httpd-php', 'application/x-yaml', 'application/graphql', 'application/graphql', 'application/sql', 'font/ttf', 'font/otf', 'font/woff', 'font/woff2', 'application/x-font-ttf', 'application/x-font-otf', 'application/font-woff', 'application/font-woff2', 'application/octet-stream', 'application/x-www-form-urlencoded', 'multipart/form-data', 'text/calendar', 'application/vnd.android.package-archive', 'application/x-msdownload', 'application/x-apple-diskimage']",
};
