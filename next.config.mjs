import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

const nextConfig = {

  images: {
  
    domains: ['posdmsservice.s3.amazonaws.com', 'shopify-assets.shopifycdn.com','www.shutterstock.com'],
  },
};

  
  export default nextConfig;
  
