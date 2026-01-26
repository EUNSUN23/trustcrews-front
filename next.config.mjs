import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer((phase, { defaultConfig }) => {
  /** @type {import('next').NextConfig} */

  const nextConfig = {
    productionBrowserSourceMaps: true,
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });

      return config;
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: process.env.S3_HOST,
          pathname: '/profile/**',
        },
      ],
    },
    eslint: {
      dirs: ['src', 'types'],
    },
  };

  return nextConfig;
});
