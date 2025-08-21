const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',                 // produces static HTML into /out
  images: { unoptimized: true },
  basePath: isProd ? '/dark-pengu-mockup' : '',
  assetPrefix: isProd ? '/dark-pengu-mockup/' : '',
  trailingSlash: true,
};

export default nextConfig;
