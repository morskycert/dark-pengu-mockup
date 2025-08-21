const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
export default {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProd ? '/dark-pengu-mockup' : '',
  trailingSlash: true,
};
