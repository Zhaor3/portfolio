/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
// Set NEXT_PUBLIC_BASE_PATH at build time for GitHub Pages project sites,
// e.g. NEXT_PUBLIC_BASE_PATH=/portfolio-website
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? basePath : '',
  assetPrefix: isProd ? basePath : '',
  trailingSlash: true,
};

module.exports = nextConfig;
