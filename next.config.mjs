const isProd = process.env.NODE_ENV === 'production';

export default {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProd ? '/dark-pengu-mockup' : '',
  env: { NEXT_PUBLIC_BASE_PATH: isProd ? '/dark-pengu-mockup' : '' },
  trailingSlash: true,
};
