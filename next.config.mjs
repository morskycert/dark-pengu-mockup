// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';
const repo = 'dark-pengu-mockup'; // your repo name

/** @type {import('next').NextConfig} */
export default {
  output: 'export',               // puts static site in ./out
  trailingSlash: true,            // avoids refresh 404s on Pages
  images: { unoptimized: true },  // required if you use next/image
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
};
