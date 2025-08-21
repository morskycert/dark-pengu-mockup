// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';

// If this is a *project* site (https://user.github.io/<repo>),
// set repo to your repo name. For user/organization sites (https://user.github.io) leave it ''.
const repo = 'dark-pengu-mockup'; // <-- your repo name

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',               // generates static site in ./out
  trailingSlash: true,            // avoids refresh 404s on Pages
  images: { unoptimized: true },  // needed when using next/image with static export
  // Pathing for project sites:
  basePath: isProd && repo ? `/${repo}` : '',
  assetPrefix: isProd && repo ? `/${repo}/` : '',
};

export default nextConfig;
