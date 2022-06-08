/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: config => {
    return config;
  },
  reactStrictMode: true,
  esmExternals: true,
  //basePath: '/packages/web',
  //distDir: '../../.next',
  cleanDistDir: true,
  excludeDefaultMomentLocales: true,
  // images: {
  //   disableStaticImages: true,
  // },
  // NextFuture
  future: {
    webpack5: true,
  },
};

module.exports = nextConfig;
