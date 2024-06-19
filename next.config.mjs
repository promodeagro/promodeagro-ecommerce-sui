import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({ 
  enabled: process.env.ANALYZE === 'true' 
});

const nextConfig = {
  distDir: 'build', // Custom build output directory

  images: {
    domains: [
      'ecomdmsservice.s3.amazonaws.com', 
      'shopify-assets.shopifycdn.com', 
      'www.shutterstock.com'
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
