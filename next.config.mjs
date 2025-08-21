// next.config.js
const REPO_NAME = "your-repo-name"; // "" if user/org site at username.github.io

/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",                              // replaces next export
  basePath: REPO_NAME ? `/${REPO_NAME}` : "",
  assetPrefix: REPO_NAME ? `/${REPO_NAME}/` : "",
  images: { unoptimized: true },                 // no Next image optimizer on GH Pages
  trailingSlash: true,                           // avoids deep-link 404s on Pages
  env: { NEXT_PUBLIC_BASE_PATH: REPO_NAME ? `/${REPO_NAME}` : "" }, // helpful for <img>
};
